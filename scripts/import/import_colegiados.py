#!/usr/bin/env python3
"""
Importa colegiados al WordPress de gsmadrid-2.

Por defecto corre en DRY-RUN: no toca nada, solo dice qué haría.
Para ejecutar de verdad, pasar --apply.

Flujo (--apply):
  1. Lee data/clean/colegiados_clean.csv
  2. Lista users 'col-*' ya existentes (1 SSH call)
  3. Filtra entries a procesar (skip si user_login col-N ya existe)
  4. Genera batch JSON local
  5. docker cp del JSON + worker.php al container WP
  6. docker exec wp eval-file worker.php --batch=... --out=...
  7. docker cp del results.json de vuelta
  8. Guarda log local en data/import_logs/YYYY-MM-DD_HHMMSS.json
  9. Resumen

Usage:
  python3 import_colegiados.py                       # dry-run sobre todo el CSV
  python3 import_colegiados.py --limit 5             # dry-run sobre 5 filas
  python3 import_colegiados.py --apply --limit 5     # ejecuta de verdad con 5
  python3 import_colegiados.py --apply               # ejecuta todo (1.138)
"""
import argparse
import csv
import json
import shlex
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_CSV = ROOT / "data/clean/colegiados_clean.csv"
WORKER_PHP = Path(__file__).resolve().parent / "worker.php"
LOG_DIR = ROOT / "data/import_logs"

SSH_HOST = "easypanel"
CONTAINER_FILTER = "name=gsmadrid-2_wordpress"
WP_PATH_IN_CONTAINER = "/code"
TMP_DIR_IN_CONTAINER = "/tmp/gsmadrid-import"


def run(cmd, *, capture=True, check=True, input_=None):
    """Run a local shell command. Returns CompletedProcess."""
    if isinstance(cmd, str):
        cmd_args = cmd
        shell = True
    else:
        cmd_args = cmd
        shell = False
    return subprocess.run(
        cmd_args,
        shell=shell,
        check=check,
        capture_output=capture,
        text=True,
        input=input_,
    )


def ssh(remote_cmd):
    """Run a command on the easypanel host via SSH. Returns stdout (stripped)."""
    return run(["ssh", SSH_HOST, remote_cmd]).stdout.strip()


def find_wp_container():
    """Return the actual container name of the running WP container.
    The filter `name=gsmadrid-2_wordpress` also matches `gsmadrid-2_wordpress-db`,
    so we exclude `-db` containers explicitly.
    """
    out = ssh(f"sudo docker ps --filter {shlex.quote(CONTAINER_FILTER)} --format '{{{{.Names}}}}'")
    names = [n for n in out.splitlines() if n.strip() and "wordpress-db" not in n]
    if not names:
        sys.exit("ERROR: container WordPress de gsmadrid-2 no encontrado.")
    return names[0]


def wpcli(container, *args):
    """Run wp-cli inside the WP container."""
    args_joined = " ".join(shlex.quote(a) for a in args)
    cmd = (
        f"sudo docker exec {container} "
        f"wp --allow-root --path={WP_PATH_IN_CONTAINER} {args_joined}"
    )
    return ssh(cmd)


def existing_col_logins(container):
    """Return set of user_login values matching 'col-<digits>'.
    WP-CLI ignores --login__like, so we list all and filter in Python.
    """
    out = wpcli(container, "user", "list", "--fields=user_login", "--format=csv")
    lines = out.splitlines()[1:]  # skip header
    return {l.strip() for l in lines if l.strip().startswith("col-") and l.strip()[4:].isdigit()}


def load_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build_entry(row):
    """Map a CSV row to a worker-batch entry."""
    return {
        "numero_colegiado": row["numero_colegiado"],
        "nombres": row["nombres"],
        "apellidos": row["apellidos"],
        "display_name": row["display_name"],
        "email": row["email"],
        "email_estado": row["email_estado"],
        "modalidad": row["modalidad"],
    }


def classify_rows(rows, existing_logins, limit):
    """Annotate each row with the action that would be taken."""
    classified = []
    seen = 0
    for row in rows:
        if limit and seen >= limit:
            break
        seen += 1
        login = f"col-{row['numero_colegiado']}"
        if login in existing_logins:
            action = "would_skip_exists"
        elif not row["nombres"] or not row["apellidos"]:
            action = "would_error_missing_name"
        else:
            action = "would_create"
        classified.append({"row": row, "login": login, "action": action})
    return classified


def print_dry_run_report(classified, total_rows):
    counts = {"would_create": 0, "would_skip_exists": 0, "would_error_missing_name": 0}
    sample = []
    for c in classified:
        counts[c["action"]] += 1
        if len(sample) < 10 and c["action"] == "would_create":
            sample.append(c)

    print(f"\n=== DRY-RUN ===")
    print(f"CSV: {total_rows} filas totales · procesando: {len(classified)}")
    print(f"  · would_create:             {counts['would_create']}")
    print(f"  · would_skip_exists:        {counts['would_skip_exists']}")
    print(f"  · would_error_missing_name: {counts['would_error_missing_name']}")
    if sample:
        print(f"\nMuestra de los primeros {len(sample)} `would_create`:")
        for c in sample:
            r = c["row"]
            short_email = r["email"] if len(r["email"]) < 40 else r["email"][:37] + "..."
            print(f"  {c['login']:10}  {r['modalidad']:3}  {short_email:40}  {r['display_name']}")
    print()


