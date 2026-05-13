# Propuesta de Mantenimiento Web — Colegio de Graduados Sociales de Madrid

**Fecha:** Abril 2026
**Preparado por:** Up To Marketing
**Cliente:** Excmo. Colegio Oficial de Graduados Sociales de Madrid

---

## Stack tecnologico

| Componente | Tecnologia |
|---|---|
| Frontend | Next.js 15 (SSR/SSG) |
| CMS | WordPress headless (WPGraphQL) |
| Base de datos | MariaDB 11 |
| Hosting | VPS dedicado (OVH) + EasyPanel |
| SSL | Let's Encrypt (auto-renovacion) |
| CDN | Incluido via Cloudflare (opcional) |

---

## Opcion A — Mantenimiento SIN hosting

*El Colegio gestiona su propia infraestructura o ya dispone de servidor.*

### Que incluye

**Mantenimiento preventivo (mensual):**
- Actualizaciones de WordPress core, plugins y tema headless
- Actualizaciones de dependencias Next.js (npm audit, patches de seguridad)
- Revision de logs de error y rendimiento
- Backup verificado de base de datos y archivos (1x/semana)
- Monitorizacion de uptime y alertas (respuesta en < 4h laborables)
- Certificado SSL: verificacion de renovacion automatica

**Seguridad:**
- Revision mensual de vulnerabilidades (plugins, dependencias)
- Actualizaciones criticas de seguridad (aplicacion en < 24h)
- Hardening WordPress: cabeceras HTTP, XML-RPC desactivado, REST restringido

**Soporte:**
- Canal de comunicacion dedicado (email + chat)
- Tiempo de respuesta: < 4h laborables para incidencias criticas
- Informe mensual de estado (uptime, actualizaciones aplicadas, incidencias)

**Bolsa de horas para ajustes/desarrollo:**
- 3 horas/mes de desarrollo incluidas
- Ajustes de diseno, nuevas secciones, cambios de contenido, mejoras funcionales
- Horas no consumidas NO se acumulan
- Horas adicionales: 55 EUR/hora

| Concepto | Precio mensual |
|---|---|
| Mantenimiento preventivo + seguridad + soporte | 120 EUR |
| Bolsa de 3 horas de desarrollo | 150 EUR |
| **Total mensual** | **270 EUR/mes** |

---

## Opcion B — Mantenimiento CON hosting

*Up To Marketing gestiona la infraestructura completa.*

### Que incluye

**Todo lo de la Opcion A, mas:**

**Hosting gestionado:**
- VPS dedicado (4 vCPU, 8 GB RAM, 80 GB SSD NVMe)
- Panel de gestion EasyPanel (deploys, logs, metricas)
- Dominio: gestion DNS, renovacion, configuracion registros
- Backups automaticos diarios con retencion 30 dias
- Restauracion ante desastre en < 2h
- CDN + cache edge (Cloudflare) para rendimiento optimo
- Entorno de staging para pruebas pre-produccion

**SLA:**
- Uptime garantizado: 99.5%
- Incidencias criticas (web caida): respuesta < 1h, resolucion < 4h
- Incidencias no criticas: respuesta < 4h laborables

**Bolsa de horas para ajustes/desarrollo:**
- 5 horas/mes de desarrollo incluidas
- Ajustes de diseno, nuevas secciones, integraciones, mejoras funcionales
- Horas no consumidas se acumulan hasta 10h maximo (2 meses)
- Horas adicionales: 50 EUR/hora (precio reducido)

| Concepto | Precio mensual |
|---|---|
| Hosting gestionado (VPS + backups + CDN + staging) | 90 EUR |
| Mantenimiento preventivo + seguridad + soporte | 120 EUR |
| Bolsa de 5 horas de desarrollo | 240 EUR |
| **Total mensual** | **450 EUR/mes** |

---

## Comparativa

| | Sin hosting (A) | Con hosting (B) |
|---|---|---|
| Precio mensual | 270 EUR | 450 EUR |
| Horas de desarrollo incluidas | 3h | 5h |
| Acumulacion de horas | No | Si (max 10h) |
| Hora adicional | 55 EUR | 50 EUR |
| Hosting incluido | No | Si |
| Backups | Semanales | Diarios + retencion 30d |
| Staging | No | Si |
| SLA uptime | — | 99.5% |
| Respuesta critica | < 4h | < 1h |

---

## Que NO incluye (en ninguna opcion)

- Redaccion de contenidos / copywriting (presupuesto aparte)
- Campanas de Google Ads o SEO (servicio independiente)
- Desarrollo de funcionalidades nuevas mayores (> 10h) — se presupuestan como proyecto
- Fotografia o produccion de video
- Formacion a usuarios (se puede anadir como servicio puntual)

---

## Ejemplos de uso de la bolsa de horas

| Tarea | Horas estimadas |
|---|---|
| Cambiar textos/imagenes de una seccion | 0.5h |
| Anadir nueva pagina estatica | 1-2h |
| Crear nueva seccion con diseno custom | 2-3h |
| Integracion con servicio externo (newsletter, CRM) | 3-5h |
| Importacion masiva de colegiados | 1-2h |
| Ajustes de diseno responsive | 1h |
| Nueva funcionalidad (ej: gestion documental) | 5-10h (proyecto) |

---

## Condiciones

- **Facturacion:** Mensual, pago a 15 dias
- **Permanencia:** Sin permanencia. Cancelacion con 30 dias de preaviso
- **Inicio:** A partir de la puesta en produccion de la web
- **Revision de precios:** Anual

---

*Propuesta valida durante 60 dias desde la fecha de emision.*
