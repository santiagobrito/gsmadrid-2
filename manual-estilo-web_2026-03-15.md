# Manual de Estilo Web — Colegio Oficial de Graduados Sociales de Madrid

**Fecha:** 15 de marzo de 2026
**Version:** 3.0
**Proyecto:** Rediseno web gsmadrid
**Web nueva:** https://gsmadrid.uptomarketing.com/
**Web original:** https://graduadosocialmadrid.org/
**Stack:** WordPress + Elementor Pro
**Logo:** https://gsmadrid.uptomarketing.com/wp-content/uploads/2026/02/logo-gsm-png.png

---

## 1. Logo

### Composicion
El logo combina las iniciales **G** (azul) y **S** (gris) con una **balanza de justicia** (gris), seguido del texto "Colegio Oficial / Graduados Sociales / Madrid".

### Colores del logo
| Elemento | Hex | Uso |
|----------|-----|-----|
| Azul logo | `#1565C0` | Inicial "G", texto "Madrid" |
| Gris logo | `#78909C` | Inicial "S", balanza, textos "Colegio Oficial" y "Graduados Sociales" |

> El azul del logo (`#1565C0`) es armonico con el azul primario de la web (`#2563EB`). No necesitan ser identicos — el logo aporta solidez institucional, la web aporta vibracion digital.

### Versiones
- **Original:** azul/gris sobre fondo blanco o claro
- **Negativa:** blanco total (filter: brightness(0) invert(1)) sobre fondos navy/oscuros

### Reglas de uso
1. **Espacio libre:** margen minimo igual a la altura de la "G" alrededor del logo
2. **Tamano minimo:** 120px de ancho en digital, 30mm en impresion
3. **No deformar:** mantener siempre el aspect ratio original
4. **No recolorear:** solo las dos versiones permitidas (original y negativa)
5. **Fondo limpio:** nunca sobre fotos con mucho detalle ni gradientes complejos

### En Elementor
- Widget: **Image** o **Site Logo**
- Max-width: `180px` en header, `120px` en footer
- Logo negativo: usar CSS personalizado `filter: brightness(0) invert(1); opacity: 0.85;`

---

## 2. Paleta de Colores

### 2.1 Colores primarios

| Rol | Hex | Nombre | Uso |
|-----|-----|--------|-----|
| **Azul primario** | `#2563EB` | Electric Blue | CTAs, links, estados activos |
| **Teal acento** | `#2BD4C7` | Teal | Gradientes, badges, elementos tech |
| **Azul logo** | `#1565C0` | Logo Blue | Acento institucional, boton marca |
| **Navy profundo** | `#0E111B` | Deep Navy | Footer, textos heading |

> **Nota sobre el rojo:** El logo actual NO usa rojo. El rojo (`#E21E25`) pertenece a la web vieja en Joomla. No se incluye en la paleta nueva. Solo existe `#DC2626` como color funcional de error.

### 2.2 Colores neutros

| Rol | Hex | Uso |
|-----|-----|-----|
| Texto principal | `#0F172A` | Headings, body text |
| Texto secundario | `#475569` | Parrafos, descripciones |
| Texto terciario | `#6B7280` | Metadata, placeholders |
| Borde | `#E2E8F0` | Cards, separadores |
| Fondo alternativo | `#F7F8FA` | Secciones alternas |
| Fondo base | `#FFFFFF` | Fondo principal |

### 2.3 Gradientes

| Nombre | Valor | Uso |
|--------|-------|-----|
| **Boton primario** | `linear-gradient(90deg, #2F5BEA 0%, #18B7B0 100%)` | CTAs principales |
| **Boton primario hover** | `linear-gradient(180deg, #244FD1 0%, #12A7A0 100%)` | Hover |
| **Hero dark** | `linear-gradient(120deg, #0E111B 0%, #0C1F3F 100%)` | Hero oscuro (opcion A) |
| **Hero light** | `linear-gradient(135deg, #FFFFFF 0%, #F0F4F8 100%)` | Hero claro (opcion B) |
| **Fondo suave** | `linear-gradient(90deg, #F5F7FA 0%, #EEF3F8 100%)` | Secciones claras |