def run_apply(container, entries, batch_id):
    """Copy worker + batch into the container, execute, fetch results back."""
    # Local staging
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    local_batch = LOG_DIR / f"{batch_id}_batch.json"
    local_results = LOG_DIR / f"{batch_id}_results.json"

    batch_doc = {"batch_id": batch_id, "entries": entries}
    local_batch.write_text(json.dumps(batch_doc, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Batch local: {local_batch}")

    # Stage on remote host (server tmp), then into container
    remote_tmp = f"/tmp/gsmadrid-import-{batch_id}"
    ssh(f"mkdir -p {remote_tmp}")

    run(["rsync", "-a", str(WORKER_PHP), f"{SSH_HOST}:{remote_tmp}/worker.php"])
    run(["rsync", "-a", str(local_batch), f"{SSH_HOST}:{remote_tmp}/batch.json"])

    # Copy into container
    ssh(f"sudo docker exec {container} mkdir -p {TMP_DIR_IN_CONTAINER}")
    ssh(f"sudo docker cp {remote_tmp}/worker.php {container}:{TMP_DIR_IN_CONTAINER}/worker.php")
    ssh(f"sudo docker cp {remote_tmp}/batch.json {container}:{TMP_DIR_IN_CONTAINER}/batch.json")

    # Execute (env vars; wp eval-file intercepta --flags)
    in_batch = f"{TMP_DIR_IN_CONTAINER}/batch.json"
    in_out = f"{TMP_DIR_IN_CONTAINER}/results.json"
    print(f"Ejecutando worker dentro del container (puede tardar)...")
    t0 = time.time()
    cmd = (
        f"sudo docker exec "
        f"-e GSMADRID_BATCH={shlex.quote(in_batch)} "
        f"-e GSMADRID_OUT={shlex.quote(in_out)} "
        f"{container} "
        f"wp --allow-root --path={WP_PATH_IN_CONTAINER} "
        f"eval-file {TMP_DIR_IN_CONTAINER}/worker.php"
    )
    stdout = ssh(cmd)
    elapsed = time.time() - t0
    print(f"Worker terminó en {elapsed:.1f}s. Stdout: {stdout}")

    # Pull results back
    ssh(f"sudo docker cp {container}:{in_out} {remote_tmp}/results.json")
    ssh(f"sudo chown ubuntu:ubuntu {remote_tmp}/results.json")
    run(["rsync", "-a", f"{SSH_HOST}:{remote_tmp}/results.json", str(local_results)])

    # Cleanup remote staging + container tmp
    ssh(f"sudo docker exec {container} rm -rf {TMP_DIR_IN_CONTAINER}")
    ssh(f"rm -rf {remote_tmp}")

    print(f"Resultados local: {local_results}")
    return local_results


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", default=str(DEFAULT_CSV), help="Ruta al CSV limpio")
    ap.add_argument("--apply", action="store_true", help="Ejecuta de verdad (sin esto = dry-run)")
    ap.add_argument("--limit", type=int, default=0, help="Procesar solo las primeras N filas (0 = todas)")
    ap.add_argument("--yes", action="store_true", help="No pedir confirmación interactiva en --apply")
    args = ap.parse_args()

    csv_path = Path(args.csv)
    if not csv_path.exists():
        sys.exit(f"CSV no encontrado: {csv_path}")

    rows = load_csv(csv_path)
    print(f"CSV: {csv_path}  ·  {len(rows)} filas")

    container = find_wp_container()
    print(f"Container WP: {container}")

    print("Consultando users 'col-*' existentes...")
    existing = existing_col_logins(container)
    print(f"  {len(existing)} users 'col-*' ya existentes")

    classified = classify_rows(rows, existing, args.limit)
    print_dry_run_report(classified, len(rows))

    if not args.apply:
        print("(dry-run — no se tocó nada)")
        return

    to_create = [c["row"] for c in classified if c["action"] == "would_create"]
    if not to_create:
        print("Nada que crear. Salida.")
        return

    if not args.yes:
        resp = input(f"--apply: crear {len(to_create)} cuentas. ¿Confirmar? [yes/N]: ")
        if resp.strip().lower() != "yes":
            print("Cancelado.")
            return

    batch_id = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    entries = [build_entry(r) for r in to_create]
    results_path = run_apply(container, entries, batch_id)

    # Print summary from results
    data = json.loads(results_path.read_text(encoding="utf-8"))
    s = data["summary"]
    print(f"\n=== RESULTADO ===")
    print(f"created={s['created']}  skipped={s['skipped']}  errors={s['errors']}")
    if s["errors"]:
        print("\nErrores:")
        for r in data["results"]:
            if r["status"] == "error":
                print(f"  {r.get('login','?'):10} :: {r['reason']}")


if __name__ == "__main__":
    main()
