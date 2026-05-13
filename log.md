# Log de acciones — gsmadrid

Registro cronológico de acciones realizadas.

---

## 2026-05-13 — Fix 404 en Hazte Colegiado: consolidación de rutas ejercientes

**Origen:** Santi reportó que `https://gsmadrid.uptomarketing.com/hazte-colegiado/ejercientes-libres` (y luego `/ejercientes-empresa`, `/no-ejercientes`) devolvían 404.

**Diagnóstico:** Las tres páginas **nunca existieron como archivo** en el repo (`git log --diff-filter=A` en esas rutas = 0 commits). Los enlaces vivían en `QuickAccess.tsx` (4 cards en la home) y `Footer.tsx`, pero no se construyeron las páginas destino. En el commit `3ea7479` (22-mar-2026) reconocí el problema y redirigí los CTAs dentro de `hazte-colegiado/page.tsx` a `/colegiados`, pero olvidé tocar `QuickAccess.tsx` y `Footer.tsx`, que seguían enlazando a las rutas muertas.

**Decisión:** Opción "limpiar primero". En lugar de crear las 3 páginas (más SEO pero más trabajo) o redirigir vía `next.config.ts`, consolidamos los 3 perfiles de ejerciente en la página única `/hazte-colegiado/colegiados` (que ya existe). Más honesto y elimina rot.

**Cambios:**
1. `frontend/src/components/sections/QuickAccess.tsx` — Array `paths` reducido de 4 a 2 entradas (`Colegiados` con badge "Mas comun", `Precolegiados`). Eliminados imports muertos `BookOpen`, `Scale`. Comentario `4 paths` → `2 paths`.
2. `frontend/src/components/layout/Footer.tsx` — Entrada `Ejercientes Libres → /hazte-colegiado/ejercientes-libres` renombrada a `Colegiados → /hazte-colegiado/colegiados` (mantiene paralelo con QuickAccess).

**Detalle técnico — line endings:** El repo tiene 170 archivos marcados como modificados por un problema CRLF↔LF (`git diff -w` confirma 0 diff de contenido en archivos no tocados). Para no arrastrar ~26000 líneas falsas al commit, restauré los 2 archivos con `git restore`, re-apliqué solo los cambios reales con Edit, y stagee solo esos 2 archivos. Commit final: 10 insertions / 22 deletions. **Pendiente:** decidir qué hacer con el ruido de line-endings global (normalizar via `.gitattributes` + `git add --renormalize` o ignorarlo).

**Verificación:**
- `tsc --noEmit` sin errores
- Post-deploy: home enlaza solo a `/hazte-colegiado`, `/hazte-colegiado/colegiados`, `/hazte-colegiado/precolegiados`
- Las 3 URLs viejas siguen 404 (esperado — desenlazadas, no creadas). Si Google las tiene indexadas o hay backlinks, conviene añadir redirects en `next.config.ts` o `middleware.ts`. **No hecho a propósito** — pendiente de decisión.

**Deploy:**
- Commit `9cf8c7d` push a `main` → trigger manual vía `services.app.deployService` sobre `gsmadrid-2/web` (autoDeploy=false). Build ~2 min.

---

## 2026-05-13 — Limpieza de memoria de agentes stale

**Origen:** Auditando agent-memory aparecieron credenciales de un proyecto antiguo `graduados-sociales` (ya destruido en EasyPanel) y un password admin de WP (`18YUoqER5t4LBsH4K5Xk`) que Santi confirmó haber rotado.

**Cambios en `.claude/agent-memory/`:**
1. `easypanel-devops/project_graduados-sociales.md` → reemplazado por `project_gsmadrid-2.md` (passwords MariaDB actuales: user `4e5955ec5998980bcb97`, root `81a1a5e44ec0e4abd2f5`; modelo de persistencia verificado; baseline de seguridad post-incidente abril 2026).
2. `wordpress-tech-scaffold/project_graduados_sociales.md` → reemplazado por `project_gsmadrid-2.md` (sin admin pass; nota explícita de que el plugin stack puede haber driftado).
3. `elementor-designer/project_gsmadrid-homepage.md` → URLs corregidas (WP backend vs frontend Next.js), admin login pass eliminado, REST API App Password marcado como "needs verification".
4. Índices `MEMORY.md` actualizados en los 3 agentes.

