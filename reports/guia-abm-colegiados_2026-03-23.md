# Guia de gestion de Colegiados y Precolegiados — ABM

**Proyecto:** Web del Colegio Oficial de Graduados Sociales de Madrid
**Fecha:** 23 de marzo de 2026
**Version:** 2.0

---

## Conceptos clave

El sistema maneja **dos entidades vinculadas** para cada colegiado:

| Entidad | Donde esta | Para que sirve |
|---------|-----------|----------------|
| **Usuario** | WP Admin > Usuarios | Credenciales de acceso (login/password) |
| **Profesional** | WP Admin > Profesionales | Ficha publica del directorio (datos, foto, bio) |

Cuando se crea un usuario con rol "Profesional Colegiado", el sistema **crea automaticamente** la ficha de Profesional y los vincula. No hay que crearlos por separado.

Los **precolegiados** tienen usuario pero NO tienen ficha de Profesional ni aparecen en el directorio.

### Roles disponibles

| Rol | Quien es | Ficha profesional | Directorio | Area Privada | Email de bienvenida |
|-----|----------|:-----------------:|:----------:|:------------:|:-------------------:|
| **Administrador** | Personal del Colegio | — | — | Completa | No |
| **Profesional Colegiado** | Colegiado activo | Si (automatica) | Si | Completa (perfil, directorio) | Si, al publicar ficha |
| **Precolegiado** | Estudiante / futuro colegiado | No | No | Limitada (formacion, documentos) | Si, al crear usuario |
| **Suscriptor** | WP default | No | No | Basica | No |

---

## ALTA de un colegiado

### Paso 1 — Crear el usuario

1. Ir a **WP Admin > Usuarios > Anadir nuevo**
2. Rellenar:
   - **Nombre de usuario:** `nombre.apellido` (ej: `maria.garcia`) — no se puede cambiar despues
   - **Email:** el email personal del colegiado
   - **Nombre y Apellidos**
   - **Contrasena:** usar el generador de WP o poner una segura
   - **Rol:** seleccionar **Profesional Colegiado**
3. Clic en **Anadir nuevo usuario**

> El sistema crea automaticamente una ficha en **Profesionales** (en estado Borrador).

### Paso 2 — Completar datos oficiales

1. Ir a **WP Admin > Profesionales**
2. Abrir la ficha recien creada (aparece con el nombre del usuario)
3. Rellenar los campos oficiales:
   - **Numero de colegiado** (obligatorio) — ej: `GD-12345`
   - **Ejerciente:** Si / No
   - **Mediador registrado:** Si / No
   - **Acepta turno de oficio:** Si / No
4. Cambiar estado a **Publicar**

> **Al publicar la ficha, el sistema envia automaticamente un email de bienvenida al colegiado** con:
> - Logo del Colegio y diseno corporativo
> - Su numero de colegiado, usuario y email
> - Boton para establecer su contrasena
> - Link al Area Privada
> - 3 pasos: establecer contrasena → completar perfil → activar directorio

### Paso 3 — El colegiado completa su perfil

El colegiado recibe el email, establece su contrasena y entra a **Area Privada > Editar perfil**:

- Subir su **foto** (JPG, PNG o WebP, max 2 MB)
- Rellenar: despacho, direccion, codigo postal, telefono, email de contacto, web, LinkedIn, bio, idiomas
- Activar **"Visible en directorio"** para aparecer en `/directorio`

> Ya no hay que comunicar credenciales manualmente. El email automatico se encarga de todo.

---

## ALTA de un precolegiado

### Paso 1 — Crear el usuario

1. Ir a **WP Admin > Usuarios > Anadir nuevo**
2. Rellenar:
   - **Nombre de usuario:** `nombre.apellido`
   - **Email:** el email del precolegiado
   - **Nombre y Apellidos**
   - **Contrasena:** usar el generador de WP
   - **Rol:** seleccionar **Precolegiado**
3. Clic en **Anadir nuevo usuario**

> **Al crear el usuario, el sistema envia automaticamente un email de bienvenida** con:
> - Badge teal "Precolegiado"
> - Su usuario y email
> - Boton para establecer contrasena
> - 4 pasos: establecer contrasena → acceder al Area Privada → explorar formacion → hazte colegiado

