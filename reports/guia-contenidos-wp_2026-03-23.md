# Guia de gestion de contenidos — Posts, Formaciones y Eventos

**Proyecto:** Web del Colegio Oficial de Graduados Sociales de Madrid
**Fecha:** 23 de marzo de 2026
**Version:** 1.0

---

## Acceso

- **URL:** https://gsmadrid-2-wordpress.a7lflv.easypanel.host/wp-admin
- **Menu lateral:** Posts, Formaciones, Eventos (segun el tipo de contenido)

---

## 1. POSTS (Blog / Actualidad)

Los posts son articulos del blog que aparecen en `/actualidad`.

### Donde se gestionan

**WP Admin > Entradas** (Posts)

### Campos a rellenar

| Campo | Obligatorio | Donde esta | Notas |
|-------|:-----------:|-----------|-------|
| **Titulo** | Si | Editor principal | Titulo del articulo |
| **Contenido** | Si | Editor principal | Cuerpo del articulo (editor visual o HTML) |
| **Extracto** | Recomendado | Panel lateral | Resumen corto que sale en el listado (2-3 lineas) |
| **Imagen destacada** | Recomendado | Panel lateral | Imagen que sale en la tarjeta del listado (16:9 recomendado) |
| **Categoria** | Recomendado | Panel lateral | Normativa, Colegio, Formacion, Eventos |
| **Slug** | Auto | Panel lateral > URL | Se genera del titulo, se puede editar |

### Categorias disponibles

Crear estas categorias en **WP Admin > Entradas > Categorias** si no existen:

| Categoria | Color en la web | Para que |
|-----------|----------------|---------|
| **Normativa** | Azul institucional | Cambios legislativos, nueva normativa laboral |
| **Colegio** | Azul primario | Noticias del Colegio, convenios, acuerdos |
| **Formacion** | Teal | Anuncios de cursos, jornadas, seminarios |
| **Eventos** | Naranja | Resenas de eventos, actos institucionales |

### Crear un post nuevo

1. Ir a **WP Admin > Entradas > Anadir nueva**
2. Escribir el **titulo**
3. Redactar el **contenido** en el editor
4. Panel lateral derecho:
   - Seleccionar **Categoria**
   - Escribir un **Extracto** (resumen corto)
   - Subir la **Imagen destacada** (tamano recomendado: 800x450 px, formato JPG o WebP)
5. Clic en **Publicar**

> El post aparecera en `/actualidad` en un maximo de 60 segundos.

### Editar o despublicar un post

- **Editar:** WP Admin > Entradas > clic en el titulo > modificar > Actualizar
- **Despublicar:** Cambiar Estado a "Borrador" > Actualizar
- **Eliminar:** Mover a Papelera

### Buenas practicas

- Usar **extractos** siempre — si no se pone, la web corta el contenido automaticamente y queda feo
- **Imagenes destacadas** en formato horizontal (16:9), minimo 800px de ancho
- No copiar texto de Word directamente — pegar como texto plano (Ctrl+Shift+V) para evitar HTML basura
- Usar parrafos cortos y subtitulos (H2, H3) para facilitar la lectura

---

## 2. FORMACIONES (Jornadas, Seminarios, Talleres, Cursos)

Las formaciones aparecen en `/formacion-eventos` y en la seccion de "Proximas actividades" de la home.

### Donde se gestionan

**WP Admin > Formaciones**

### Campos a rellenar

#### Datos basicos

| Campo | Obligatorio | Tipo | Ejemplo |
|-------|:-----------:|------|---------|
| **Titulo** | Si | Texto | "Jornada de Actualizacion Laboral 2026" |
| **Contenido** | Recomendado | Editor | Descripcion general de la formacion |
| **Imagen destacada** | Recomendado | Imagen | Imagen para la tarjeta (16:9) |
| **Fecha de inicio** | Si | Fecha | 15/04/2026 |
| **Fecha de fin** | No | Fecha | 16/04/2026 (dejar vacio si es un solo dia) |
| **Horario** | Recomendado | Texto | "09:00 - 14:00" |
| **Horas lectivas** | Recomendado | Numero | 20 |
| **Lugar** | Recomendado | Texto | "Salon de Actos, C/ Jose Abascal 44" |
| **Plazas** | No | Numero | 50 |

#### Ponentes (repetidor — se pueden anadir varios)

| Subcampo | Ejemplo |
|----------|---------|
| **Nombre** | "Maria Garcia Lopez" |
| **Cargo** | "Inspectora de Trabajo" |
| **Bio** | "25 anos de experiencia en..." |

> Clic en **"Anadir ponente"** para anadir mas filas.

#### Precios y acceso

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| **Tipo de acceso** | Selector | Gratuito / Pago / Mixto |
| **Es gratuito** | Si/No | Si |
| **Precios** (repetidor) | Tabla | Concepto: "Colegiados" / Importe: 50.00 / Nota: "IVA incluido" |
| **Nota de precio** | Texto | "Descuento del 20% para precolegiados" |

