# GS Madrid 2 — WordPress Headless + Next.js

## Proyecto

Rediseno web del Colegio Oficial de Graduados Sociales de Madrid.
WordPress headless (CMS + ACF Pro) con frontend Next.js moderno.

**Web actual:** https://graduadosocialmadrid.org/
**Frontend:** https://gsmadrid-2-web.a7lflv.easypanel.host
**WP Admin:** https://gsmadrid-2-wordpress.a7lflv.easypanel.host/wp-admin
**Stack:** WordPress (headless) + ACF Pro + WPGraphQL + Next.js 15 (App Router) + Tailwind v4
**Brand manual:** `manual-estilo-web_2026-03-15.md` (v3.0)

---

## Arquitectura

```
WordPress (CMS) → WPGraphQL → Next.js (Frontend)
     ↓                              ↓
  ACF Pro                    Tailwind v4 + TypeScript
  CPTs + Taxonomias          App Router + ISR (60s)
  REST API (writes)          graphql-request
  Media library              next/image
```

- **GraphQL** para lecturas (listings, detail pages, menu, search)
- **REST API** para escrituras (auth, inscripcion, contacto, colegiacion)
- **ISR** revalidate=60 en todas las paginas, /buscar es dynamic
- **Menu** hardcoded en Header.tsx (6 grupos con dropdown, estructura definida por el cliente)

## EasyPanel

- **Proyecto:** `gsmadrid-2`
- **Server:** `a7lflv`
- **WordPress:** `gsmadrid-2-wordpress.a7lflv.easypanel.host`
- **Frontend:** `gsmadrid-2-web.a7lflv.easypanel.host`
- **DB:** MariaDB (auto-provisioned)
- **autoDeploy:** false — trigger manual tras push

### Deploy manual

```bash
EP="https://panel.baitcore.com/api/trpc"
KEY="<ver .env>"
curl -s -X POST -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  "$EP/services.app.deployService" \
  -d '{"json":{"projectName":"gsmadrid-2","serviceName":"web"}}'
```

## CPTs registrados

| CPT | Slug GraphQL | Uso |
|-----|-------------|-----|
| `formacion` | `formaciones` | Jornadas, seminarios, talleres |
| `evento` | `eventos` | Actos institucionales, asambleas, networking |
| `curso` | `cursos` | Cursos con modulos (se muestra junto a formaciones en frontend) |
| `profesional` | `profesionales` | Directorio de colegiados |
| `miembro_junta` | `miembrosJunta` | Junta de Gobierno |

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

## REST API (functions.php)

| Section | Endpoint | Method | Uso |
|---------|----------|--------|-----|
| 12 | `/gsmadrid/v1/auth/login` | POST | Login (token-based) |
| 12 | `/gsmadrid/v1/auth/me` | GET | User + profile (Bearer) |
| 12 | `/gsmadrid/v1/profile/update` | POST | Edit profile (Bearer) |
| 14 | `/gsmadrid/v1/inscripcion` | POST | Inscription to formacion/evento |
| 15 | `/gsmadrid/v1/contacto` | POST | Contact form (rate limited) |
| 17 | `/gsmadrid/v1/colegiacion` | POST | Colegiation request |

## GraphQL Queries

| File | Queries |
|------|---------|
| `formacion.ts` | GET_FORMACIONES, GET_FORMACION_BY_SLUG, GET_FORMACION_SLUGS |
| `posts.ts` | GET_POSTS, GET_POST_BY_SLUG, GET_POST_SLUGS |
| `profesional.ts` | GET_PROFESIONALES, GET_PROFESIONAL_BY_SLUG, GET_PROFESIONAL_SLUGS |
| `curso.ts` | GET_CURSOS, GET_CURSO_BY_SLUG, GET_CURSO_SLUGS |
| `evento.ts` | GET_EVENTO_BY_SLUG, GET_EVENTO_SLUGS |
| `menu.ts` | GET_MENU |
| `junta.ts` | GET_MIEMBROS_JUNTA |

## Estructura del repo

```
gsmadrid-2/
├── CLAUDE.md                                    ← este archivo
├── manual-estilo-web_2026-03-15.md              ← brand manual v3.0
├── .gitignore
├── .env                                         ← EASYPANEL_API_KEY
├── wordpress/theme/gsmadrid-headless/
│   ├── functions.php                            ← CPTs, taxonomias, REST API, CORS, auth
│   ├── acf-json/                                ← ACF field groups (JSON sync)
│   └── style.css
├── frontend/
│   ├── src/
│   │   ├── app/                                 ← 20+ pages (App Router)
│   │   ├── components/
│   │   │   ├── layout/                          ← Header, Footer, Breadcrumbs
│   │   │   ├── sections/                        ← Hero, QuickAccess, CalendarWidget, NewsGrid,
│   │   │   │                                      UpcomingEvents, Newsletter, FilteredFormaciones,
│   │   │   │                                      FilteredEventos, DirectorioSearch, ContactForm,
│   │   │   │                                      InscripcionForm, ColegiacionForm, PonentesGrid
│   │   │   └── ui/                              ← Badge, Button, Card, Container, SectionHeading
│   │   ├── lib/
│   │   │   ├── graphql/client.ts                ← fetchGraphQL wrapper
│   │   │   ├── graphql/queries/                 ← 7 query files
│   │   │   ├── types/index.ts                   ← TypeScript interfaces
│   │   │   ├── auth.ts                          ← Token auth (localStorage)
│   │   │   ├── seo/                             ← metadata + schema.org
│   │   │   └── utils/cn.ts                      ← classnames helper
│   │   └── styles/globals.css                   ← Tailwind v4 theme tokens
│   ├── public/                                  ← logo.png, junta photos, SVG placeholders
│   ├── nixpacks.toml                            ← Node 20, no-cache
│   └── tsconfig.json                            ← incremental: false (Nixpacks fix)
├── scripts/                                     ← setup y deploy
├── reports/                                     ← informes
├── data/                                        ← exports
└── assets/                                      ← creatividades
```

