# GS Madrid 2 — Documentacion Tecnica Completa

**Fecha:** 21 de marzo de 2026
**Version:** 1.0
**Proyecto:** Rediseno web Colegio Oficial de Graduados Sociales de Madrid
**Stack:** WordPress Headless + ACF Pro + WPGraphQL + Next.js 15 + Tailwind CSS 4

---

## 1. Arquitectura General

```
┌─────────────────┐     GraphQL      ┌──────────────────┐
│   WordPress      │ ◄──────────────► │    Next.js 15     │
│   (Headless CMS) │     REST API     │   (App Router)    │
│                  │ ◄──────────────► │                   │
│  - ACF Pro       │                  │  - TypeScript     │
│  - WPGraphQL     │                  │  - Tailwind CSS 4 │
│  - WPGraphQL ACF │                  │  - graphql-request│
│  - Classic Editor│                  │  - lucide-react   │
│  - Tema headless │                  │  - date-fns       │
│                  │                  │                   │
│  MariaDB ◄───────┤                  │  Standalone build │
└─────────────────┘                  └──────────────────┘
        │                                     │
        ▼                                     ▼
   EasyPanel                            EasyPanel
   WordPress Service                    App Service
   (gsmadrid-2-wordpress)               (gsmadrid-2-web)
```

### URLs

| Servicio | URL | Uso |
|----------|-----|-----|
| Frontend | https://gsmadrid-2-web.a7lflv.easypanel.host | Web publica |
| WordPress Admin | https://gsmadrid-2-wordpress.a7lflv.easypanel.host/wp-admin | Gestion de contenido |
| GraphQL Endpoint | https://gsmadrid-2-wordpress.a7lflv.easypanel.host/graphql | API de datos |
| GraphiQL IDE | https://gsmadrid-2-wordpress.a7lflv.easypanel.host/wp-admin (WPGraphQL) | Testing de queries |
| GitHub | https://github.com/santiagobrito/gsmadrid-2 | Codigo fuente |
| EasyPanel | https://panel.baitcore.com | Infraestructura |

### Credenciales WordPress

- **Usuario:** admin
- **Password:** GsMadrid2026!
- **Email:** santiagobrito@gmail.com

---

## 2. Custom Post Types (CPTs)

### 2.1 Formacion

**Uso:** Cursos, jornadas, seminarios, talleres, webinars
**Slug:** `/formacion`
**GraphQL:** `formacion` / `formaciones`

| Campo ACF | Tipo | Descripcion |
|-----------|------|-------------|
| fecha_inicio | date_picker | Fecha de inicio |
| fecha_fin | date_picker | Fecha de fin |
| horario | text | Ej: "10:00 - 14:00" |
| horas_lectivas | number | Duracion total |
| lugar | text | Ubicacion o "Online" |
| plazas | number | Aforo maximo |
| tipo_acceso | select | Gratuito / Pago / Mixto |
| es_gratuito | true_false | Flag de gratuidad |
| estado | select | Abierta / Completa / Cancelada / Finalizada |
| ponentes | repeater | nombre, cargo, bio (requiere ACF Pro) |
| precios | repeater | concepto, importe, nota (requiere ACF Pro) |
| programa | wysiwyg | Programa detallado |
| url_inscripcion | url | URL externa (Typeform, etc.) |
| documento_programa | file | PDF descargable |
| homologacion | text | Info de homologacion |
| diploma_habilitado | true_false | Activa seccion diploma |
| diploma_* | varios | Titulo, horas, firmante, sello, plantilla |

**Taxonomias:** modalidad (Presencial/Online/Hibrido), area_formativa (Laboral/Fiscal/etc.)

### 2.2 Evento

**Uso:** Asambleas, networking, actos institucionales, conferencias
**Slug:** `/evento`
**GraphQL:** `evento` / `eventos`

| Campo ACF | Tipo | Descripcion |
|-----------|------|-------------|
| fecha_inicio | date_picker | Fecha del evento |
| fecha_fin | date_picker | Fecha fin (si varios dias) |
| horario | text | Horario |
| lugar | text | Ubicacion |
| tipo_evento | select | Institucional / Asamblea / Networking / Conferencia / Acto Social |
| estado | select | Programado / Abierto / Completo / Cancelado / Finalizado |
| plazas | number | Aforo |
| requiere_inscripcion | true_false | Si necesita registro previo |
| solo_colegiados | true_false | Exclusivo para miembros |
| url_inscripcion | url | URL externa |
| organizador | text | Entidad organizadora |
| programa | wysiwyg | Programa del evento |
| documento | file | Documento adjunto |