### 2.4 Colores funcionales

| Rol | Hex |
|-----|-----|
| Exito | `#16A34A` |
| Advertencia | `#D97706` |
| Error | `#DC2626` |
| Info | `#2563EB` |

### 2.5 En Elementor
Configurar en **Site Settings > Global Colors:**
- Primary: `#2563EB`
- Secondary: `#2BD4C7`
- Text: `#0F172A`
- Accent: `#1565C0`

---

## 3. Tipografia

### 3.1 Fuente: Plus Jakarta Sans

| Atributo | Detalle |
|----------|---------|
| **Nombre** | Plus Jakarta Sans |
| **Tipo** | Sans-serif geometrica |
| **Fallback** | `system-ui, -apple-system, sans-serif` |

### 3.2 Escala tipografica

| Nivel | Desktop | Mobile | Peso | Line-height |
|-------|---------|--------|------|-------------|
| **Display** | 84px | 36px | 800 | 1.05 |
| **H1** | 40px | 28px | 700 | 1.15 |
| **H2** | 28px | 22px | 700 | 1.25 |
| **H3** | 21px | 18px | 700 | 1.3 |
| **H4** | 20px | 16px | 600 | 1.35 |
| **Body** | 18px | 16px | 300 | 1.6 |
| **Body small** | 16px | 14px | 300 | 1.6 |
| **Label** | 14px | 12px | 600 | 1.4 |
| **Caption** | 12px | 12px | 600 | 1.4 |

### 3.3 Reglas
- **Un solo font-family** en toda la web: Plus Jakarta Sans
- Body en weight **300** (light) — firma del diseno
- Headings en **600-800**
- Nunca weight 400 en headings
- UPPERCASE solo en captions/badges de 12px con `letter-spacing: 0.16em`
- Maximo 70 caracteres por linea

### 3.4 En Elementor
Configurar en **Site Settings > Global Fonts:**
- Primary: Plus Jakarta Sans, 800
- Secondary: Plus Jakarta Sans, 700
- Body: Plus Jakarta Sans, 300
- Accent: Plus Jakarta Sans, 600

Configurar en **Site Settings > Theme Style > Typography:**
- Body font-family: Plus Jakarta Sans
- Body weight: 300
- Body size: 18px
- H1-H4: segun escala de arriba

---

## 4. Espaciado y Layout

### 4.1 Grid

| Propiedad | Valor | Elementor Setting |
|-----------|-------|-------------------|
| Ancho maximo | 1200px | Site Settings > Layout > Content Width |
| Content size | 800px | Container max-width para texto |
| Grid gap | 32px | Container > Gap |
| Padding lateral | 24px / 20px / 16px | Container > Padding |

### 4.2 Espaciado vertical

| Contexto | Valor |
|----------|-------|
| Entre secciones principales | 96px |
| Titulo → contenido | 48px |
| Entre cards/items | 32px |
| Padding interno de cards | 32px |
| Dentro de card | 20px |

---

## 5. Hero Section — Dos Variantes

### 5.1 Opcion A: Hero Dark (actual)

```
Fondo: linear-gradient(120deg, #0E111B 0%, #0C1F3F 100%)
Altura: 88vh (min-height)
Margen superior: -86px (overlap con header)
Padding top: 86px
Texto titulo: #FFFFFF, 84px, weight 800
Texto subtitulo: rgba(255,255,255,0.6), 18px, weight 300
CTA primario: gradiente azul-teal
CTA secundario: borde blanco 30% opacidad
Logo: version negativa (blanco)
Badge: fondo rgba(43,212,199,0.15), texto #2BD4C7
```

**Elementor:**
- Container: min-height 88vh, background gradient, margin-top -86px, padding-top 86px
- Heading: color #FFFFFF
- Text Editor: color rgba(255,255,255,0.6)
- Button 1: gradient custom
- Button 2: border white, bg transparent