> Si la formacion es gratuita, activar "Es gratuito" y no rellenar precios.

#### Inscripcion y estado

| Campo | Tipo | Opciones |
|-------|------|----------|
| **URL de inscripcion** | URL | Enlace a formulario externo (o dejar vacio para usar el de la web) |
| **Estado** | Selector | Abierta / Completa / Cancelada / Finalizada |

#### Programa

| Campo | Tipo | Notas |
|-------|------|-------|
| **Programa** | Editor visual | Programa completo (usar listas y subtitulos) |
| **Documento del programa** | Archivo PDF | PDF descargable con el programa |
| **Homologacion** | Texto | Ej: "Homologado por REGCON con 20 creditos" |

#### Diploma (pestaña aparte en WP Admin)

| Campo | Cuando aparece | Ejemplo |
|-------|---------------|---------|
| **Diploma habilitado** | Siempre | Si/No |
| **Titulo del diploma** | Si diploma habilitado | "Diploma en Actualizacion Laboral" |
| **Horas del diploma** | Si diploma habilitado | 20 |
| **Texto legal** | Si diploma habilitado | "Expedido por el COGSMADRID..." |
| **Firmante** | Si diploma habilitado | "Carmen Rodriguez" |
| **Cargo del firmante** | Si diploma habilitado | "Presidenta" |
| **Imagen de firma** | Si diploma habilitado | PNG/JPG de la firma |
| **Sello** | Si diploma habilitado | PNG del escudo del Colegio |
| **Plantilla** | Si diploma habilitado | Standard / Curso largo / Jornada |

### Taxonomias (clasificacion)

En el panel lateral, asignar:

| Taxonomia | Opciones | Para que |
|-----------|----------|---------|
| **Modalidad** | Presencial, Online, Hibrido | Filtros en la web |
| **Area formativa** | Laboral, Fiscal, Seguridad Social, etc. | Filtros en la web |

### Crear una formacion nueva

1. **WP Admin > Formaciones > Anadir nueva**
2. Escribir el **titulo**
3. Rellenar los campos ACF (aparecen debajo del editor):
   - Fechas, horario, lugar
   - Ponentes (clic en "Anadir ponente" por cada uno)
   - Precios si aplica
   - Estado: "Abierta"
4. Escribir el **programa** en la pestaña correspondiente
5. Panel lateral:
   - Asignar **Modalidad** y **Area formativa**
   - Subir **Imagen destacada**
6. **Publicar**

> La formacion aparecera en la web en un maximo de 60 segundos.

### Ciclo de vida de una formacion

```
1. Se crea con estado "Abierta" → aparece en listings y en "Proximas actividades"
2. Se llenan las plazas → cambiar a "Completa"
3. Se celebra → no hace falta cambiar nada durante
4. Termina → cambiar a "Finalizada" (desaparece de "Proximas actividades")
5. Si se cancela → cambiar a "Cancelada"
```

### Buenas practicas

- Crear la formacion **con antelacion** (minimo 2 semanas antes)
- Siempre rellenar **fecha, horario y lugar** — es lo primero que mira el usuario
- Incluir al menos un **ponente** con nombre y cargo
- Subir **imagen destacada** — las formaciones sin imagen se ven con un placeholder generico
- Cuando termine, cambiar el estado a **"Finalizada"** para que no aparezca como proxima actividad

---

## 3. EVENTOS (Actos institucionales, Asambleas, Networking)

Los eventos aparecen en `/eventos` y en la seccion de "Proximas actividades" de la home.

### Donde se gestionan

**WP Admin > Eventos**

### Campos a rellenar

| Campo | Obligatorio | Tipo | Ejemplo |
|-------|:-----------:|------|---------|
| **Titulo** | Si | Texto | "Asamblea General Ordinaria 2026" |
| **Contenido** | Recomendado | Editor | Descripcion del evento |
| **Imagen destacada** | Recomendado | Imagen | Imagen para la tarjeta (16:9) |
| **Fecha de inicio** | Si | Fecha | 15/04/2026 |
| **Fecha de fin** | No | Fecha | Solo si dura mas de un dia |
| **Horario** | Recomendado | Texto | "18:00 - 20:00" |
| **Lugar** | Recomendado | Texto | "Salon de Actos, C/ Jose Abascal 44" |
| **Tipo de evento** | Si | Selector | Institucional / Asamblea / Networking / Conferencia / Acto Social / Otro |
| **Estado** | Si | Selector | Programado / Inscripcion abierta / Completo / Cancelado / Finalizado |
| **Plazas** | No | Numero | 100 |
| **Requiere inscripcion** | No | Si/No | Si |
| **URL de inscripcion** | No | URL | Enlace externo si la inscripcion no es por la web |
| **Organizador** | No | Texto | "Colegio Oficial de Graduados Sociales de Madrid" (por defecto) |
| **Programa** | No | Editor | Programa del evento si lo tiene |
| **Documento adjunto** | No | Archivo | PDF con informacion adicional |
| **Solo para colegiados** | No | Si/No | Si = muestra badge "Colegiados" en la web |