### 2.3 Curso

**Uso:** Formacion larga con modulos y certificacion
**Slug:** `/curso`
**GraphQL:** `curso` / `cursos`

Hereda todos los campos de Formacion + campos adicionales:

| Campo ACF | Tipo | Descripcion |
|-----------|------|-------------|
| duracion_texto | text | Ej: "120 horas / 6 meses" |
| dirigido_a | textarea | Publico objetivo |
| objetivos | repeater | Lista de objetivos |
| modulos | repeater | titulo, descripcion, horas |
| profesorado | repeater | nombre, cargo, foto |
| certificacion | textarea | Info de certificacion |
| colaboradores | repeater | nombre, logo, url |

### 2.4 Profesional

**Uso:** Directorio de colegiados
**Slug:** `/profesional`
**GraphQL:** `profesional` / `profesionales`

| Campo ACF | Tipo | Editable por colegiado | Descripcion |
|-----------|------|----------------------|-------------|
| numero_colegiado | text | No | Numero oficial |
| nombre_completo | text | No | Nombre legal |
| foto | image | No (via admin) | Foto profesional |
| despacho | text | Si | Nombre del despacho |
| direccion | text | Si | Direccion postal |
| codigo_postal | text | Si | CP |
| telefono | text | Si | Telefono de contacto |
| email | email | Si | Email profesional |
| web | url | Si | Web del despacho |
| linkedin | url | Si | Perfil LinkedIn |
| bio | wysiwyg | Si | Presentacion profesional |
| ejerciente | true_false | No | Si ejerce activamente |
| idiomas | text | Si | Idiomas que habla |
| acepta_turno_oficio | true_false | No | Participa en turno |
| mediador_registrado | true_false | No | Mediador oficial |
| visible_directorio | true_false | Si | Aparecer en directorio publico |

**Taxonomias:** especialidad, localidad

**Relacion User ↔ CPT:**
```
User WP (rol: profesional)
    ↓ user_register hook
Auto-crea CPT profesional (post_status: draft)
    ↓ meta bidireccional
_profesional_post_id (en user meta)
_profesional_user_id (en post meta)
    ↓ cuando visible_directorio = true
CPT pasa a post_status: publish → aparece en /directorio
```

### 2.5 Miembro Junta

**Uso:** Junta de Gobierno del Colegio
**Slug:** `/junta`
**GraphQL:** `miembroJunta` / `miembrosJunta`

| Campo ACF | Tipo | Descripcion |
|-----------|------|-------------|
| cargo | select | Presidenta, Vicepresidente, Secretaria, etc. |
| tipo | select | directivo / vocal_ejerciente / vocal_no_ejerciente |
| orden | number | Orden de aparicion (1 = primero) |
| mandato | text | Ej: "2025-2029" |
| destacado | true_false | Card grande (solo presidenta) |
| bio | textarea | Descripcion profesional |
| cita | text | Lema o frase |
| email | email | Email de contacto |
| linkedin | url | Perfil LinkedIn |

---

## 3. Taxonomias

| Taxonomia | Slug | CPTs | Terminos iniciales |
|-----------|------|------|-------------------|
| Modalidad | modalidad | formacion, curso | Presencial, Online, Hibrido |
| Area Formativa | area_formativa | formacion, curso | Laboral, Fiscal, Seguridad Social, Contable, Juridico, PRL, Extranjeria, Mediacion |
| Especialidad | especialidad | profesional | Laboral, Fiscal, Seguridad Social, PRL, Extranjeria, Mediacion, Contable |
| Localidad | localidad | profesional | Madrid Capital, Alcala de Henares, Getafe, Leganes, Mostoles, Alcorcon, Fuenlabrada, Torrejon |

---

## 4. Frontend — Paginas y Rutas

### 4.1 Paginas implementadas (19)

