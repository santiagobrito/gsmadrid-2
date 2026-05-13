# CGSM Theme — Manual de Estilos

## Colores

| Token               | Valor     | Uso                          |
|----------------------|-----------|------------------------------|
| `--c-primary`        | `#2563EB` | Botones, links, iconos       |
| `--c-primary-dark`   | `#1D4ED8` | Hover primario               |
| `--c-gradient-a`     | `#2F5BEA` | Inicio gradiente             |
| `--c-gradient-b`     | `#18B7B0` | Fin gradiente (teal)         |
| `--c-text`           | `#0F172A` | Titulares, headings          |
| `--c-body`           | `#475569` | Texto body                   |
| `--c-muted`          | `#64748B` | Texto secundario, hints      |
| `--c-border`         | `#E2E8F0` | Bordes, separadores          |
| `--c-light`          | `#F7F8FA` | Fondos de seccion            |
| `--c-blue-tint`      | `#EFF6FF` | Badge, icon bg, tint azul    |
| `--c-dark`           | `#0F172A` | Footer, CTA oscuro           |
| `--c-white`          | `#FFFFFF` | Fondo base, cards            |
| Error                | `#EF4444` | Validacion, errores          |
| Success              | `#22C55E` | Validacion correcta          |

## Tipografia

- **Familia:** Plus Jakarta Sans (Google Fonts)
- **Fallback:** system-ui, sans-serif
- **Pesos:** 300 (light/body), 400 (normal), 500 (medium), 600 (semi/botones), 700 (bold/card titles), 800 (extra-bold/headings)

| Elemento           | Tamano   | Peso | Line-height |
|--------------------|----------|------|-------------|
| H1 (hero)          | 3.5rem   | 800  | 1.08        |
| H2 (seccion)       | 2.25rem  | 800  | 1.15        |
| H3 (card title)    | 1.25rem  | 700  | 1.3         |
| Body               | 1rem     | 400  | 1.6         |
| Sub (seccion)      | 1.125rem | 400  | 1.6         |
| Small / hint       | .8125rem | 400  | —           |
| Badge              | .75rem   | 700  | —           |
| Boton              | .9375rem | 600  | —           |

## Espaciado

- **Secciones:** `padding: 96px 0` (desktop), `64px 0` (mobile)
- **Container max-width:** `1140px`, padding lateral `24px`
- **Gap cards:** `24px`
- **Gap form-row:** `16px`

## Radios

| Token           | Valor  | Uso                 |
|-----------------|--------|---------------------|
| `--radius`      | `16px` | Cards, imagenes     |
| `--radius-sm`   | `12px` | Inputs, icon-sm     |
| Pill            | `40px` | Botones, badge      |

## Sombras

| Token          | Valor                               | Uso              |
|----------------|-------------------------------------|------------------|
| `--shadow`     | `0 4px 24px rgba(15,23,42,.06)`     | Cards, form-card |
| `--shadow-lg`  | `0 8px 40px rgba(15,23,42,.10)`     | Card hover, img  |
| Boton primary  | `0 4px 20px rgba(37,99,235,.35)`    | CTA              |

---

## Componentes

### Badge

```html
<span class="badge">Texto</span>
```

### Botones

```html
<!-- Primario (gradiente) -->
<a href="#" class="btn btn--primary">Accion principal</a>

<!-- Outline -->
<a href="#" class="btn btn--outline">Accion secundaria</a>

<!-- Blanco (sobre fondo oscuro) -->
<a href="#" class="btn btn--white">Sobre oscuro</a>

<!-- Outline blanco (sobre fondo oscuro) -->
<a href="#" class="btn btn--outline-white">Outline oscuro</a>
```

### Cards

```html
<!-- Card basica (como link) -->
<a href="#" class="card">
  <div class="card__icon">
    <svg>...</svg>
  </div>
  <h3 class="card__title">Titulo</h3>
  <p class="card__desc">Descripcion de la card.</p>
  <span class="card__link">Ver mas &rarr;</span>
</a>

<!-- Card con icono lateral -->
<div class="card card--icon-left">
  <div class="card__icon card__icon--sm">
    <svg>...</svg>
  </div>
  <div>
    <h3 class="card__title">Titulo</h3>
    <p class="card__desc">Descripcion.</p>
  </div>
</div>

<!-- Grid de 3 cards -->
<div class="cards cards--3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

### Cifras

```html
<section class="cifras">
  <div class="container">
    <div class="cifras__grid">
      <div class="cifra">
        <span class="cifra__num">+2.500</span>
        <span class="cifra__label">Colegiados</span>
      </div>
    </div>
  </div>
