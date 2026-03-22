# Audit UX/UI Expert — GS Madrid 2
**Fecha:** 22 de marzo de 2026
**Score actual:** 6.5/10
**Score estimado tras mejoras:** 8-8.5/10

---

## Diagnostico general

"Funcionalmente completo pero visualmente timido." Evita errores pero no manda. La web esta bien construida tecnicamente pero le falta decisividad visual, social proof y optimizacion de conversion.

---

## TOP 5 cambios de mayor impacto

| # | Problema | Impacto | Esfuerzo |
|---|---------|---------|----------|
| 1 | **Calendario inutil** — grid interactivo sin affordance, no invita a clickear, se siente inacabado | Muy alto | Medio |
| 2 | **CTAs sin jerarquia** — mezcla de estilos, los gradient no destacan, hover solo baja opacidad | Alto | Bajo |
| 3 | **Dark section brusca** — transicion blanco→navy abrupta, rompe ritmo visual | Alto | Bajo |
| 4 | **Imagenes placeholder** — gradientes con icono en TODAS las cards, fatiga visual | Alto | Depende del cliente |
| 5 | **Hazte Colegiado demasiado largo** — 8 secciones, Alianzas y Comprometidos son relleno | Medio-alto | Bajo |

---

## Analisis por pagina

### Homepage (6.5/10)

**Bien:**
- Counters de social proof (3000+, 50+, 100+)
- Segmentacion en 3 cards (Colegiado/Ciudadano/Colegiarme)
- Newsletter integrado, no pegado
- CTA dark de Hazte Colegiado potente

**Mal:**
- Calendario se siente como widget pegado, no integrado al diseno
- 6 upcoming events es demasiado — deberia ser tira de 3 con slide
- Quick access cards identicas visualmente, sin jerarquia
- Slider del hero usa SVG placeholders
- Transicion a dark section es abrupta

**Propuestas:**
- Convertir UpcomingEvents en carrusel de 3
- Redisenar calendario como lista + mini cal, o quitarlo del home
- Anadir transicion suave antes del dark section

### Hazte Colegiado landing (7.2/10)

**Bien:**
- Segmentacion en 4 vias de colegiacion
- Proceso en 3 pasos claro y no intimidante
- FAQs relevantes para profesionales
- Documentacion bien organizada en 2 columnas

**Mal:**
- 8 secciones — demasiado largo, el usuario se pierde
- Sin precios — bloqueador serio de conversion
- Sin testimonios ni social proof
- CTAs apuntan a destinos distintos (#proceso vs /contacto)
- Copy transaccional, no emocional
- Seccion "Alianzas" y "Comprometidos" son relleno

**Propuestas:**
- Cortar Alianzas (mover a pagina propia o quitar)
- Reducir "Comprometidos" de 6 a 4 items max
- Unificar todos los CTAs a un mismo destino
- Anadir testimonial de un colegiado antes del CTA final
- Mostrar precios cuando el cliente los confirme

### Colegiados - 3 modalidades (7.5/10)

**Bien:**
- Tabla comparativa excelente con checks/crosses
- Cards diferenciadas por color e icono
- Badge "Obligatorio para ejercer" da jerarquia
- Formulario con selector de modalidad

**Mal:**
- Sin precios (el usuario no sabe cuanto cuesta)
- Formulario al final de pagina muy larga
- Documentacion repite info de la pagina padre

**Propuestas:**
- Anadir precios cuando esten disponibles
- Considerar mover formulario mas arriba

### Precolegiados (7.5/10)

**Bien:**
- Badge "Gratuito" prominente
- Hero split con card visual de beneficios
- Proceso en 3 pasos simple
- Formulario con campos universidad/titulacion

**Mal:**
- Sin foto real de estudiantes (placeholder)
- Podria tener mas social proof (cuantos precolegiados hay)

### Formacion y Eventos (7/10)

**Bien:**
- Filtros claros (Todos/Presencial/Online/Gratuito)
- Separacion activo/pasado con badges
- CTA "Ver detalle e inscripcion" obvio

**Mal:**
- Sin imagenes reales — fatiga de placeholder
- No hay indicador de plazas (barra de progreso "20/30")
- No hay diferenciacion visual entre gratuito y de pago en las cards

### Servicios Ciudadano (8/10)

**Bien:**
- Heroes split bien ejecutados
- Stats claros (100%, 48h, 2015)
- Procesos paso a paso bien disenados
- Logos de partners reales

**Mal:**
- Logos mixtos (algunos grayscale, otros no)
- Podrian tener mas detalle sobre casos reales atendidos

### Blog / Actualidad (7/10)

**Bien:**
- Author box al final (E-E-A-T)
- Related posts
- Sidebar con meta info

**Mal:**
- Autor "admin" — necesita nombre real
- Contenido de test ("Lalalallalaa")
- Sin imagenes destacadas

---

## Decisiones pendientes del cliente

1. **Precios de colegiacion** — ¿los mostramos? Es el bloqueador #1 de conversion
2. **Calendario** — ¿redisenar como lista + mini cal, o quitar del home?
3. **Testimonios** — ¿hay frases de colegiados para social proof?
4. **Fotos reales** — la web necesita fotos de la sede, actos, formaciones

---

## Quick wins implementados (2026-03-22)

- [ ] UpcomingEvents → tira de 3 con slide
- [ ] Cortar secciones de Hazte Colegiado (Alianzas → quitar, Comprometidos → 4 items)
- [ ] Unificar CTAs de Hazte Colegiado (todos a /hazte-colegiado/colegiados o /contacto)

---

*Audit UX/UI generado el 22 de marzo de 2026*
