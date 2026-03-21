# GS Madrid 2 — WordPress Headless + Next.js

## Proyecto

Rediseno web del Colegio Oficial de Graduados Sociales de Madrid.
WordPress headless (CMS + ACF Pro) con frontend Next.js moderno.

**Web actual:** https://graduadosocialmadrid.org/
**Stack:** WordPress (headless) + ACF Pro + WPGraphQL + Next.js 14 (App Router) + Tailwind CSS

---

## Arquitectura

```
WordPress (CMS) → WPGraphQL → Next.js (Frontend)
     ↓                              ↓
  ACF Pro                    Tailwind + TypeScript
  CPTs + Taxonomias          App Router + ISR
  Media library              graphql-request
```

## EasyPanel

- **Proyecto:** `gsmadrid-2`
- **WordPress:** `gsmadrid-2-wordpress.a7lflv.easypanel.host`
- **Frontend:** `gsmadrid-2-web.a7lflv.easypanel.host`
- **DB:** MariaDB (auto-provisioned con servicio WordPress)

## CPTs registrados

| CPT | Slug | Uso |
|-----|------|-----|
| `formacion` | `formacion` | Jornadas, seminarios, talleres |
| `curso` | `curso` | Cursos con modulos y certificacion |
| `profesional` | `profesional` | Directorio de colegiados |

## Taxonomias

| Taxonomia | CPTs | Uso |
|-----------|------|-----|
| `modalidad` | formacion, curso | Presencial, Online, Hibrido |
| `area_formativa` | formacion, curso | Laboral, Fiscal, Seguridad Social... |
| `especialidad` | profesional | Areas de ejercicio |
| `localidad` | profesional | Municipios Madrid |

## Plugins WordPress requeridos

1. **ACF Pro** — campos personalizados (zip en raiz del proyecto)
2. **WPGraphQL** — API GraphQL
3. **WPGraphQL for ACF** — expone campos ACF en GraphQL

## Estructura del repo

```
gsmadrid-2/
├── CLAUDE.md
├── .gitignore
├── wordpress/theme/gsmadrid-headless/   ← tema headless
├── frontend/                             ← Next.js app
├── scripts/                              ← setup y deploy
├── reports/                              ← informes
├── data/                                 ← exports
└── assets/                               ← creatividades
```

## Comandos utiles

```bash
# Frontend dev
cd frontend && npm run dev

# Build
cd frontend && npm run build

# Deploy
bash scripts/deploy-frontend.sh
```

## Reglas

1. **Nunca modificar WordPress en produccion** sin backup previo
2. Los ACF field groups se versionan en `acf-json/` (JSON sync)
3. Frontend usa ISR con `revalidate: 60`
4. Todos los costes en micros se dividen por 1_000_000
5. Imagenes via `next/image` con dominios configurados
6. Design system: ver `manual-estilo-web_2026-03-15.md`

## Estado actual

- [x] Estructura de carpetas
- [x] WordPress theme headless
- [x] ACF field groups JSON
- [x] Next.js skeleton con design system
- [x] Componentes UI base
- [x] Layout (Header, Footer)
- [x] Homepage sections
- [x] Rutas de paginas
- [x] Dockerfile
- [ ] EasyPanel setup scripts
- [ ] WordPress setup script
- [ ] Deploy