## Menu (hardcoded en Header.tsx)

```
El Colegio → Carta de la Presidenta, Junta de Gobierno, Transparencia, Contacto
Hazte Colegiado → Colegiados, Precolegiados
Servicios Colegiado → Empleo, Mentoring, Ayudas/Becas, Acuerdos/Convenios, Recursos, Servicios en Linea
Servicios Ciudadano → Orientacion Juridica, Mediacion Laboral, Clinica Juridica
Formacion y Eventos → Agenda, Formacion, Eventos
Actualidad → Blog del Colegiado, Novedades, Galeria, Revista El Graduado
```

Desktop: hover dropdown (sin chevron, parent items son Links clickables)
Mobile: acordeon con expand/collapse
Area Privada: dropdown con login form / user menu

## Design System (brand manual applied)

| Component | Key specs |
|-----------|-----------|
| **Badge** | 6 colors per manual, padding 5px 14px, tracking 0.08em, rounded-full |
| **Button gradient** | #2F5BEA→#18B7B0, hover changes direction, shadow azul, translateY(-2px) |
| **Button outline** | border 1.5px #2563EB, hover fill |
| **Button institutional** | bg #1565C0 (Logo Blue), hover #0D47A1 |
| **Card** | padding 28px, radius 16px, base shadow, hover -6px + shadow, 400ms |
| **Typography** | Plus Jakarta Sans, body weight 300, headings 600-800, uppercase tracking 0.08em |
| **Grid gap** | 32px (gap-8) between cards |
| **Colors** | Primary #2563EB, Teal #2BD4C7, Logo Blue #1565C0, Navy #0E111B (footer only) |

## Comandos utiles

```bash
# Frontend dev
cd frontend && npm run dev

# Build
cd frontend && npm run build

# Deploy (manual trigger)
bash scripts/deploy-frontend.sh
```

## Reglas

1. **Nunca modificar WordPress en produccion** sin backup previo
2. Los ACF field groups se versionan en `acf-json/` (JSON sync)
3. Frontend usa ISR con `revalidate: 60`
4. Imagenes via `next/image` con dominios configurados en next.config.ts
5. Design system: ver `manual-estilo-web_2026-03-15.md`
6. ACF select fields devuelven arrays en GraphQL — usar `Array.isArray()`
7. ACF file fields necesitan `node { mediaItemUrl, title }` en GraphQL
8. Nixpacks: `incremental: false` en tsconfig.json, Node 20 en nixpacks.toml
9. EasyPanel autoDeploy=false — trigger manual despues de cada push

## Gotchas

- **PonentesGrid** `cargo` es required — mapear con `cargo: p.cargo || ''`
- **Badge en flex-col** se estira — envolver en `<div>` para mantener inline
- **WordPress email** usa `wp_mail()` default — necesita plugin SMTP para produccion
- **Menu routes** deben coincidir con estructura de carpetas en app/
- **Deploy cache** — bump package.json version o nixpacks.toml no-cache

## Estado actual

- [x] WordPress theme headless con CPTs, taxonomias, REST API
- [x] ACF field groups con JSON sync
- [x] Next.js frontend completo con 20+ paginas
- [x] Todas las paginas conectadas a GraphQL real
- [x] generateStaticParams en todas las rutas dinamicas
- [x] Formularios (inscripcion, contacto, colegiacion) con backend
- [x] Mega-menu desplegable con login dropdown
- [x] Homepage: hero, quick access, CTA, upcoming events, calendar, news, newsletter
- [x] Buscador global (/buscar)
- [x] Sistema de imagenes con placeholders
- [x] Brand manual aplicado a Badge, Button, Card
- [x] Author box en blog (E-E-A-T)
- [x] Servicios ciudadano: Orientacion Juridica, Mediacion Laboral, Clinica Juridica
- [x] Hazte Colegiado: landing conversion + colegiados (3 modalities) + precolegiados
- [x] Deploy en EasyPanel funcionando
- [ ] Paginas de Servicios Colegiado (empleo, mentoring, etc.)
- [ ] Subpaginas de Actualidad (galeria, revista)
- [ ] Newsletter backend
- [ ] Imagenes reales (depende del cliente)
- [ ] SMTP plugin para emails
- [ ] UpcomingEvents: convertir a tira de 3 con slide
