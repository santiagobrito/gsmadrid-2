# Propuesta de Mantenimiento + Hosting Web

**Cliente:** Excmo. Colegio Oficial de Graduados Sociales de Madrid (CGSM)
**Preparado por:** Up To Marketing — Santiago Brito
**Fecha:** 4 de junio de 2026
**Validez:** Respuesta requerida antes del **lunes 9 de junio de 2026**

---

## Contexto

Tras la reunión del 3 de junio con Mónica Esteban y Carlos Ruiz, queda confirmado el cutover del dominio `graduadosocialmadrid.org` a la nueva plataforma para el **miércoles 10 de junio de 2026**, alineado con el calendario legal de la Junta General.

A partir de esa fecha, la nueva web pasa a ser la herramienta institucional pública del Colegio y soporta:

- Sitio público (presentación, transparencia, servicios, eventos, formación, blog).
- **Directorio profesional** de los 1.124 colegiados activos con buscador por especialidad y localidad.
- **Área privada** para colegiados (acceso a documentación, gestión de perfil propio, inscripciones a formación/eventos).
- **Pagos online vía Stripe** (formación, eventos, gestión de cuota colegial cuando proceda).
- Backoffice editorial para el equipo del Colegio (noticias, formaciones, eventos, transparencia).

Esta propuesta cubre la operación técnica continua de toda esa plataforma una vez en producción.

---

## Stack y arquitectura

| Componente | Tecnología |
|---|---|
| Frontend | Next.js 15 (SSR/SSG, Tailwind v4) |
| CMS | WordPress (backend de contenido) + Next.js (frontend público), conectados vía GraphQL |
| Pagos | Stripe (Payment Intents, webhooks) |
| Base de datos | MariaDB 11 |
| Hosting | VPS dedicado + EasyPanel (gestión Up To Marketing) |
| SSL | Let's Encrypt, auto-renovación |
| Monitorización | Uptime + logs centralizados |

---

## Servicio: Mantenimiento + Hosting gestionado

**Cuota mensual:** **450 € + IVA / mes**

### 1. Hosting gestionado

- VPS dedicado (4 vCPU, 8 GB RAM, 80 GB SSD NVMe) configurado y operado por Up To Marketing.
- Panel de gestión EasyPanel.
- Gestión de DNS y certificados SSL.
- Backups automáticos diarios con **retención de 30 días**.
- Restauración ante desastre en < 2h.
- Entorno de staging para pruebas pre-producción.

> El Colegio no necesita contratar hosting aparte. El coste de infraestructura está incluido en la cuota mensual.

### 2. Mantenimiento preventivo

- Actualizaciones de WordPress core, plugins y tema headless.
- Actualizaciones de dependencias Next.js (`npm audit`, patches de seguridad).
- Actualizaciones del SDK de Stripe y verificación de webhooks.
- Revisión mensual de logs de error, rendimiento y uso.
- Verificación de integridad de backups (1x/semana).
- Monitorización 24/7 de uptime con alertas.

### 3. Seguridad

- Revisión mensual de vulnerabilidades (CVEs en plugins WP, dependencias Next.js, MariaDB).
- Aplicación de parches críticos de seguridad en < 24 h desde su publicación.
- Hardening WordPress (cabeceras HTTP, XML-RPC desactivado, REST restringido, 2FA en cuentas admin).
- Auditoría anual de seguridad sobre el flujo de pagos Stripe y el área privada.

### 4. Operación de la plataforma de pagos

- Monitorización de los webhooks Stripe (alertas si dejan de llegar).
- Revisión mensual de transacciones fallidas y disputes.
- Mantenimiento del flujo de inscripciones formación/eventos.
- **No incluye** atención al cliente final ante disputes (lo gestiona el Colegio desde su panel Stripe).

### 5. Operación del área privada y directorio

- Mantenimiento de las cuentas de colegiados (resets de contraseña no autoresolubles, casos borde).
- Importaciones masivas anuales (renovación censo). Una importación/año incluida.
- Mantenimiento del buscador del directorio público.

### 6. Soporte

- Canal dedicado (email + chat).
- **Incidencia crítica** (web caída, pagos rotos, login caído): respuesta < 1 h, resolución < 4 h.
- **Incidencia no crítica**: respuesta < 4 h laborables.
- **SLA uptime:** 99.5 %.
- Informe mensual de estado: uptime real, actualizaciones aplicadas, incidencias resueltas, transacciones procesadas, consumo de la bolsa de horas.

### 7. Bolsa de horas de desarrollo / ajustes

- **4 horas/mes** incluidas para ajustes, mejoras menores y nuevas secciones de contenido.
- Las horas no consumidas se acumulan hasta un máximo de **8 horas** (2 meses).
- Horas adicionales facturables a **50 € + IVA / hora**.

**Ejemplos de uso de la bolsa de horas:**

| Tarea | Horas estimadas |
|---|---|
| Cambiar textos / imágenes de una sección | 0,5 h |
| Añadir nueva página estática | 1–2 h |
| Crear nueva sección con diseño custom | 2–3 h |
| Añadir nueva categoría al directorio o convenios | 1 h |
| Ajustes de diseño responsive puntuales | 1 h |
| Integración con servicio externo menor (newsletter, CRM) | 3–5 h |

---

## Qué NO incluye esta cuota

Para evitar malentendidos, lo siguiente se cotiza y factura aparte:

- **Desarrollo de funcionalidades nuevas mayores** (más de 5 h de trabajo) — se presupuesta como proyecto.
  Ejemplos: nuevo módulo de gestión documental, integración con CRM externo, nuevo flujo de pagos, rediseño de sección.
- **Redacción de contenido / copywriting** — la bolsa de horas cubre maquetación, no creación de texto original.
- **Campañas de Google Ads, SEO técnico avanzado o estrategia de contenidos** — servicios independientes.
- **Fotografía, vídeo o producción gráfica.**
- **Formación a colegiados / personal del Colegio** sobre el uso del backoffice (se acordó que el Colegio lo gestiona internamente).
- **Migración a otra infraestructura** si el Colegio decide cambiar de proveedor en el futuro.

---

## Condiciones

- **Inicio:** a partir de la puesta en producción de la web (10 de junio de 2026).
- **Facturación:** mensual, pago a 15 días.
- **Permanencia:** ninguna. Cancelación con 30 días de preaviso.
- **Revisión de precios:** anual, comunicada con 60 días de antelación.
- **Forma jurídica:** servicio prestado por Santiago Brito Echeverría (Up To Marketing).

---

## Por qué hospedar aquí

La plataforma es un desarrollo a medida que combina Next.js, WordPress headless, Stripe e integración con el censo colegial. Una agencia de mantenimiento WordPress estándar no opera este stack: requiere perfil técnico de desarrollo full-stack además de operación de servidor.

Hospedar y mantener desde Up To Marketing garantiza:

- Que quien construyó la plataforma es quien la opera (cero curva de aprendizaje en incidencias).
- Continuidad sobre el código existente sin migraciones técnicas.
- Tiempos de respuesta reales en incidencias críticas (login, pagos).

Si el Colegio prefiere otro proveedor en el futuro, el código es propiedad del Colegio y se entrega documentado. El cambio se puede hacer en cualquier momento con 30 días de preaviso.

---

## Próximos pasos

1. Confirmación por email antes del **lunes 9 de junio**.
2. Firma del documento de servicio.
3. Inicio del servicio el día del cutover (miércoles 10 de junio).
4. Primer informe mensual a fecha 10 de julio.

---

**Contacto:**
Santiago Brito — Up To Marketing
santiagobrito@gmail.com
