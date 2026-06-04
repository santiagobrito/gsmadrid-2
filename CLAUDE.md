# GS Madrid

Web institucional del Colegio de Graduados Sociales de Madrid. WordPress headless + Next.js 15.

> Para skills compartidos, scripts y credenciales ver `../CLAUDE.md` y `../shared/`.
> Para credenciales EasyPanel ver `.env` en esta carpeta.

## Datos generales

- **Empresa**: Excmo. Colegio Oficial de Graduados Sociales de Madrid (CGSM)
- **Sector**: Colegio Profesional
- **Ubicacion**: C/ Jose Abascal, 44 — 5a izda., 28003 Madrid
- **Web**: gsmadrid.uptomarketing.com (en desarrollo)
- **Contacto**: Presidenta Teresa Silleras Martinez — 91 523 08 88 — admon@graduadosocialmadrid.org
- **Tipo**: Indirecto (Izquierdo Motter)
- **Cuota**: Proyecto web

## Plataformas

| Plataforma | ID/URL | Estado |
|---|---|---|
| WordPress (headless) | EasyPanel proyecto `gsmadrid` | En desarrollo |
| EasyPanel | panel.baitcore.com, servidor `a7lflv` | Activo |
| Stripe | Test keys en `.env` | Solo modo test |
| Google Ads | -- | No aplica |
| GA4 | -- | Pendiente (post-lanzamiento) |
| Search Console | -- | Pendiente (post-lanzamiento) |

## Stack tecnico

| Capa | Tech |
|------|------|
| CMS | WordPress (backend de contenido) + Next.js (frontend), conectados vía GraphQL. ACF Pro para campos custom. NO Elementor. |
| Frontend | Next.js 15 + Tailwind v4 |
| Data | GraphQL (WPGraphQL) |
| Pagos | Stripe (Payment Intents, modo test) |
| Hosting | EasyPanel (panel.baitcore.com) |

## Design system

- **Fuente:** Plus Jakarta Sans (body weight 300)
- **Color primario:** #2563EB (Electric Blue)
- **Color acento:** #2BD4C7 (Teal)
- **Navy:** #0E111B (footer, headings)
- **CTAs:** gradiente 90deg #2F5BEA -> #18B7B0, pill shape

## Audiencias clave

1. **Colegiados ejercientes:** formacion continua, representacion, servicios profesionales
2. **Estudiantes/precolegiados:** 30 EUR/ano, networking, practicas, orientacion (PRIORIDAD)
3. **Ciudadanos/empresas:** clinica juridica gratuita, buscador de profesionales, mediacion

## Agentes especializados (`.claude/agents/`)

| Agente | Funcion |
|--------|---------|
| `seo-copywriter` | Copy persuasivo y SEO para paginas web |
| `elementor-designer` | Diseno y maquetacion en Elementor via API |
| `wordpress-tech-scaffold` | Infraestructura WordPress tecnica |
| `easypanel-devops` | Deploy y gestion de servicios en EasyPanel |

## Google Ads — Estado actual

No aplica. Este es un proyecto web, sin campanas Ads previstas.

## SEO — Estado actual

Pendiente. Se implementara post-lanzamiento.

## Estado y alertas

- **Web:** En desarrollo activo. Deadline lanzamiento: miércoles 10-jun-2026 (impuesto por Junta General CGSM).
- **Dominio temporal:** gsmadrid.uptomarketing.com
- **Copy:** Multiples sprints completados (ver `reports/`)
- **Investigacion:** Benchmark de colegios profesionales, investigacion de la profesion, manual de estilo — todo en `reports/`
- **Censo de colegiados:** CSV curado (1.138 cuentas) listo para import. Script preparado en `scripts/import/`, sin ejecutar todavía.
- **⚠️ ACF Field Groups solo en BD:** JSON sync deshabilitado en `inc/acf.php`. Backup hecho en `data/wp-theme-snapshot/acf-json/` (5 grupos). Re-exportar via `scripts/import/export_acf.php` si se tocan campos.

## Modelo WP (descubierto 2026-06-04)

WP 7.0 + ACF Pro 6.7 + WPGraphQL 2.13 (update 2.15 disponible) + tema custom `gsmadrid-headless` v1.0.0.

**Roles custom:** `profesional` (Profesional Colegiado), `precolegiado`. Caps mínimos (read + upload_files).

**CPTs:** `profesional` (perfil colegiado, 18 campos ACF), `formacion`, `evento`, `miembro_junta`. Todos expuestos en GraphQL.

**Taxonomies sobre `profesional`:** `especialidad`, `localidad` (se llenan en onboarding del colegiado, máximo 3 cada una).

**Vinculación user ↔ CPT:** bidireccional via user_meta `_profesional_post_id` ↔ post_meta `_profesional_user_id`. Hook `gsmadrid_link_user_profesional` (en `user_register`) la crea automáticamente al alta de cualquier user con rol profesional/precolegiado — el CPT nace en `draft`.

**Auth headless:** sistema custom de tokens base64 `userID:timestamp:hash`, 7d expiry, rate-limit 5 intentos/5min/IP. Endpoints REST en `/wp-json/gsmadrid/v1/`: `auth/login`, `auth/logout`, `auth/me`, `profile/update`, `profile/upload-photo`. Definidos en `inc/auth.php` del tema.

**Email de bienvenida:** se dispara solo cuando CPT pasa de draft→publish (es decir, cuando el colegiado activa `visible_directorio`). NO se manda al crear cuenta. Plantilla HTML en `inc/email-bienvenida.php`.

**Campos editables por el colegiado** (POST /profile/update): `despacho, direccion, codigo_postal, telefono, email, web, linkedin, bio, idiomas, visible_directorio` + taxonomies. Los demás (nombre, apellidos, nº col, DNI, ejerciente, mediador, turno de oficio) los gestiona el Colegio.

## Proximos pasos

1. Completar desarrollo web — deadline 10-jun para Junta General.
2. Ejecutar import de colegiados (`scripts/import/import_colegiados.py --apply --limit 5` para test, luego batch completo).
3. Migrar dominio definitivo
4. Configurar GA4 y Search Console
5. Lanzamiento publico
6. Post-lanzamiento: campaña dedicada de invitación a colegiados para que activen cuenta y completen perfil.

## Reglas especificas

- Tono: profesional pero cercano, nunca burocratico
- Seccion /precolegiados/: mas teal, tono mas dinamico y joven
- Motto oficial: "Tu futuro, nuestro compromiso"
- Nunca Lorem Ipsum — todo el copy debe ser final
- Los scripts estan en `scripts/` (movidos desde la raiz)