| Ruta | Tipo | Data source | Estado |
|------|------|-------------|--------|
| `/` | Server | GraphQL (posts + formaciones) | ✅ Dinamico |
| `/el-colegio` | Server | Estatico | ✅ Completo |
| `/el-colegio/carta-presidenta` | Server | Estatico (copy real) | ✅ Completo |
| `/el-colegio/junta-de-gobierno` | Server | GraphQL (miembrosJunta) con fallback | ✅ Dinamico |
| `/el-colegio/transparencia` | Server | Estatico | ✅ Completo |
| `/contacto` | Server | Estatico + formulario visual | ⚠️ Form sin backend |
| `/hazte-colegiado` | Server | Estatico | ✅ Completo |
| `/servicios-colegiado` | Server | Estatico | ✅ Completo |
| `/servicios-ciudadano` | Server | Estatico | ✅ Completo |
| `/formacion-eventos` | Server → Client | GraphQL (formaciones) | ✅ Dinamico + filtros |
| `/formacion-eventos/[slug]` | Server | Placeholder (TODO: GraphQL) | ⚠️ Datos hardcoded |
| `/eventos` | Server → Client | GraphQL (eventos) | ✅ Dinamico + filtros |
| `/eventos/[slug]` | Server | Placeholder | ⚠️ Datos hardcoded |
| `/actualidad` | Server | GraphQL (posts) | ✅ Dinamico |
| `/actualidad/[slug]` | Server | Placeholder (TODO: GraphQL) | ⚠️ Datos hardcoded |
| `/directorio` | Client | Placeholder (TODO: GraphQL) | ⚠️ Datos hardcoded |
| `/directorio/[slug]` | Server | Placeholder (TODO: GraphQL) | ⚠️ Datos hardcoded |
| `/area-privada` | Client | REST API (auth) | ✅ Login + dashboard |
| `/area-privada/perfil` | Client | REST API (profile) | ✅ Editor de perfil |

### 4.2 Componentes (17)

**Layout (3):**
- `Header` — Sticky, logo, nav dinamico (WP menu con fallback), CTA, mobile hamburger
- `Footer` — Navy bg, 5 columnas, logo negativo, social icons
- `Breadcrumbs` — Full-width bar con JSON-LD schema

**Sections (9):**
- `Hero` — Split layout: H1 izquierda + slider noticias derecha (auto-rotate 6s)
- `QuickAccess` — 3 cards perfil (Colegiado/Ciudadano/Colegiarme)
- `CalendarWidget` — Calendario interactivo con puntitos de eventos
- `NewsGrid` — Grid 3 columnas de noticias (acepta props de GraphQL)
- `FilteredFormaciones` — Client component con filtros (Todos/Presencial/Online/Gratuito)
- `FilteredEventos` — Client component con filtros (Todos/Institucional/Networking/Asamblea)
- `InscripcionForm` — Formulario 3 pasos (Perfil → Datos → Modalidad)
- `PonentesGrid` — Cards de ponentes con foto, cargo, bio, links
- `CalendarPreview` — Preview estatico (reemplazado por CalendarWidget en home)

**UI (5):**
- `Button` — 3 variantes: gradient (azul-teal), outline, institutional
- `Card` — Border 16px, hover translateY(-6px), shadow
- `Badge` — 6 colores: institutional, formacion, eventos, colegio, activo, pendiente
- `Container` — max-width 1200px (o 800px narrow)
- `SectionHeading` — Titulo + subtitulo + badge opcional

### 4.3 Patron de data fetching

```
Pagina server component
    ↓
try { fetchGraphQL(QUERY) } catch { fallback }
    ↓
Si hay filtros → pasa data a client component como prop
    ↓
Client component maneja estado de filtros
    ↓
ISR: revalidate = 60 (contenido fresco cada minuto)
```

### 4.4 Menu dinamico (hibrido)

```
layout.tsx (server)
    ↓
getNavItems() → fetchGraphQL(GET_MENU, { location: 'PRIMARY' })
    ↓ (exito)
Usa items de WordPress
    ↓ (error)
Usa FALLBACK_NAV hardcoded
    ↓
Pasa navItems como prop a Header (client)
```

El admin puede reorganizar el menu desde WP Admin → Apariencia → Menus sin tocar codigo.

---

## 5. Sistema de Autenticacion

### 5.1 Flujo de login

