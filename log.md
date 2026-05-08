# Log de acciones — gsmadrid

Registro cronológico de acciones realizadas.

---

## 2026-05-08 — Alta de Banco Sabadell como entidad colaboradora en /servicios-colegiado/acuerdos-convenios

**Origen:** Email de Carlos Ruiz (Director Institucional CGSM, formacion@graduadosocialmadrid.org) del 2026-04-29, reenviando petición de Marta Portilla (Banco Sabadell, Segmento Colectivos Profesionales) para colocar el logo "B Sabadell Professional" como entidad colaboradora con link al landing del convenio.

**Cambios:**
1. `frontend/public/images/colaboradores/banco-sabadell.png` — Logo PNG (164 KB) procedente del adjunto del correo. Original archivado en `assets/colaboradores/banco-sabadell-logo-2026-04-29.png`.
2. `frontend/src/app/servicios-colegiado/acuerdos-convenios/page.tsx` — Añadida nueva sección "Entidades colaboradoras" entre el bloque de Categorías y el de Highlights. Estructura `partners[]` extensible para sumar más logos cuando lleguen otros convenios. El link de Sabadell apunta a la URL exacta solicitada en el correo, abre en nueva pestaña con `rel="noopener noreferrer"`.

**Verificación:** `tsc --noEmit` sin errores.

**Pendiente:**
- Desplegar a `graduados-sociales.uptomarketing.com` (deploy automático en EasyPanel al hacer push a main, o manual vía panel).
- Responder a Carlos Ruiz confirmando que se incluirá en la nueva web cuando esté en producción. Si Banco Sabadell necesita el cambio en la web actual (graduadosocialmadrid.org, Joomla), eso lo gestiona el proveedor actual del Colegio — no nosotros.

---

## 2026-04-11 — Fix crash loop: standalone mode + timeout GraphQL

**Problema:** El contenedor `web` (Next.js) entraba en crash loop continuo con `ERR_HTTP_HEADERS_SENT` repetido. CPU al 200%.

**Causa raíz:** Mismatch entre `output: 'standalone'` en `next.config.ts` y `npm run start` (→ `next start`) en `nixpacks.toml`. Next.js advierte explícitamente que `next start` no funciona con `output: standalone`. El build servido era incompleto/corrupto, causando `TypeError: Cannot read properties of undefined` durante SSR streaming, que a su vez disparaba `ERR_HTTP_HEADERS_SENT` en cascada infinita.

**Cambios:**
1. `frontend/next.config.ts` — Eliminado `output: 'standalone'` (el deploy usa Nixpacks con `next start`, no el Dockerfile con `node server.js`)
2. `frontend/src/lib/graphql/client.ts` — Añadido timeout de 10s a cada request GraphQL para evitar fetches colgados si WordPress responde lento

**Nota:** El `Dockerfile` sigue existiendo con la config standalone por si se necesita en el futuro, pero el deploy activo usa `nixpacks.toml`.