**Verificación:** Volúmenes persistentes WP confirmados antes de la limpieza — el WordPress nativo de EasyPanel monta `/code` como bind-mount desde host (`/etc/easypanel/projects/gsmadrid-2/wordpress/code`). Sin riesgo de pérdida en rebuilds.

**Pendiente:** Añadir `.claude/agent-memory/` al `.gitignore` (el `.gitignore` está actualmente marcado como `deleted` en git status — incidencia separada).

---

## 2026-05-08 — Alta de Banco Sabadell como entidad colaboradora en /servicios-colegiado/acuerdos-convenios

**Origen:** Email de Carlos Ruiz (Director Institucional CGSM, formacion@graduadosocialmadrid.org) del 2026-04-29, reenviando petición de Marta Portilla (Banco Sabadell, Segmento Colectivos Profesionales) para colocar el logo "B Sabadell Professional" como entidad colaboradora con link al landing del convenio.

**Cambios:**
1. `frontend/public/images/colaboradores/banco-sabadell.png` — Logo PNG (164 KB) procedente del adjunto del correo. Original archivado en `assets/colaboradores/banco-sabadell-logo-2026-04-29.png`.
2. `frontend/src/app/servicios-colegiado/acuerdos-convenios/page.tsx` — Añadida nueva sección "Entidades colaboradoras" entre el bloque de Categorías y el de Highlights. Estructura `partners[]` extensible para sumar más logos cuando lleguen otros convenios. El link de Sabadell apunta a la URL exacta solicitada en el correo, abre en nueva pestaña con `rel="noopener noreferrer"`.

**Verificación:** `tsc --noEmit` sin errores.

**Deploy:**
- Push a `main` (commit `7d1dbb0`) y deploy disparado vía EasyPanel API (`services.app.deployService` sobre `gsmadrid-2/web`). `autoDeploy` está en false en EasyPanel — siempre hay que disparar manualmente.
- Verificado en producción: `https://gsmadrid.uptomarketing.com/servicios-colegiado/acuerdos-convenios` devuelve HTTP 200 con la nueva sección "Entidades colaboradoras" y el logo de Sabadell con el href correcto al landing del convenio.

**Lecciones / correcciones de memoria:**
- El proyecto en EasyPanel se llama `gsmadrid-2` (no `gsmadrid`) — coincide con el repo `santiagobrito/gsmadrid-2`.
- El dominio del frontend es `gsmadrid.uptomarketing.com` (no `graduados-sociales.uptomarketing.com` como decía el CLAUDE.md del cliente — ya corregido).
- `autoDeploy=false`: cada push a main requiere disparar deploy manualmente vía API o panel.

**Pendiente (no hecho a propósito):**
- Responder a Carlos Ruiz confirmando que la nueva web ya incluye Sabadell como entidad colaboradora. Si Banco Sabadell también necesita actualizar el banner en la web actual (graduadosocialmadrid.org, Joomla), eso lo gestiona el proveedor actual del Colegio — no nosotros.

---

## 2026-04-11 — Fix crash loop: standalone mode + timeout GraphQL

**Problema:** El contenedor `web` (Next.js) entraba en crash loop continuo con `ERR_HTTP_HEADERS_SENT` repetido. CPU al 200%.

**Causa raíz:** Mismatch entre `output: 'standalone'` en `next.config.ts` y `npm run start` (→ `next start`) en `nixpacks.toml`. Next.js advierte explícitamente que `next start` no funciona con `output: standalone`. El build servido era incompleto/corrupto, causando `TypeError: Cannot read properties of undefined` durante SSR streaming, que a su vez disparaba `ERR_HTTP_HEADERS_SENT` en cascada infinita.

**Cambios:**
1. `frontend/next.config.ts` — Eliminado `output: 'standalone'` (el deploy usa Nixpacks con `next start`, no el Dockerfile con `node server.js`)
2. `frontend/src/lib/graphql/client.ts` — Añadido timeout de 10s a cada request GraphQL para evitar fetches colgados si WordPress responde lento

**Nota:** El `Dockerfile` sigue existiendo con la config standalone por si se necesita en el futuro, pero el deploy activo usa `nixpacks.toml`.