```
Frontend: /area-privada
    ↓ POST /wp-json/gsmadrid/v1/auth/login { username, password }
WordPress: wp_authenticate()
    ↓ (exito)
Genera token: base64(user_id:timestamp:hash)
Guarda en user_meta (_gsmadrid_auth_token, _gsmadrid_auth_token_expires)
    ↓
Retorna { success, token, user }
    ↓
Frontend: localStorage.setItem('gsmadrid_auth_token', token)
```

### 5.2 Endpoints REST API

| Endpoint | Metodo | Auth | Funcion |
|----------|--------|------|---------|
| `/wp-json/gsmadrid/v1/auth/login` | POST | No | Login → token |
| `/wp-json/gsmadrid/v1/auth/me` | GET | Bearer | Datos user + perfil ACF |
| `/wp-json/gsmadrid/v1/profile/update` | POST | Bearer | Actualizar campos editables |

### 5.3 Campos editables por el profesional

despacho, direccion, codigo_postal, telefono, email, web, linkedin, bio, idiomas, visible_directorio

### 5.4 Campos solo admin

numero_colegiado, nombre_completo, ejerciente, acepta_turno_oficio, mediador_registrado, foto

### 5.5 Token

- Formato: base64(user_id:timestamp:wp_hash)
- Expira: 30 dias
- Validacion: filter `determine_current_user` compara token almacenado en user_meta
- Header: `Authorization: Bearer <token>`

---

## 6. Formulario de Inscripcion (3 pasos)

### Paso 1: Perfil

| Perfil | Descripcion | Precio base |
|--------|-------------|-------------|
| Colegiado/a | Miembro del CGSM | Gratuito |
| Pre-Colegiado/a | Estudiante Miembro | Gratuito |
| Externo | No pertenece al CGSM | 50€ |

Si es colegiado o precolegiado → se activa campo "N.o de colegiado" (obligatorio)

### Paso 2: Datos personales

- Nombre completo *
- Email *
- Telefono (opcional)
- Empresa/Organizacion (solo externos)
- Checkbox privacidad *

### Paso 3: Modalidad

- Presencial / Online / Hibrido (segun disponibilidad de la formacion)
- El precio puede variar segun perfil + modalidad (configurable via ACF)
- Resumen con total
- Boton "Confirmar inscripcion" o "Confirmar y pagar"

**Estado actual:** El formulario es funcional visualmente pero NO envia datos a ningun backend. TODO: conectar con REST API de WordPress.

---

## 7. Design System

### Colores

| Token | Hex | Uso |
|-------|-----|-----|
| primary | #2563EB | CTAs, links, estados activos |
| teal | #2BD4C7 | Gradientes, badges tech |
| logo-blue | #1565C0 | Acento institucional |
| navy | #0E111B | Footer, headings |
| text | #0F172A | Texto principal |
| text-secondary | #475569 | Parrafos |
| text-tertiary | #6B7280 | Metadata, placeholders |
| border | #E2E8F0 | Cards, separadores |
| bg-alt | #F7F8FA | Secciones alternas |
| success | #16A34A | Estados positivos |
| warning | #D97706 | Alertas |
| error | #DC2626 | Errores |

### Tipografia

- **Fuente:** Plus Jakarta Sans (Google Fonts)
- **Body:** weight 300, 18px
- **Headings:** weight 600-800
- **Display (H1 hero):** 84px desktop / 36px mobile, weight 800

### Componentes

- **Botones:** pill shape (40px radius), gradiente azul-teal / outline / institutional
- **Cards:** 16px radius, border, hover translateY(-6px) + shadow
- **Badges:** pill, uppercase, 12px, 6 variantes de color
- **Layout:** max-width 1200px, padding responsive 16-24px

---

## 8. WordPress — Plugins Instalados

| Plugin | Version | Estado | Funcion |
|--------|---------|--------|---------|
| ACF Pro | 6.7.0.2 | Activo | Campos personalizados |
| WPGraphQL | 2.10.1 | Activo | API GraphQL |
| WPGraphQL for ACF | 2.5.1 | Activo | Expone ACF en GraphQL |
| Akismet | 5.6 | Inactivo | Anti-spam (no necesario headless) |
| Hello Dolly | 1.7.2 | Inactivo | Demo plugin (eliminar) |

