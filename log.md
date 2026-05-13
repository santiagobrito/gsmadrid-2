# Log de acciones — gsmadrid

Registro cronológico de acciones realizadas.

---

## 2026-05-13 — Heroes de landing pages: reemplazo de 10 imágenes estáticas + optimización

**Origen:** Santi quería renovar las imágenes hero de las landings de servicios. Pidió inventario primero, luego envió zip con 10 imágenes a reemplazar.

**Inventario de imágenes del sitio** (referencia para futuro):
- **Estáticas hardcoded** (en `frontend/public/images/`, 10 heroes + `teresa-silleras.jpg` + `logo.png`)
- **Partners** (`frontend/public/partners/`, 4 logos usados solo en clinica-juridica)
- **Editables vía WordPress** (miembro_junta featured, profesional ACF foto, post featured, formacion featured, evento featured) — NO tocar código, se editan en wp-admin
- **Placeholders SVG** (`/placeholder-{evento,formacion,news}.svg`) — fallbacks
- **Huérfanas detectadas**: `frontend/public/images/{hazte-colegiado-hero,precolegiados-hero}.jpg` (en disco, nadie las referencia — el código de `/hazte-colegiado/` y `/hazte-colegiado/precolegiados/` no monta hero image) + carpeta `frontend/public/junta/*` (~5 MB obsoleta, las fotos vienen de WP).

**Iteración aspect ratio:**
- Primer zip (`estaticas.zip`): 10 imágenes a 1200×675 (16:9). Pero las páginas usan `aspect-[4/3]` en el `<Image>` del hero → 16:9 se hubiera recortado. Avisé.
- Segundo zip (`Estaticas-web (1600 x 1200 px).zip`): 1600×1200 (4:3 correcto, ratio 1.333). Total 12 MB.

**Optimización con sharp:**
- 12 MB original era exceso para uso web (sources al ~95 quality). Sharp + mozjpeg quality 82 progressive → **1.8 MB total (-84%)** sin pérdida visual perceptible al tamaño renderizado.
- Comando: `sharp(src).jpeg({quality:82, mozjpeg:true, progressive:true}).toFile(dst)` — sharp viene en `frontend/node_modules/` por Next.js.
- Cliente recibe ~80-150 KB (Next.js convierte a WebP/AVIF on-demand). Repo gana 10+ MB de espacio limpio.

**Commit `4bfc752`:** Reemplazo de los 10 .jpg en `frontend/public/images/`. Trigger deploy. Verificado en producción (content-length: 191362 para colegiados-hero.jpg, last-modified de hoy).

**Limpieza:** Los 2 zips procesados + 3 directorios tmp eliminados de `~/CLAUDE/uploads/` y `/tmp/`.

---

## 2026-05-13 — Foto de Manuel Rodriguez Noguera no se actualizaba: diagnóstico WP vs frontend cache

**Reporte de Santi:** "Cambié la foto de Manuel desde el backend pero en frontend sigue la antigua".

**Diagnóstico** (patrón útil para futuros casos similares):
1. **Primero verificar qué devuelve la API WP**, no asumir caché frontend:
   ```bash
   curl -sS "<wp-domain>/wp-json/wp/v2/<cpt>?search=<nombre>&_embed" | python3 -m json.tool
   ```
2. Para Manuel (CPT `miembro_junta` ID 137): API devolvió `featured_media: 291` apuntando a la foto VIEJA de marzo. `post.modified: 2026-03-21` (no se modificó hoy).
3. Confirmé en `wp/v2/media` ordenado por fecha desc: única subida del día era **Javier Cerrajero**, no Manuel. Tampoco existía media nueva con "manuel" en el filename.
4. Headers de la imagen: `Last-Modified: 21 Mar 2026` → el archivo nunca fue sobreescrito en uploads.

**Conclusión:** No era caché del frontend ni de Next.js. El cambio nunca se guardó en WP. Posibles causas: olvido del botón "Actualizar", confusión de persona, o falló silenciosamente algún plugin.

**Lección:** Antes de tirarse al frontend buscando caché o problemas de fetch GraphQL, validar la fuente de verdad (WP REST API). Si la API ya devuelve el valor viejo, el problema está en WP, no en el frontend.

**Resolución:** Santi verificó en wp-admin que efectivamente no había guardado. Re-actualizó el campo. Frontend lo recogió en el siguiente revalidate (60s).

---

## 2026-05-13 — Alineación de tamaño de fotos en /el-colegio/junta-de-gobierno

**Reporte:** Las fotos de Vocales Ejercientes y No Ejercientes se veían demasiado pequeñas vs las de Equipo Directivo.