### Que puede hacer un precolegiado

- Acceder al **Area Privada** (formaciones, documentos, configuracion)
- Inscribirse a formaciones (con tarifa de precolegiado si aplica)
- Consultar documentos y recursos del Colegio
- Ve una card destacada **"Hazte Colegiado"** con CTA para dar el paso

### Que NO puede hacer un precolegiado

- No tiene ficha en el directorio
- No puede editar un perfil profesional
- No puede subir foto de perfil
- No aparece en `/directorio`

---

## De precolegiado a colegiado (promocion)

Cuando un precolegiado se colegia oficialmente:

1. **WP Admin > Usuarios** > buscar al precolegiado > **Editar**
2. Cambiar el **Rol** de "Precolegiado" a **"Profesional Colegiado"**
3. Guardar

> Al cambiar el rol, el sistema crea automaticamente la ficha de Profesional (en Borrador).

4. Ir a **WP Admin > Profesionales** > abrir la ficha nueva
5. Rellenar: numero de colegiado, ejerciente, mediador, turno de oficio
6. **Publicar** → se envia email de bienvenida como colegiado

> El precolegiado ahora tiene acceso completo: perfil, directorio, foto, todo.

---

## MODIFICACION

### Datos que modifica el ADMIN (WP Admin)

| Campo | Donde | Aplica a |
|-------|-------|----------|
| Numero de colegiado | Profesionales > editar ficha | Colegiados |
| Ejerciente Si/No | Profesionales > editar ficha | Colegiados |
| Mediador registrado Si/No | Profesionales > editar ficha | Colegiados |
| Acepta turno de oficio Si/No | Profesionales > editar ficha | Colegiados |
| Email de login | Usuarios > editar usuario | Ambos |
| Contrasena | Usuarios > editar usuario | Ambos |
| Rol del usuario | Usuarios > editar usuario | Ambos |

### Datos que modifica el COLEGIADO (Area Privada)

| Campo | Donde |
|-------|-------|
| Foto de perfil | Area Privada > Editar perfil |
| Despacho | Area Privada > Editar perfil |
| Direccion y codigo postal | Area Privada > Editar perfil |
| Telefono | Area Privada > Editar perfil |
| Email de contacto (directorio) | Area Privada > Editar perfil |
| Web y LinkedIn | Area Privada > Editar perfil |
| Biografia / descripcion | Area Privada > Editar perfil |
| Idiomas | Area Privada > Editar perfil |
| Visible en directorio Si/No | Area Privada > Editar perfil |

> **Nota:** El email de contacto (directorio) y el email de login son independientes.

> **Nota:** La biografia solo permite texto basico (negritas, cursivas, listas). No se pueden insertar enlaces, imagenes ni videos por seguridad.

---

## BAJA

### Baja temporal de colegiado (no aparece en directorio, conserva acceso)

**Opcion A — El colegiado lo hace:**
- Area Privada > Editar perfil > desactivar "Visible en directorio"

**Opcion B — El admin lo hace:**
- WP Admin > Profesionales > cambiar la ficha a **Borrador**

### Baja temporal de precolegiado

- WP Admin > Usuarios > editar > cambiar rol a **Suscriptor**
- Pierde acceso a la funcionalidad de precolegiado pero conserva el usuario

### Baja definitiva (colegiado o precolegiado)

1. Si es colegiado: **WP Admin > Profesionales** > seleccionar > **Papelera**
2. **WP Admin > Usuarios** > seleccionar > **Eliminar**

> **Recomendacion:** Cambiar primero a Borrador/Suscriptor durante 30 dias antes de eliminar definitivamente.

---

## Emails automaticos

El sistema envia emails con diseno corporativo (logo, colores, boton gradient) de forma automatica:

| Evento | Destinatario | Se dispara cuando |
|--------|-------------|-------------------|
| **Bienvenida colegiado** | El colegiado | Su ficha de Profesional pasa a "Publicar" |
| **Bienvenida precolegiado** | El precolegiado | Se crea su usuario con rol "Precolegiado" |

### Contenido del email de colegiado

- Badge azul "Bienvenido"
- Numero de colegiado, usuario, email
- Boton "Establecer mi contrasena" (link de reset)
- Link al Area Privada
- Pasos: establecer contrasena → completar perfil → activar directorio
- Contacto del Colegio