### Tema activo

`gsmadrid-headless` — tema custom sin frontend, solo backend:
- functions.php: 620+ lineas con CPTs, taxonomias, REST API, auth, roles
- acf-json/: 6 field groups con JSON sync
- Classic Editor habilitado (Gutenberg desactivado)

---

## 9. Datos Mock Creados

| Tipo | Cantidad | Con ACF fields | Con imagen |
|------|----------|---------------|------------|
| Posts (blog) | 6 | No (post_extra) | No |
| Formaciones | 5 | Si (fechas, precios, etc.) | No |
| Eventos | 4 | Si (tipo, estado, etc.) | No |
| Miembros Junta | 14 | Si (cargo, bio, etc.) | Si (14 fotos) |
| Menu WP | 1 | — | — |
| Taxonomias | 20+ terminos | — | — |

---

## 10. Lo que FALTA (priorizado)

### P0 — Critico (bloquea produccion)

| # | Tarea | Impacto |
|---|-------|---------|
| 1 | **Conectar `/formacion-eventos/[slug]` a GraphQL real** | Paginas de detalle de formacion muestran datos placeholder |
| 2 | **Conectar `/actualidad/[slug]` a GraphQL real** | Posts del blog no cargan contenido real |
| 3 | **Conectar `/directorio` a GraphQL real** | Directorio muestra profesionales falsos |
| 4 | **Conectar `/directorio/[slug]` a GraphQL real** | Perfiles individuales no funcionan |
| 5 | **Backend del formulario de inscripcion** | Las inscripciones no se guardan en ningun sitio |
| 6 | **Backend del formulario de contacto** | Los mensajes de contacto no llegan a nadie |
| 7 | **`generateStaticParams()`** en rutas dinamicas | Sin esto, las rutas dinamicas no se pre-renderizan |

### P1 — Importante (funcionalidad incompleta)

| # | Tarea | Impacto |
|---|-------|---------|
| 8 | **Conectar Area Privada al REST API real** | Login/perfil dependen de WP REST API (preparado, no testeado end-to-end) |
| 9 | **Imagenes para posts, formaciones y eventos** | Todo el contenido mock carece de imagenes destacadas |
| 10 | **Hazte Colegiado: 4 perfiles segmentados** | Solo hay una pagina generica, faltan: Precolegiados, Ejercientes Libres, Ejercientes Empresa, No Ejercientes |
| 11 | **Servicios detallados** | Clinica Juridica, Asistencia Juridica Gratuita, Mediacion, Canal de Denuncias, Voluntariado — solo hay cards genericas |
| 12 | **SEO: generateMetadata dinamico** | Las paginas [slug] no generan titles/descriptions desde el contenido real |
| 13 | **Hemeroteca** | Revista "El Graduado" — no implementada |
| 14 | **Repositorio documental** | Estatutos, memorias, presupuestos — links a "#" |

### P2 — Mejoras (polish)

| # | Tarea | Impacto |
|---|-------|---------|
| 15 | **Pasarela de pago** | Preparada la estructura pero no conectada (Redsys/Stripe) |
| 16 | **Certificados/diplomas auto-descargables** | ACF fields preparados, falta generador PDF |
| 17 | **Blog: migracion desde subdomain** | blog.graduadosocialmadrid.org tiene contenido historico |
| 18 | **SEO: redirects 301 desde Joomla** | La web actual en Joomla tiene URLs distintas |
| 19 | **GA4 + cookies GDPR** | No hay analytics ni banner de cookies |
| 20 | **Responsive QA** | No se ha testeado en 375px, 768px, 1440px formalmente |
| 21 | **Lighthouse audit** | No se ha medido LCP, accesibilidad, etc. |
| 22 | **Tests automatizados** | 0 tests (unit, integration, E2E) |
| 23 | **CI/CD pipeline** | Deploy es manual via API EasyPanel |
| 24 | **Dominio real** | Actualmente en *.easypanel.host — migrar a graduadosocialmadrid.org |
| 25 | **Verificacion de colegiado** | Badge/sello QR para verificar colegiacion |

---

## 11. Problemas Detectados

### 11.1 Resueltos

