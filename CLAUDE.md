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
| CMS | WordPress headless (Elementor para edicion) |
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

- **Web:** En desarrollo activo
- **Dominio temporal:** gsmadrid.uptomarketing.com
- **Copy:** Multiples sprints completados (ver `reports/`)
- **Investigacion:** Benchmark de colegios profesionales, investigacion de la profesion, manual de estilo — todo en `reports/`

## Historial reciente

- Investigacion y benchmark de colegios profesionales completados
- Multiples sprints de copy completados
- Infraestructura WordPress + Next.js configurada en EasyPanel
- Design system definido

## Proximos pasos

1. Completar desarrollo web
2. Migrar dominio definitivo
3. Configurar GA4 y Search Console
4. Lanzamiento publico

## Reglas especificas

- Tono: profesional pero cercano, nunca burocratico
- Seccion /precolegiados/: mas teal, tono mas dinamico y joven
- Motto oficial: "Tu futuro, nuestro compromiso"
- Nunca Lorem Ipsum — todo el copy debe ser final
- Los scripts estan en `scripts/` (movidos desde la raiz)