### Tipos de evento

| Tipo | Uso tipico | Ejemplo |
|------|-----------|---------|
| **Institucional** | Actos oficiales del Colegio | Dia del Graduado Social, Acto de Jura |
| **Asamblea** | Asambleas generales | Asamblea General Ordinaria 2026 |
| **Networking** | Encuentros entre colegiados | Afterwork Jovenes Graduados |
| **Conferencia** | Charlas y ponencias abiertas | Conferencia: El Futuro del Trabajo |
| **Acto Social** | Eventos sociales | Cena de Navidad |
| **Otro** | Cualquier otro | Visita institucional |

### Crear un evento nuevo

1. **WP Admin > Eventos > Anadir nuevo**
2. Escribir el **titulo**
3. Rellenar los campos ACF:
   - **Fecha** (obligatoria), horario, lugar
   - **Tipo de evento** (seleccionar uno)
   - **Estado:** "Programado" o "Inscripcion abierta"
   - **Solo para colegiados:** activar si aplica
4. Escribir descripcion en el **contenido** del editor
5. Panel lateral:
   - Subir **Imagen destacada**
6. **Publicar**

### Ciclo de vida de un evento

```
1. Se crea con estado "Programado" → aparece en listings
2. Se abre inscripcion → cambiar a "Inscripcion abierta"
3. Se llenan plazas → cambiar a "Completo"
4. Se celebra el evento
5. Termina → cambiar a "Finalizado"
6. Si se cancela → cambiar a "Cancelado"
```

### Buenas practicas

- Crear el evento **con al menos 1 mes de antelacion** para eventos grandes
- Siempre poner **fecha, horario, lugar y tipo**
- Marcar **"Solo para colegiados"** en eventos restringidos — la web muestra un badge visible
- Cuando termine, cambiar a **"Finalizado"** — la web lo mueve a la seccion de eventos pasados
- Subir **imagen** — mejora mucho la apariencia en el listado

---

## Diferencia entre Formacion y Evento

| | Formacion | Evento |
|---|-----------|--------|
| **Objetivo** | Aprender (con programa y ponentes) | Participar (actos, networking, asambleas) |
| **Campos clave** | Ponentes, horas lectivas, precios, diploma | Tipo de evento, organizador |
| **Ejemplo** | "Curso de Nominas 2026" | "Asamblea General Ordinaria" |
| **Tiene precios** | Si (tabla de precios) | No |
| **Tiene ponentes** | Si (repetidor) | No |
| **Tiene diploma** | Si (configurable) | No |
| **Aparecen en** | `/formacion-eventos` | `/eventos` |
| **En la home** | Ambos aparecen en "Proximas actividades" | Ambos aparecen |

> **Regla simple:** Si tiene ponentes y/o programa formativo → **Formacion**. Si es un acto, reunion o actividad social → **Evento**.

---

## Seccion "Proximas actividades" en la home

La seccion de "Proximas actividades" de la pagina principal muestra automaticamente:
- **Formaciones** y **Eventos** cuya fecha de inicio sea **futura**
- Ordenados por fecha (los mas proximos primero)
- Maximo 9 items, en grupos de 3 con navegacion

No hay que hacer nada especial para que aparezcan ahi. Solo hay que:
1. Crear la formacion/evento con fecha futura
2. Publicarlo
3. Aparece automaticamente en la home (max 60 segundos)

---

## Imagenes

### Tamanos recomendados

| Uso | Tamano | Formato | Notas |
|-----|--------|---------|-------|
| Imagen destacada (posts, formaciones, eventos) | 800x450 px | JPG o WebP | Proporcion 16:9 |
| Fotos de ponentes | 400x400 px | JPG o WebP | Cuadradas |
| Documentos PDF | - | PDF | Para programas descargables |

### Consejos

- Comprimir las imagenes antes de subirlas (usar tinypng.com o similar)
- Evitar imagenes de mas de 500 KB
- No subir capturas de pantalla como imagen destacada
- Las imagenes se redimensionan automaticamente para la web

---

## Preguntas frecuentes

**¿Cuanto tarda en aparecer un cambio en la web?**
Maximo 60 segundos. La web se refresca automaticamente.

**¿Puedo programar una publicacion?**
Si. En vez de "Publicar", cambiar la fecha de publicacion a una fecha futura y clic en "Programar".

**¿Que pasa si borro algo por error?**
Va a la Papelera. Se puede restaurar desde WP Admin > Papelera durante 30 dias.

**¿Puedo duplicar una formacion existente?**
No hay boton nativo. Lo mas rapido es crear una nueva y copiar los campos manualmente.

**¿Como pongo un enlace en el contenido?**
En el editor visual, seleccionar el texto y clic en el icono de enlace (cadena). No usar HTML directamente salvo que sepas lo que haces.

---

*Documento generado el 23 de marzo de 2026. Sujeto a actualizaciones conforme evolucione la plataforma.*