| Problema | Solucion aplicada |
|----------|------------------|
| Logo demasiado grande en header | Reducido a 180px |
| Breadcrumbs dentro de Container (rompian layout boxed) | Movidos a top-level fragment en 11 paginas |
| Nginx 413 error (upload ACF Pro) | `client_max_body_size 256M` en http block |
| Gutenberg innecesario en headless | Desactivado via `use_block_editor_for_post` |
| Menu hardcoded | Hibrido: WordPress menu via GraphQL + fallback |
| Emojis en formulario de inscripcion | Reemplazados con indicadores visuales sobrios |
| LinkedIn no aparecia en junta | Anadido a GraphQL query + interfaz + rendering |

### 11.2 Pendientes

| Problema | Impacto | Solucion sugerida |
|----------|---------|-------------------|
| `CalendarPreview` importado pero no usado | Archivo muerto | Eliminar componente |
| ACF select devuelve arrays en GraphQL | `cargo` viene como `["presidenta","Presidenta"]` | Ya manejado con `Array.isArray` check, pero documentar |
| Token auth basico (no JWT real) | Seguridad limitada | Evaluar JWT plugin o Application Passwords |
| Fotos solo en junta, no en posts/formaciones | Contenido sin imagenes | Subir imagenes de stock a WP media |
| Errores de GraphQL silenciados | Dificil debuggear | Agregar logging en catch blocks |
| No hay rate limiting en REST API de auth | Potencial brute force | Agregar rate limiting plugin o middleware |
| EasyPanel build usa Nixpacks, no Dockerfile | El multi-stage Dockerfile no se usa | Verificar si Nixpacks produce builds optimos |

---

## 12. Scripts Disponibles

| Script | Ubicacion | Funcion |
|--------|-----------|---------|
| `setup-easypanel.sh` | scripts/ | Crea proyecto + servicios en EasyPanel |
| `setup-wordpress.sh` | scripts/ | Post-instalacion WP (plugins, tema, config) |
| `deploy-frontend.sh` | scripts/ | Trigger deploy en EasyPanel |
| `seed-mock-data.sh` | scripts/ | Crea contenido de prueba en WordPress |

### Comandos de desarrollo

```bash
# Frontend dev
cd frontend && npm run dev

# Build local
cd frontend && npm run build

# Deploy manual
bash scripts/deploy-frontend.sh

# Ver logs en EasyPanel
# https://panel.baitcore.com/projects/gsmadrid-2/services/web
```

---

## 13. Flujo de Contenido

### Para publicar una formacion:

1. WP Admin → Formacion → Anadir nueva
2. Rellenar: titulo, contenido, imagen destacada
3. Rellenar ACF: fecha, horario, lugar, plazas, estado, tipo acceso
4. Asignar taxonomias: modalidad, area formativa
5. Publicar → aparece en /formacion-eventos en max 60 segundos

### Para publicar un evento:

1. WP Admin → Eventos → Anadir nuevo
2. Rellenar: titulo, contenido, imagen
3. Rellenar ACF: fecha, horario, lugar, tipo, estado, plazas
4. Publicar → aparece en /eventos en max 60 segundos

### Para gestionar la junta:

1. WP Admin → Junta de Gobierno → Editar miembro
2. Cambiar cargo, bio, foto, linkedin
3. Guardar → se refleja en /el-colegio/junta-de-gobierno en max 60 segundos

### Para dar de alta un colegiado:

1. WP Admin → Usuarios → Anadir nuevo
2. Rol: Profesional
3. Se auto-crea CPT profesional vinculado (draft)
4. Admin edita el CPT: numero colegiado, ejerciente, etc.
5. El colegiado accede a /area-privada, edita su perfil, activa visibilidad
6. Aparece en /directorio

---

## 14. Estructura de Archivos