### 5.2 Opcion B: Hero Light (nueva alternativa)

```
Fondo: linear-gradient(135deg, #FFFFFF 0%, #F0F4F8 100%)
Altura: 88vh (min-height)
Padding top: 120px, padding bottom: 96px
Texto titulo: #0F172A, 84px, weight 800
Texto subtitulo: #475569, 18px, weight 300
CTA primario: gradiente azul-teal (igual que dark)
CTA secundario: borde #2563EB, texto #2563EB
Logo: version original (azul/gris)
Badge: fondo rgba(37,99,235,0.08), texto #2563EB
Decoracion: gradiente radial teal al 5% opacidad, esquina superior derecha
Borde inferior: 1px solid #E2E8F0 o sombra sutil
```

**Elementor:**
- Container: min-height 88vh, background gradient blanco→gris, padding 120px top / 96px bottom
- Heading: color #0F172A (Global Color: Text)
- Text Editor: color #475569
- Button 1: mismo gradiente (funciona sobre light)
- Button 2: border #2563EB, color #2563EB
- Decoracion: Container overlay o shape divider sutil

### 5.3 Cambios en cascada segun la eleccion

| Elemento | Hero Dark | Hero Light |
|----------|-----------|------------|
| **Header fondo** | Transparente → blanco al scroll | Siempre blanco (o transparente, ambos funcionan ya que el hero es claro) |
| **Header texto** | Blanco → oscuro al scroll | Siempre oscuro |
| **Header logo** | Negativo (blanco) → original al scroll | Siempre original (azul/gris) |
| **Header transicion** | Necesaria (cambio dramatico) | Opcional (puede ser siempre solido) |
| **Board cards (sobre hero)** | Glass-morphism oscuro (bg blanco 4%, borde blanco 10%) | Cards standard claras (bg blanco, borde #E2E8F0, sombra) |
| **1ra seccion post-hero** | Puede ser blanca (contraste con hero dark) | Debe ser `#F7F8FA` (diferenciarse del hero blanco) |
| **Footer** | Navy (coherencia con hero dark) | Navy (sigue funcionando como ancla oscura) |
| **Logo en hero** | Blanco / negativo | Original azul/gris |
| **Impacto visual** | Alto contraste, dramatico, tech | Limpio, profesional, accesible, institucional |

### 5.4 Implementacion en Elementor — Hero Light

```
Widget: Container (Flexbox, direction column)
  Layout:
    - Content Width: Full Width
    - Min Height: 88vh
    - Justify Content: Center
    - Padding: 120px top, 96px bottom, 64px left/right
    - Padding mobile: 80px top, 48px bottom, 20px left/right

  Style > Background:
    - Type: Gradient
    - Color 1: #FFFFFF (position 0%)
    - Color 2: #F0F4F8 (position 100%)
    - Angle: 135deg

  Style > Border:
    - Border bottom: 1px solid #E2E8F0

  Advanced:
    - Z-index: 1

  Hijos:
    1. Container (inline, gap 12px, margin-bottom 24px)
       └── Image widget: logo, max-width 160px
       └── Heading widget: badge "Colegio Oficial"
           - HTML tag: span
           - Size: 12px, weight 600, ls 0.1em, uppercase
           - Color: #2563EB
           - Bg: rgba(37,99,235,0.08)
           - Padding: 5px 14px
           - Border-radius: 999px

    2. Heading widget: titulo principal
       - HTML tag: H1
       - Size: 84px (mobile: 36px)
       - Weight: 800
       - Color: #0F172A
       - Max-width: 650px
       - Letter-spacing: -0.02em

    3. Text Editor widget: subtitulo
       - Size: 18px (mobile: 16px)
       - Weight: 300
       - Color: #475569
       - Max-width: 520px

    4. Container (inline, gap 16px, margin-top 32px)
       └── Button widget: CTA primario
           - Type: gradient (custom CSS)
           - Padding: 14px 40px
           - Border-radius: 40px
           - Box-shadow: 0 10px 25px rgba(30,107,255,0.25)
       └── Button widget: CTA secundario
           - Type: outlined
           - Border: 1.5px solid #2563EB
           - Color: #2563EB
           - Padding: 14px 32px
           - Border-radius: 40px
           - Hover: bg #2563EB, color #fff
```

### 5.5 Implementacion en Elementor — Hero Dark

```
Widget: Container (Flexbox, direction column)
  Layout:
    - Content Width: Full Width
    - Min Height: 88vh
    - Margin top: -86px
    - Padding top: 86px, padding bottom: 80px
    - Padding left/right: 64px (mobile: 20px)

  Style > Background:
    - Type: Gradient
    - Color 1: #0E111B (position 0%)
    - Color 2: #0C1F3F (position 100%)
    - Angle: 120deg

  Hijos:
    1. Image: logo negativo (CSS: filter brightness(0) invert(1))
    2. Heading: titulo — color #FFFFFF, 84px/800
    3. Text Editor: subtitulo — color rgba(255,255,255,0.6), 18px/300
    4. Container buttons:
       └── Button primario: gradiente
       └── Button secundario: borde rgba(255,255,255,0.3), color #FFFFFF
```

### 5.6 Recomendacion

**Para un colegio profesional, el Hero Light es la mejor opcion.** Razones:
- Transmite profesionalismo y confianza sin agresividad visual
- El logo se muestra en su version original (mas reconocible)
- El header no necesita transicion compleja
- Mejor contraste de texto (negro sobre blanco > blanco sobre navy)
- Las autoridades del colegio se sentiran mas representadas
- El footer navy proporciona el ancla oscura necesaria para cerrar la pagina
- El gradiente azul-teal de los botones destaca MAS sobre fondo claro

---

## 6. Componentes

### 6.1 Botones

#### CTA Primario (gradiente)
```
Elementor Button widget > Style:
  Background: Custom CSS → linear-gradient(90deg, #2F5BEA 0%, #18B7B0 100%)
  Color: #FFFFFF
  Padding: 14px 40px
  Border-radius: 40px
  Box-shadow: 0px 10px 25px rgba(30,107,255,0.25)

  Hover:
    Background: linear-gradient(180deg, #244FD1 0%, #12A7A0 100%)
    Box-shadow: 0px 8px 20px rgba(0,0,0,0.15)
```

> Elementor no soporta gradientes nativos en botones. Usar CSS personalizado en Advanced > Custom CSS:
```css
selector .elementor-button {
  background: linear-gradient(90deg, #2F5BEA 0%, #18B7B0 100%) !important;
  border: none !important;
  box-shadow: 0px 10px 25px rgba(30,107,255,0.25);
  transition: all 0.3s ease;
}
selector .elementor-button:hover {
  background: linear-gradient(180deg, #244FD1 0%, #12A7A0 100%) !important;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}
```

#### CTA Secundario (outline)
```
Background: transparente
Color: #2563EB
Border: 1.5px solid #2563EB
Padding: 12px 28px
Border-radius: 40px
Hover: bg #2563EB, color #FFF
```

#### CTA Institucional (azul logo)
```
Background: #1565C0
Color: #FFFFFF
Padding: 12px 28px
Border-radius: 40px
Hover: #0D47A1
Max 1 por pagina — para "Hazte Colegiado", "Contactar"
```

#### Reglas
- Forma **pill** (40px) en todos los botones
- Un solo CTA primario (gradiente) por seccion visible
- Minimo 44px de altura (accesibilidad)
- Texto: verbo en infinitivo

### 6.2 Cards

#### Card standard
```
Elementor Container:
  Background: #FFFFFF
  Border: 1px solid #E2E8F0
  Border-radius: 16px
  Padding: 28px
  Box-shadow: 0 1px 2px rgba(14,17,27,0.04)

  CSS hover:
    transform: translateY(-6px)
    box-shadow: 0 12px 32px rgba(15,23,42,0.08)
    transition: all 0.4s ease
```

#### Card dark (solo si hero dark)
```
Background: rgba(255,255,255,0.04)
Border: 1px solid rgba(255,255,255,0.08)
Border-radius: 16px
Padding: 28px
Hover: border-color #2563EB
```

### 6.3 Badges
```
Color al 15% opacidad como fondo, 100% como texto.
Border-radius: 999px
Padding: 5px 14px
Font: 12px, weight 600, letter-spacing 0.08em, uppercase
```

| Tipo | Fondo | Texto |
|------|-------|-------|
| Institucional | `rgba(79,168,255,0.15)` | `#4FA8FF` |
| Formacion | `rgba(43,212,199,0.15)` | `#2BD4C7` |
| Eventos | `rgba(0,229,255,0.15)` | `#00B8CC` |
| Colegio | `rgba(21,101,192,0.12)` | `#1565C0` |
| Activo | `rgba(22,163,74,0.1)` | `#16A34A` |
| Pendiente | `rgba(217,119,6,0.1)` | `#D97706` |

### 6.4 Header

| Propiedad | Hero Light | Hero Dark |
|-----------|------------|-----------|
| Fondo inicial | `#FFFFFF` (solido) | Transparente |
| Fondo scroll | `#FFFFFF` | `#FFFFFF` |
| Logo | Original (azul/gris) | Negativo → original al scroll |
| Texto items | `#475569` | `#FFFFFF` → `#475569` al scroll |
| Transicion | No necesaria | Si, background 0.3s ease |

**Elementor:**
- Widget: Container (Flexbox, row, space-between)
- Position: Fixed/Sticky
- Height: 86px
- Z-index: 100
- Hijos: Image (logo), Nav Menu, Button (Area Privada)

> **Si eliges Hero Light**, el header es mucho mas simple: siempre solido blanco, sin transicion, sin cambio de logo. Menos CSS custom y menos problemas de mantenimiento.

### 6.5 Footer

```
Fondo: #0E111B (navy — ancla oscura independientemente del hero)
Padding: 64px top, 32px bottom
Color texto: rgba(255,255,255,0.45)
Links: rgba(255,255,255,0.45), hover: #2BD4C7 (teal)
Logo: version negativa (blanco)
```

**Elementor:**
- Container: 4 columnas (1.3fr 1fr 1fr 1fr en desktop, stack en mobile)
- Global Color para links: custom rgba
- Logo con CSS `filter: brightness(0) invert(1)`

---

## 7. Iconografia

| Propiedad | Valor |
|-----------|-------|
| Estilo | Outline/line, stroke 1.5px |
| Tamanos | 16px listas, 20px menu, 24px cards |
| Color | Hereda del padre |
| Libreria | Una sola (Lucide, Phosphor o iconos Elementor consistentes) |

**Elementor:** usar Icon widget o Icon Box con iconos de una sola libreria. Font Awesome outline o subir SVGs custom.

---

## 8. Imagenes

- Profesional, cercano, personas reales
- WebP con fallback JPEG, lazy loading
- No "abogados cruzados de brazos"
- Overlay hero dark: negro 40-60%
- Overlay hero light: no necesario

| Uso | Tamano | Ratio |
|-----|--------|-------|
| Hero | 1920x900 | ~2:1 |
| Card | 400x260 | 3:2 |
| Blog | 800x450 | 16:9 |
| Avatar | 200x200 | 1:1 |

---

## 9. Animaciones

| Elemento | Animacion | Duracion |
|----------|-----------|----------|
| Cards hover | translateY(-6px) + sombra | 400ms |
| Links lista hover | translateX(4px) | 400ms |
| Botones hover | Cambio gradiente + translateY(-2px) | 300ms |
| Header scroll | Transicion fondo (solo hero dark) | 300ms |

**Elementor:**
- Cards: Advanced > Motion Effects > CSS Transform (o Custom CSS con transition)
- Scroll animations: Elementor Motion Effects > Fade In
- `prefers-reduced-motion`: desactivar todo via CSS custom

---

## 10. Responsive

| Breakpoint | Valor | Elementor |
|------------|-------|-----------|
| Mobile | 0 - 767px | Responsive mode mobile |
| Tablet | 768 - 1024px | Responsive mode tablet |
| Desktop | 1025px+ | Default |

**Reglas clave:**
- Display 84px → 36px en mobile
- Grid 3 → 2 → 1 columnas
- Hero 88vh → auto en mobile
- Botones full-width en mobile
- Padding lateral 24 → 20 → 16px

---

## 11. Tokens CSS

```css
:root {
  /* Colores */
  --color-primary: #2563EB;
  --color-primary-dark: #244FD1;
  --color-teal: #2BD4C7;
  --color-teal-dark: #18B7B0;
  --color-logo-blue: #1565C0;
  --color-navy: #0E111B;
  --color-navy-light: #0C1F3F;

  /* Gradientes */
  --gradient-button: linear-gradient(90deg, #2F5BEA 0%, #18B7B0 100%);
  --gradient-button-hover: linear-gradient(180deg, #244FD1 0%, #12A7A0 100%);
  --gradient-hero-dark: linear-gradient(120deg, #0E111B 0%, #0C1F3F 100%);
  --gradient-hero-light: linear-gradient(135deg, #FFFFFF 0%, #F0F4F8 100%);

  /* Neutros */
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-tertiary: #6B7280;
  --color-border: #E2E8F0;
  --color-bg-alt: #F7F8FA;
  --color-bg: #FFFFFF;

  /* Funcionales */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #2563EB;

  /* Tipografia */
  --font-family: 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Espaciado */
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-4xl: 96px;

  /* Bordes */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-pill: 40px;

  /* Sombras */
  --shadow-xs: 0 1px 2px rgba(14,17,27,0.04);
  --shadow-md: 0 12px 32px rgba(15,23,42,0.08);
  --shadow-button: 0 10px 25px rgba(30,107,255,0.25);

  /* Layout */
  --max-width: 1200px;
  --header-height: 86px;
}
```

---

## 12. Do / Don't

| Hacer | No hacer |
|-------|----------|
| Plus Jakarta Sans como unica fuente | Open Sans, Roboto ni ninguna otra |
| Botones pill (40px radius) | Botones cuadrados (<20px radius) |
| Azul logo (#1565C0) como acento institucional | Rojo #E21E25 ni verde #2C561E de la web vieja |
| Navy solo en footer (y hero si se elige dark) | Fondos navy en secciones de contenido |
| Weight 300 para body | Weight 400 en headings ni 600+ en body |
| Un solo estilo de icono (outline) | Mezclar outline con filled |
| Gradiente azul-teal en CTA principal | Botones solidos genericos sin personalidad |

---

## 13. Checklist Elementor

### Fase 1: Global Settings
- [ ] Site Settings > Global Colors (primary, secondary, text, accent)
- [ ] Site Settings > Global Fonts (primary, secondary, body, accent)
- [ ] Site Settings > Theme Style > Typography (body 18px/300, H1-H4 segun escala)
- [ ] Site Settings > Layout > Content Width: 1200px
- [ ] Instalar Plus Jakarta Sans (Google Fonts o self-hosted)

### Fase 2: Templates
- [ ] Header template (sticky, logo + nav + CTA)
- [ ] Footer template (navy, 4 columnas)
- [ ] Hero section (elegir Light o Dark)
- [ ] Card components reutilizables

### Fase 3: CSS Custom
- [ ] Gradiente en botones (Elementor no lo soporta nativo)
- [ ] Hover translateY en cards
- [ ] Logo negativo con filter (solo si hero dark)
- [ ] Badge styles
- [ ] Custom CSS tokens en Elementor > Custom Code o Additional CSS

### Fase 4: QA
- [ ] Contrastes WCAG AA
- [ ] Test responsive: 1920, 1440, 1024, 768, 375px
- [ ] Performance: <3s LCP
- [ ] focus-visible en interactivos

---

*Manual de Estilo Web v3.0 — GS Madrid — 15 marzo 2026*