**Cambio (`687d45f`):** En `frontend/src/app/el-colegio/junta-de-gobierno/page.tsx`, en las secciones de Vocales (ejercientes + no ejercientes), igualar dimensiones:
- `<Image width={56} height={56}>` → `width={80} height={80}` (igual que Equipo Directivo)
- `className="h-14 w-14 ..."` → `"h-20 w-20 ..."`
- `<AvatarPlaceholder size="sm">` → `size="md"`

Deploy disparado. Verificación: 13 avatares en producción a 80×80 (1 presidenta + 3 directivos + 5 vocales ejercientes + 4 vocales no ejercientes).

---

## 2026-05-13 — Limpieza estructural del repo: line endings, gitignore allowlist, reorganización

**Origen:** Mientras iba a commitear el fix de 404 detecté que git status mostraba 170 archivos modificados, mayoría ruido CRLF↔LF, pero también mezclados con 79 deletions sin stagear y 87 untracked. El user pidió revisar uno por uno; con clasificación automática agrupé en bloques accionables.

**Auditoría inicial** (script de clasificación):
- 87 M (modificados): 84 solo line-endings, 3 cambios reales (`CLAUDE.md`, `frontend/next-env.d.ts`, `log.md`)
- 79 D (borrados sin stagear): 39 mocks + 17 del tema viejo (movido a /theme) + 5 scripts setup obsoletos + 5 reports + 5 logos + 6 root sueltos
- 87 ?? (untracked): 77 scripts throwaway (payloads, builders) + 4 theme/ + 1 assets/ + 4 reports/ + informe incidente

**Cambios (3 commits dedicados):**

`d465178` — Normalize line endings + scripts/ allowlist in gitignore:
- `.gitattributes` nuevo con `* text=auto eol=lf` + binarios explícitos
- `.gitignore` ampliado: `scripts/*` + `!scripts/<3 tools allowlist>` (deploy-auth-update.js, enable-wordfence-2fa.js, import-colegiados.js)
- Efecto inmediato: los 84 archivos de line-endings dejaron de aparecer modificados

`506534f` — Repository cleanup: 79 deletions + 10 nuevos archivos:
- Borrados: `Fotos-santi-mock/*` (39), `wordpress/theme/gsmadrid-headless/*` excepto `inc/auth.php` (17, tema movido a `/theme/`), 5 scripts setup obsoletos, 5 reports antiguos, 5 logos sueltos, 6 archivos root mock
- Añadidos: `/theme/` (tema WP relocalizado), `/assets/` (logos colaboradores incl. Banco Sabadell), `informe-incidente-seguridad-20260414.md`, reports actuales (manual estilo, propuesta mantenimiento)
- Renames detectados por git: `manual-estilo-web_2026-03-15.{html,md}` → `reports/`

`3bd76b6` — Update CLAUDE.md, log, next-env:
- `CLAUDE.md`: -253 +97 líneas, reemplaza versión inicial del scaffold por la operativa actual (datos, plataformas, stack, audiencias, agentes, reglas específicas)
- `log.md`: entradas del día
- `frontend/next-env.d.ts`: +1 línea autogen Next.js

**Lecciones aprendidas:**
- Al detectar diff masivo aparentemente "todo modificado", primero clasificar: comparar `git show HEAD:<file> | tr -d '\r'` vs `tr -d '\r' < <file>`. Si son iguales = solo line-endings = safe a renormalizar.
- `git diff --name-only -w` NO filtra archivos: lista cualquier archivo con diff aunque sea solo whitespace. Para detectar diferencias reales hay que comparar contenido normalizado a mano.
- `.gitattributes` con `eol=lf` no requiere convertir archivos en disco manualmente: git re-evalúa el status comparando contra contenido canonicalizado.
- Para evitar arrastrar ruido CRLF en commits parciales: `git restore <file>` + re-aplicar edits = diff limpio del cambio real.

**Deploy:** No requerido. Ninguno de los 5 commits cleanup toca código runtime del frontend (todo eran tooling/cleanup/docs).

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

**Iteración (mismo día):** El user pidió volver a 4 tarjetas con alturas iguales. Commit `f2a3aa1` revierte la consolidación a 2 tarjetas y restablece las 4 (Precolegiados, Ejercientes Libres, Ejercientes en Empresa, No Ejercientes). Para igualar alturas en el grid sm:grid-cols-2: `Link` ahora `group block h-full`, div interno `flex h-full flex-col`, y la línea "Ver requisitos" con `mt-auto pt-3` para anclarla al pie. Las 3 ejercientes apuntan a `/colegiados`, Precolegiados a su propia página. Deploy disparado y verificado.

**Redirects 301 (commit `ba6b11e`):** Añadidos en `frontend/next.config.ts` con `permanent: true` (Next.js usa 308, equivalente SEO). Cubre el caso de Google/backlinks externos con las URLs viejas indexadas. Verificado: `/ejercientes-libres`, `/ejercientes-empresa`, `/no-ejercientes` → 308 → `/colegiados`.

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