</section>
```

---

## Formularios

### Input basico

```html
<div class="form-group">
  <label class="form-label">Nombre completo</label>
  <input type="text" class="form-input" placeholder="Escribe tu nombre">
</div>
```

### Textarea

```html
<div class="form-group">
  <label class="form-label">Mensaje</label>
  <textarea class="form-textarea" placeholder="Escribe tu mensaje..."></textarea>
</div>
```

### Select

```html
<div class="form-group">
  <label class="form-label">Asunto</label>
  <select class="form-select">
    <option value="">Selecciona una opcion</option>
    <option>Colegiacion</option>
    <option>Formacion</option>
    <option>Asistencia juridica</option>
  </select>
</div>
```

### Input con icono

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <div class="input-group">
    <svg class="input-group__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
    <input type="email" class="form-input" placeholder="tu@email.com">
  </div>
</div>
```

### Fila de 2 columnas

```html
<div class="form-row">
  <div class="form-group">
    <label class="form-label">Nombre</label>
    <input type="text" class="form-input" placeholder="Nombre">
  </div>
  <div class="form-group">
    <label class="form-label">Apellidos</label>
    <input type="text" class="form-input" placeholder="Apellidos">
  </div>
</div>
```

### Checkbox y Radio

```html
<!-- Checkbox -->
<label class="form-check">
  <input type="checkbox">
  <span class="form-check__label">Acepto la politica de privacidad</span>
</label>

<!-- Radio -->
<label class="form-check">
  <input type="radio" name="tipo" value="colegiado">
  <span class="form-check__label">Soy colegiado</span>
</label>
```

### Toggle / Switch

```html
<label class="form-switch">
  <input type="checkbox">
  <span class="form-switch__track"></span>
  <span class="form-switch__label">Recibir newsletter</span>
</label>
```

### File upload

```html
<div class="form-group">
  <label class="form-label">Documentacion</label>
  <div class="form-file">
    <input type="file">
    <span class="form-file__text"><strong>Haz clic</strong> o arrastra un archivo</span>
  </div>
</div>
```

### Estados de validacion

```html
<!-- Error -->
<input type="text" class="form-input is-error">
<p class="form-error">Este campo es obligatorio</p>

<!-- Success -->
<input type="text" class="form-input is-success">

<!-- Hint -->
<input type="text" class="form-input">
<p class="form-hint">Minimo 8 caracteres</p>

<!-- Disabled -->
<input type="text" class="form-input" disabled>
```

### Form Card (formulario con wrapper)

```html
<div class="form-card">
  <h3 class="form-card__title">Contacta con nosotros</h3>
  <p class="form-card__sub">Responderemos en menos de 24 horas.</p>
  <form>
    <div class="form-row">
      <div class="form-group">...</div>
      <div class="form-group">...</div>
    </div>
    <div class="form-group">...</div>
    <button type="submit" class="btn btn--primary">Enviar mensaje</button>
  </form>
</div>
```

### Contact Form 7

Los estilos se aplican automaticamente a `.wpcf7` forms. Solo hay que usar CF7 normalmente y los inputs, textareas, selects y el boton submit heredan el design system.

---

## Layouts de seccion

```html
<!-- Seccion blanca -->
<section>
  <div class="container">
    <h2 class="section__title">Titulo</h2>
    <p class="section__sub">Subtitulo</p>
    <!-- contenido -->
  </div>
</section>

<!-- Seccion gris -->
<section class="section--gray">
  <div class="container">...</div>
</section>

<!-- Seccion gradiente (cifras) -->
<section class="cifras">
  <div class="container">...</div>
</section>

<!-- Seccion oscura (CTA) -->
<section class="cta-final">
  <div class="container cta-final__inner">...</div>
</section>
```

---

## Responsive breakpoints

| Breakpoint   | Comportamiento                       |
|--------------|--------------------------------------|
| > 1024px     | 3 columnas cards, 4 columnas cifras  |
| 768–1024px   | 2 columnas cards/cifras              |
| 480–768px    | 1 columna cards, 2 cifras, stack     |
| < 480px      | 1 columna todo, CTAs verticales      |
| `form-row`   | 2 cols > 768px, 1 col mobile         |
