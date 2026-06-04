# Import de colegiados a WordPress

Importa los 1.138 colegiados del censo CGSM como usuarios `profesional` en WP gsmadrid-2,
con su CPT `profesional` enlazado (en `draft`, sin enviar emails).

## Archivos

| Archivo | Qué hace |
|---|---|
| `import_colegiados.py` | Orquestador local. Lee CSV, dry-run o `--apply`. |
| `worker.php` | Corre dentro del container WP via `wp eval-file`. Crea users + ACF. |

## Flow

1. **Local:** Python lee `data/clean/colegiados_clean.csv` (1.138 filas).
2. **SSH:** consulta usernames `col-*` existentes (idempotencia).
3. **Local:** clasifica cada fila (`would_create` / `would_skip_exists` / `would_error`).
4. **Si `--apply`:** copia `worker.php` + batch JSON al container y ejecuta `wp eval-file`.
5. **PHP en container:**
   - Suprime emails (filtros + remove_action).
   - `wp_insert_user(role=profesional)`.
   - Hook `gsmadrid_link_user_profesional` crea CPT en `draft` automáticamente.
   - Sobreescribe ACF con valores correctos del CSV.
   - Setea user meta de tracking.
6. **Resultados:** `data/import_logs/{batch_id}_results.json` con summary por entry.

## Uso

```bash
cd /home/santi/CLAUDE/clientes/gsmadrid

# Dry-run sobre todo el CSV
python3 scripts/import/import_colegiados.py

# Dry-run sobre las primeras 5 filas
python3 scripts/import/import_colegiados.py --limit 5

# Ejecutar de verdad sobre las primeras 5 (test recomendado)
python3 scripts/import/import_colegiados.py --apply --limit 5

# Ejecutar todo (1.138). Pide confirmación.
python3 scripts/import/import_colegiados.py --apply
```

## Mapping CSV → WP

| CSV | WP destination |
|---|---|
| `numero_colegiado` (e.g. "85") | `user_login` = `col-85` + ACF `numero_colegiado` |
| `nombres` | `first_name` + ACF `nombre_completo` |
| `apellidos` | `last_name` + ACF `apellidos` |
| `display_name` | `display_name` + CPT `post_title` |
| `email` | `user_email` + ACF `email` |
| `email_estado` | user meta `gsmadrid_email_estado` |
| `modalidad` (EL/EE/NE/NU) | user meta `gsmadrid_modalidad_original` + ACF `ejerciente` (bool derivado) |

Modalidad → `ejerciente`: `EL`, `EE` → `true`; `NE`, `NU` → `false`. `UN` se normaliza a `NU`.

## Decisiones aplicadas

- **Rol:** `profesional` para todos (CSV solo trae colegiados; precolegiados se gestionan aparte).
- **CPT:** nace en `draft` con `visible_directorio=false`. El colegiado lo publica al activar visibilidad en su área privada.
- **Emails:** **NO** se manda nada durante import. El email de bienvenida solo se dispara al pasar el CPT a `publish`.
- **Password:** aleatoria 32 chars (base64 urlsafe). Se descarta. El colegiado pide reset por email cuando reciba la invitación post-lanzamiento.
- **Idempotencia:** una segunda corrida skip los `col-*` ya existentes; permite reintentos sin duplicar.

## Riesgos & mitigaciones

- **El hook `user_register` splittea mal el display_name.** Lo arreglamos sobreescribiendo `nombre_completo` y `apellidos` desde el CSV después de crear el user.
- **Si el script peta a mitad:** el log queda; segunda corrida sigue desde donde paró (idempotencia).
- **Si hay un cambio breaking en el tema custom:** revisar `inc/auth.php` antes de re-ejecutar.
