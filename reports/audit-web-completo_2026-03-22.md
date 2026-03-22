# Audit completo de la web — GS Madrid 2
**Fecha:** 22 de marzo de 2026
**Auditor:** Claude + Santiago
**URL:** https://gsmadrid-2-web.a7lflv.easypanel.host

---

## 1. PAGINAS QUE FUNCIONAN CORRECTAMENTE

| Pagina | URL | Estado |
|--------|-----|--------|
| Homepage | `/` | OK |
| El Colegio | `/el-colegio` | OK |
| Carta de la Presidenta | `/el-colegio/carta-presidenta` | OK |
| Junta de Gobierno | `/el-colegio/junta-de-gobierno` | OK |
| Transparencia | `/el-colegio/transparencia` | OK (pero links internos van a #) |
| Contacto | `/contacto` | OK (Google Maps embed funciona) |
| Hazte Colegiado | `/hazte-colegiado` | OK (landing conversion completa) |
| Colegiados | `/hazte-colegiado/colegiados` | OK (3 modalidades + tabla comparativa) |
| Precolegiados | `/hazte-colegiado/precolegiados` | OK (gratuito, formulario) |
| Servicios Colegiado | `/servicios-colegiado` | OK |
| Servicios Ciudadano | `/servicios-ciudadano` | OK |
| Orientacion Juridica | `/servicios-ciudadano/orientacion-juridica` | OK |
| Mediacion Laboral | `/servicios-ciudadano/mediacion-laboral` | OK |
| Clinica Juridica | `/servicios-ciudadano/clinica-juridica` | OK (logos de partners) |
| Formacion y Eventos | `/formacion-eventos` | OK (GraphQL + filtros) |
| Formacion detalle | `/formacion-eventos/[slug]` | OK (GraphQL + inscripcion) |
| Eventos | `/eventos` | OK (GraphQL + filtros) |
| Evento detalle | `/eventos/[slug]` | OK (GraphQL) |
| Actualidad | `/actualidad` | OK (GraphQL + imagenes) |
| Articulo blog | `/actualidad/[slug]` | OK (GraphQL + author box E-E-A-T) |
| Directorio | `/directorio` | OK (GraphQL + busqueda) |
| Profesional detalle | `/directorio/[slug]` | OK (GraphQL) |
| Area Privada | `/area-privada` | OK (login) |
| Perfil | `/area-privada/perfil` | OK (edicion) |
| Buscar | `/buscar` | OK (busqueda GraphQL) |

---

## 2. PAGINAS QUE FALTAN POR CREAR (404)

### Servicios Colegiado (6 subpaginas)
Estan en el menu desplegable pero no tienen page.tsx:

| Ruta | Prioridad |
|------|-----------|
| `/servicios-colegiado/empleo` | Alta |
| `/servicios-colegiado/mentoring` | Alta |
| `/servicios-colegiado/ayudas-becas` | Alta |
| `/servicios-colegiado/acuerdos-convenios` | Alta |
| `/servicios-colegiado/recursos` | Media |
| `/servicios-colegiado/servicios-en-linea` | Media |

### Hazte Colegiado (3 rutas huerfanas)
La pagina principal `/hazte-colegiado` tiene 4 cards con links a modalidades individuales, pero 3 de ellas apuntan a rutas que no existen. Los usuarios deberian ir a `/hazte-colegiado/colegiados` en su lugar.

| Ruta | Solucion recomendada |
|------|---------------------|
| `/hazte-colegiado/ejercientes-libres` | Redirigir a `/hazte-colegiado/colegiados` |
| `/hazte-colegiado/ejercientes-empresa` | Redirigir a `/hazte-colegiado/colegiados` |
| `/hazte-colegiado/no-ejercientes` | Redirigir a `/hazte-colegiado/colegiados` |

### Paginas legales (4 paginas — OBLIGATORIAS por ley)
Estan en el footer pero no existen:

| Ruta | Prioridad |
|------|-----------|
| `/aviso-legal` | **CRITICA** (LSSI-CE) |
| `/politica-privacidad` | **CRITICA** (RGPD) |
| `/politica-cookies` | **CRITICA** (LSSI-CE) |
| `/accesibilidad` | Alta |

### Actualidad subpaginas
Estan en el menu pero no tienen paginas dedicadas (apuntan todas a `/actualidad`):

| Ruta | Estado |
|------|--------|
| Novedades Colegiales | Apunta a `/actualidad` (aceptable por ahora) |
| Galeria de Eventos | No existe — necesita pagina propia |
| Revista El Graduado | No existe — necesita pagina propia (hemeroteca) |

---

## 3. BOTONES Y LINKS ROTOS

| Pagina | Problema | Linea |
|--------|----------|-------|
| `/el-colegio/transparencia` | 6 cards con `href="#"` — no llevan a ninguna parte | ~104 |
| `/hazte-colegiado` (QuickAccess home) | 3 cards apuntan a rutas que no existen (ejercientes-libres, etc.) | paths array |

---

## 4. PROBLEMAS DE CONTENIDO (WordPress)

Estos se arreglan desde WP Admin, no desde codigo:

| Problema | Donde | Accion Santiago |
|----------|-------|-----------------|
| Articulo con texto "Lalalallalaa" | Post "Nuevo convenio UCM" en WP | Editar contenido real |
| Autor "admin" en todos los articulos | WP Admin > Usuarios | Crear usuario "Colegio de Graduados Sociales" o nombre del redactor real |
| Sin imagenes destacadas | Todos los posts, formaciones, eventos | Subir imagenes via Media Library y asignar como imagen destacada |
| Sin categorias reales | La mayoria de posts estan en "Sin categoria" | Crear categorias (Normativa, Colegio, Formacion, Eventos) y asignar |

---

## 5. SEO Y SCHEMA

| Problema | Estado | Accion |
|----------|--------|--------|
| Schema.org tenia direccion vieja (Flora 1) | **CORREGIDO** — ahora Jose Abascal 44 | Ninguna |
| Schema.org no tenia telefono/email | **CORREGIDO** — anadido | Ninguna |
| Meta descriptions en todas las paginas | OK | Ninguna |
| Breadcrumbs en todas las paginas | OK | Ninguna |
| Author box en articulos (E-E-A-T) | OK | Crear usuarios con nombre real en WP |

---

## 6. MARCA Y DESIGN SYSTEM

| Componente | Estado |
|------------|--------|
| Badge (6 colores) | **CORRECTO** — alineado al manual |
| Button (3 variantes) | **CORRECTO** — gradiente, outline, institutional |
| Card (padding, shadow, hover) | **CORRECTO** — 28px, sombras exactas, 400ms |
| Tipografia (Plus Jakarta Sans, body 300) | **CORRECTO** |
| Tracking (0.08em en uppercase) | **CORRECTO** |
| Grid gap (32px entre cards) | **CORRECTO** |
| Footer (Jose Abascal 44) | **CORRECTO** |
| Colores primarios | **CORRECTO** |
| Gradiente boton | **CORRECTO** (hover cambia direccion) |

---

## 7. FORMULARIOS

| Formulario | Pagina | Backend | Estado |
|------------|--------|---------|--------|
| Inscripcion (3 pasos) | `/formacion-eventos/[slug]` | `POST /gsmadrid/v1/inscripcion` | OK |
| Contacto | `/contacto` | `POST /gsmadrid/v1/contacto` | OK |
| Colegiacion (colegiados) | `/hazte-colegiado/colegiados` | `POST /gsmadrid/v1/colegiacion` | OK |
| Colegiacion (precolegiados) | `/hazte-colegiado/precolegiados` | `POST /gsmadrid/v1/colegiacion` | OK |
| Newsletter | Layout (todas las paginas) | **SIN BACKEND** — solo frontend | PENDIENTE |
| Login | Header dropdown | `POST /gsmadrid/v1/auth/login` | OK |

---

## 8. CHECKLIST PARA SANTIAGO (WP Admin)

### Urgente
- [ ] Crear paginas legales: Aviso Legal, Politica de Privacidad, Politica de Cookies, Accesibilidad (pueden ser paginas de WordPress o contenido estatico en el frontend)
- [ ] Editar el post "Nuevo convenio UCM" — quitar "Lalalallalaa" y poner contenido real

### Alta
- [ ] Crear usuario en WP con nombre real del Colegio (no "admin") para la autoria de articulos
- [ ] Subir imagenes destacadas a los 6 posts existentes (800x450, 16:9)
- [ ] Subir imagenes destacadas a las formaciones (400x260, 3:2)
- [ ] Subir imagenes destacadas a los eventos (400x260, 3:2)
- [ ] Crear categorias en WP: Normativa, Colegio, Formacion, Eventos — y asignar a cada post
- [ ] Conseguir logos de Ayuntamiento de Madrid y Ayuntamiento de Colmenarejo para la pagina de Clinica Juridica

### Media
- [ ] Revisar contenido de todos los posts y asegurar que tienen texto real y completo
- [ ] Configurar plugin SMTP en WordPress para que los emails de formularios lleguen correctamente (WP Mail SMTP o similar)
- [ ] Verificar que las formaciones y eventos en WP tienen todos los campos ACF rellenados

---

## 9. CHECKLIST PARA DESARROLLO (proximas sesiones)

### Urgente
- [ ] Crear redirects para `/hazte-colegiado/ejercientes-libres` → `/hazte-colegiado/colegiados` (y las otras 2)
- [ ] Arreglar links `href="#"` en transparencia — apuntar a documentos reales o crear paginas

### Alta
- [ ] Crear 6 subpaginas de Servicios Colegiado (empleo, mentoring, ayudas, acuerdos, recursos, servicios-en-linea)
- [ ] Crear paginas legales (aviso legal, privacidad, cookies, accesibilidad)
- [ ] Convertir UpcomingEvents en tira de 3 con slide (peticion pendiente del cliente)

### Media
- [ ] Crear pagina Galeria de Eventos
- [ ] Crear pagina Revista El Graduado (hemeroteca)
- [ ] Implementar backend de Newsletter (Mailchimp o almacenamiento propio)
- [ ] Test end-to-end del flujo Area Privada (login → perfil → inscripcion)

### Baja
- [ ] GA4 + consent GDPR cookies
- [ ] 301 redirects desde URLs de Joomla
- [ ] Migracion de dominio a graduadosocialmadrid.org
- [ ] Pasarela de pago (Redsys/Stripe)
- [ ] Generacion de certificados PDF
- [ ] QR badge de verificacion de colegiado

---

*Audit generado el 22 de marzo de 2026*