```
gsmadrid-2/
├── CLAUDE.md                                  # Instrucciones del proyecto
├── .gitignore
├── .env                                       # EASYPANEL_API_KEY (no commiteado)
│
├── wordpress/
│   └── theme/gsmadrid-headless/
│       ├── style.css                          # Theme header
│       ├── index.php                          # Redirect a frontend
│       ├── functions.php                      # 620+ lineas: CPTs, auth, REST API, roles
│       └── acf-json/
│           ├── group_formacion.json
│           ├── group_evento.json
│           ├── group_curso.json
│           ├── group_profesional.json
│           ├── group_miembro_junta.json
│           └── group_post_extra.json
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts                         # standalone + image domains
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   ├── Dockerfile                             # Multi-stage Node 20 Alpine
│   ├── .env.example
│   ├── public/
│   │   ├── logo.png                           # Logo oficial
│   │   ├── teresa-silleras.jpg                # Foto presidenta
│   │   ├── junta/                             # 14 fotos miembros junta
│   │   └── .gitkeep
│   └── src/
│       ├── styles/globals.css                 # Tailwind v4 + @theme tokens
│       ├── app/
│       │   ├── layout.tsx                     # Root: font, menu dinamico, header+footer
│       │   ├── page.tsx                       # Homepage: hero, quickaccess, calendar, news
│       │   ├── el-colegio/
│       │   │   ├── page.tsx                   # Hub institucional
│       │   │   ├── carta-presidenta/page.tsx  # Copy real Teresa Silleras
│       │   │   ├── junta-de-gobierno/page.tsx # 14 miembros desde GraphQL
│       │   │   └── transparencia/page.tsx     # 6 categorias documentos
│       │   ├── contacto/page.tsx              # Sede + Sala Togas + form
│       │   ├── hazte-colegiado/page.tsx       # Ventajas colegiacion
│       │   ├── servicios-colegiado/page.tsx   # 6 servicios
│       │   ├── servicios-ciudadano/page.tsx   # 4 servicios
│       │   ├── formacion-eventos/
│       │   │   ├── page.tsx                   # Listing desde GraphQL + filtros
│       │   │   └── [slug]/page.tsx            # Detalle (TODO: GraphQL)
│       │   ├── eventos/
│       │   │   ├── page.tsx                   # Listing desde GraphQL + filtros
│       │   │   └── [slug]/page.tsx            # Detalle
│       │   ├── actualidad/
│       │   │   ├── page.tsx                   # Blog listing desde GraphQL
│       │   │   └── [slug]/page.tsx            # Post detalle (TODO: GraphQL)
│       │   ├── directorio/
│       │   │   ├── page.tsx                   # Buscador (TODO: GraphQL)
│       │   │   └── [slug]/page.tsx            # Perfil (TODO: GraphQL)
│       │   └── area-privada/
│       │       ├── page.tsx                   # Login + dashboard
│       │       └── perfil/page.tsx            # Editor de perfil
│       ├── components/
│       │   ├── ui/                            # Button, Card, Badge, Container, SectionHeading
│       │   ├── layout/                        # Header, Footer, Breadcrumbs
│       │   └── sections/                      # Hero, QuickAccess, Calendar, NewsGrid, etc.
│       └── lib/
│           ├── graphql/
│           │   ├── client.ts                  # graphql-request client
│           │   └── queries/                   # formacion, curso, profesional, posts, junta, menu
│           ├── types/index.ts                 # Interfaces TypeScript
│           ├── utils/                         # cn, format (date-fns)
│           ├── seo/                           # metadata, schema (JSON-LD)
│           └── auth.ts                        # Login, token, profile API
│
├── scripts/
│   ├── setup-easypanel.sh
│   ├── setup-wordpress.sh
│   ├── deploy-frontend.sh
│   └── seed-mock-data.sh
│
├── reports/                                   # Informes y documentacion
├── data/                                      # Exports y datos
└── assets/                                    # Creatividades
```

---

## 15. Commits (resumen cronologico)

1. Initial commit: scaffold completo (theme + CPTs + ACF + Next.js + pages)
2. Hero split layout con slider + logo
3. Paginas institucionales (Carta Presidenta, Junta, Transparencia, Contacto)
4. InscripcionForm + bloqueo eventos pasados
5. Area Privada (auth + perfil)
6. CPT miembro_junta + fotos reales
7. Breadcrumbs fix (11 paginas)
8. CPT evento separado + formulario 3 pasos
9. Menu dinamico + seed mock data
10. GraphQL real en homepage, actualidad, formacion, eventos, junta
11. Fotos junta en WP media library + featured images
12. LinkedIn/email en cards + foto Teresa + quitar emojis
13. Classic Editor + nginx fix 413

---

*Documentacion Tecnica v1.0 — GS Madrid 2 — 21 marzo 2026*