### Contenido del email de precolegiado

- Badge teal "Precolegiado"
- Tipo de cuenta, usuario, email
- Boton "Establecer mi contrasena" (link de reset)
- Link al Area Privada
- Pasos: establecer contrasena → acceder Area Privada → explorar formacion → hazte colegiado
- Contacto del Colegio

> **Requisito:** Para que los emails lleguen, debe estar configurado un **plugin SMTP** en WordPress (WP Mail SMTP, Post SMTP o similar). Sin esto, los emails no se envian correctamente.

---

## Foto de perfil

Los colegiados pueden subir su propia foto desde el Area Privada:

1. **Area Privada > Editar perfil**
2. Seccion "Foto de perfil" > clic en **"Subir foto"** (o "Cambiar foto")
3. Formatos: JPG, PNG o WebP
4. Tamano maximo: 2 MB
5. La foto se guarda en WordPress y aparece en:
   - Su ficha del directorio (`/directorio/nombre-apellido`)
   - La tarjeta del listado del directorio (`/directorio`)

> El admin tambien puede subir/cambiar la foto desde WP Admin > Profesionales > editar ficha > campo "Foto".

---

## Casos especiales

### Colegiado que cambia de email
1. Email de login: WP Admin > Usuarios > editar > cambiar email
2. Email del directorio: el colegiado lo cambia desde Area Privada > Editar perfil
3. Son independientes

### Colegiado que pasa de no ejerciente a ejerciente
- WP Admin > Profesionales > editar ficha > Ejerciente: "Si"
- Solo el admin puede hacer este cambio

### Profesional sin usuario (ficha manual)
Se puede crear una ficha en Profesionales directamente sin crear usuario:
- Aparece en el directorio si esta publicada
- Nadie puede editarla desde el frontend
- Util para colegiados historicos o de honor
- No genera email de bienvenida

### Alta masiva (migracion)
Para dar de alta muchos colegiados a la vez:
1. Preparar un listado Excel/CSV con: nombre, apellido, email, numero colegiado, ejerciente
2. Solicitar al desarrollador la ejecucion del script de importacion
3. Cada colegiado recibira su email de bienvenida automaticamente al publicar su ficha

---

## Resumen visual

```
ALTA COLEGIADO
  Admin crea usuario (rol: Profesional Colegiado)
    → Sistema crea ficha Profesional (Borrador)
      → Admin rellena: numero, ejerciente, mediador
        → Admin pulsa "Publicar"
          → EMAIL AUTOMATICO al colegiado
            → Colegiado establece contrasena
              → Completa perfil: foto, despacho, bio...
                → Activa "Visible en directorio"
                  → Aparece en /directorio

ALTA PRECOLEGIADO
  Admin crea usuario (rol: Precolegiado)
    → EMAIL AUTOMATICO al precolegiado
      → Precolegiado establece contrasena
        → Accede a formacion, documentos
          → Cuando se colegia: admin cambia rol
            → Se repite flujo de colegiado

BAJA TEMPORAL
  Colegiado desactiva visibilidad (o Admin pone en Borrador)
    → Desaparece del directorio, conserva acceso

BAJA DEFINITIVA
  Admin: ficha a Papelera + eliminar usuario
    → Desaparece del directorio + pierde acceso
```

---

## Buenas practicas

1. **Nombres de usuario consistentes:** siempre `nombre.apellido` en minusculas
2. **Numero de colegiado unico:** nunca reasignar un numero a otro colegiado
3. **Publicar solo cuando este listo:** el email se envia al publicar, no antes
4. **Baja gradual:** Borrador primero, Papelera despues de 30 dias
5. **SMTP obligatorio:** sin SMTP configurado, los emails no llegan
6. **Contrasenas seguras:** usar el generador de WP, minimo 12 caracteres
7. **Separacion de responsabilidades:** admin gestiona datos oficiales, colegiado gestiona contacto y foto
8. **Precolegiados → Colegiados:** al cambiar rol, la ficha se crea automatica — solo hay que rellenar datos y publicar
9. **Auditar cambios:** considerar instalar WP Activity Log

---

*Documento generado el 23 de marzo de 2026 (v2.0). Sujeto a actualizaciones.*
