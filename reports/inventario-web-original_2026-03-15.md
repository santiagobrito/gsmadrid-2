# Inventario Completo del Sitio Web Original
## Colegio Oficial de Graduados Sociales de Madrid
### graduadosocialmadrid.org
**Fecha de analisis:** 15 de marzo de 2026

---

## ESTADO TECNICO DEL SITIO

**Plataforma:** Joomla CMS (version antigua)
**Estado:** CRITICO - Solo la homepage carga correctamente. Todas las paginas internas muestran errores PHP:
```
Warning: require_once(.../libraries/joomla/document/html/renderer/head.php): failed to open stream
```
**Causa:** Archivo faltante en la instalacion de Joomla (template "hello_world" roto)
**Consecuencia:** El 90% del sitio es inaccesible para visitantes

**Blog separado:** blog.graduadosocialmadrid.org (WordPress, ultimo post: febrero 2023 - INACTIVO 3 anos)

---

## 1. ESTRUCTURA DE NAVEGACION PRINCIPAL

### Menu Principal
```
Inicio
Nuestro Colegio
  - Carta del Presidente (/colegio/cartapresidente)
  - Junta de Gobierno (/colegio/junta-de-gobierno)
  - Historia (/colegio/historia)
  - Portal de Transparencia (/colegio/transparencia)

Colegiados
  - Club del Graduado (/colegiados/club-graduado)
  - Requisitos para Colegiarse (/colegiados/requisitos-colegiarse)
  - Precolegiados (subpagina de requisitos)
  - Revistas (/colegiados/revistas)
  - Agenda (/colegiados/agenda)
  - Acuerdos (/colegiados/acuerdos)
  - Correo Corporativo (/colegiados/correo-corporativo)
  - Sala de Togas (/colegiados/sala-de-togas)
  - Ventanilla Unica (/colegiados/ventanilla-unica)
  - Kit Electronico (PDF)
  - Presentacion CGSM (PDF)

Blog El Graduado (enlace externo: blog.graduadosocialmadrid.org)

Servicios
  - Servicios al Ciudadano
    - Clinica Juridica (/servicios/servicios-ciudadano/clinica-juridica)
    - Asistencia Juridica Gratuita (/servicios/servicios-ciudadano/servicio-de-asistencia-juridica-gratuita)
    - Instituto de Mediacion
      - Formacion
      - Centro de Mediacion
      - Difusion (enlace externo: hablamosdemediacion.es)
    - Escuela de Voluntariado (enlace externo: madrid.org)
    - Seguridad y Salud de Personas
    - Canal de Denuncias (enlace externo: complylaw)

Novedades (/novedades)
```

### Cabecera
- Telefono: 91 523 08 88
- Email: admon@graduadosocialmadrid.org
- Horario verano: 15 jun - 15 sept (L-J 8:00-15:00; V 8:00-14:00)
- Logo: "Excelentisimo Colegio Oficial de Graduados Sociales de Madrid"
- Area privada: Login con usuario/contrasena

---

## 2. CONTENIDO POR SECCION

### 2.1 HOMEPAGE

**Slider/Carrusel principal** con multiples banners promocionales:

1. **IA en RRHH** - Curso "Domina la Inteligencia Artificial en el Area Socio-Laboral de RRHH"
   - Fechas: 8-10 abril 2026
   - Formato: Virtual en directo
   - Duracion: 6 horas
   - Registro: Typeform

2. **Traslado de Sede** - Aviso de mudanza
   - Nueva direccion: Calle Jose Abascal, 44 - 5o izqda, 28003 Madrid
   - Fecha efectiva: 16 marzo 2026
   - Instalaciones: Despachos profesionales, salas de reuniones, salas de formacion, sala de medios, sala de simulacion de juicios

3. **ExpeRHt Day**
   - Fecha: Viernes 20 febrero 2026
   - Lugar: Auditorio Banco Sabadell (c/ Serrano, 71)
   - Gratis para colegiados (presencial); 30EUR online
   - Tema: Identidad, liderazgo y bienestar

4. **Webinar Videoteca COE**
   - Fecha: Miercoles 18 febrero, 09:30
   - Contenido: Tipos de contratos, incentivos a la contratacion

5. **Curso Experto en Igualdad** (16-23 marzo 2026)
6. **Seminario Mediacion y MASC** (21 enero 2026 - CANCELADO)
7. **Formacion Accidentes Laborales** (febrero 2026, con URJC)
8. **Jornada Acoso Laboral y Salud Mental**
9. **XIX Congreso Actualidad Laboral** (20 noviembre)

**Nota sobre UICM:** Documento de la Comision de Seguridad Laboral

---

### 2.2 CARTA DEL PRESIDENTE

**Presidenta:** Teresa Silleras Martinez
**Eleccion:** 8 de julio (mandato de 4 anos)
**Lema de campana:** "Tu futuro, nuestro compromiso"

**Contenido de la carta:**
- Presenta a los nuevos miembros de la Junta
- Objetivos estrategicos:
  1. **Modernizacion:** Digitalizacion del Colegio, desarrollo audiovisual, sostenibilidad
  2. **Formacion profesional:** Formacion hibrida, acercamiento a universidades e institutos
  3. **Expansion de colegiados:** Captacion de profesionales de RRHH y PRL
  4. **Nueva sede:** Necesidad de nueva ubicacion fisica moderna y accesible

---

### 2.3 JUNTA DE GOBIERNO

| Cargo | Nombre |
|-------|--------|
| Presidenta | Teresa Silleras Martinez |
| Vicepresidente 1o | Manuel Rodriguez Noguera |
| Secretaria General | Amaya Segovia Mahillo |
| Vicesecretaria | Monica Esteban Amate |
| Tesorera | Ana Maria Cerezo Rodriguez |
| Vicetesorero | Jose Luis Perea Prieto |
| Vocal Ejerciente | Raul Bachot Ruiz |
| Vocal Ejerciente | Jose Antonio Juarez Rodriguez |
| Vocal Ejerciente | Juan Jose Carmelo Santana |
| Vocal Ejerciente | Ma Luisa Martin Bardera |
| Vocal Ejerciente | Elena Tolbanos Cobo |
| Vocal No Ejerciente | Jose Carlos Astudillo Agudo |
| Vocal No Ejerciente | Alvaro Rueda Sanchez |
| Vocal No Ejerciente | Francisco Javier Cerrajero Mendez |

Cada miembro tiene foto profesional e iconos de redes sociales (Twitter, LinkedIn, Facebook, Google+).

---

### 2.4 HISTORIA

- Seccion titulada "Nuestra Historia"
- Contenido real NO accesible (se muestra como publicacion digital/flipbook externo)
- Ultima actualizacion: 17-04-2023
- **NECESITA:** Contenido historico real para la nueva web

---

### 2.5 PORTAL DE TRANSPARENCIA

6 carpetas de documentos:
1. **BOE.es** - Codigo de la Profesion de Graduado Social
2. **Comisiones** - Documentos de comisiones
3. **Cuentas Anuales** - Informes financieros
4. **Memoria** - Memorias de actividad
5. **Normativa** - Estatutos y reglamentos internos
6. **Presupuesto** - Documentacion presupuestaria

---

### 2.6 COLEGIACION (Requisitos)

**4 tipos de colegiacion:**
1. **Ejercientes Libres** - Profesionales independientes
2. **Ejercientes de Empresa** - Empleados en organizaciones
3. **No Ejercientes** - Profesionales inactivos
4. **Precolegiados** - Categoria preparatoria

**Documentos:**
- Guia de documentos necesarios (PDF, actualizada 2023)
- Guia orientativa de servicios al colegiado (PDF)

---

### 2.7 SERVICIOS AL CIUDADANO

#### 2.7.1 Clinica Juridica
- Colaboracion con Universidad Carlos III de Madrid (UC3M)
- Establecida por Protocolo del 24 septiembre 2015
- Areas: Desigualdad/Discriminacion, Acceso a servicios publicos, Empresa socialmente responsable
- Beneficiarios: Personas vulnerables o en riesgo de exclusion social
- Colaboradores: Ayuntamiento Madrid, Ayuntamiento Colmenarejo, Servicios Sociales Sierra Norte, Asociacion Espanola de Microfinanzas, etc.
- Miembro de Red Espanola de Clinicas Juridicas Universitarias y ENCLE

#### 2.7.2 Asistencia Juridica Gratuita
- Servicio GRATUITO de asesoramiento laboral y seguridad social
- La fase consultiva es completamente gratuita
- +1.000 Graduados Sociales participan

**Areas de consulta:**
- **Trabajadores:** Despidos, reclamacion salarial, demandas, conciliacion, desempleo, prestaciones
- **Empresas:** Conflictos laborales, fiscalidad, convenios, PRL, RRHH, altas
- **Extranjeros:** Relaciones laborales, retorno, residencia, reagrupacion familiar, visados
- **Seguridad Social:** Desempleo, jubilacion, viudedad, prestaciones familiares, citas

#### 2.7.3 Instituto de Mediacion
- Formacion en mediacion
- Centro de Mediacion
- Difusion: hablamosdemediacion.es (sitio externo)

#### 2.7.4 Otros servicios al ciudadano
- Escuela de Voluntariado (enlace a madrid.org)
- Seguridad y Salud de Personas
- Canal de Denuncias (plataforma externa complylaw)

---

### 2.8 SERVICIOS PARA COLEGIADOS

#### 2.8.1 Club del Graduado
- Pagina con poca informacion visible
- Solo muestra datos de contacto basicos

#### 2.8.2 Correo Corporativo
- Email gratuito: cgsm####@graduadosocialmadrid.org
- O nombre personalizado@graduadosocialmadrid.org
- Gran capacidad y antivirus incluido
- Soporte tecnico: cgsm@monitorinformatica.com
- Se promociona como mas profesional que Gmail/Hotmail

#### 2.8.3 Sala de Togas
- Ubicacion: c/ Princesa, 3, 1a planta (zona judicial Madrid)
- Solo para Colegiados Ejercientes
- Servicios: Ordenadores, internet, fotocopias (0,05EUR/ud), informacion de los 41 Juzgados de lo Social
- Telefono: 915530002
- Email: saladgraduados@graduadosocialmadrid.org
- NO hay sala en Mostoles ni Toledo

#### 2.8.4 Ventanilla Unica
- Alta de colegiados (formulario)
- Baja de colegiado (formulario)
- Modificar datos (formulario)
- Gestion de certificados

#### 2.8.5 Revistas "El Graduado"
| Numero | Fecha |
|--------|-------|
| no86 | 20 junio 2025 |
| no85 | 13 marzo 2025 |
| no84 | 17 diciembre 2024 |
| no83 | 3 julio 2024 |
| no82 | 13 marzo 2024 |
| no81 | 3 noviembre 2023 |
Frecuencia: ~trimestral

#### 2.8.6 Acuerdos y Convenios

**Financieros/Seguros:**
- Global Finanz (seguro RC profesional)
- Banco Sabadell (banca profesional)
- Union de Mutuas
- Fraternidad Muprespa (PRL)
- Asepeyo (accidentes laborales)
- Ibermutuamur

**Tecnologia:**
- Monitor Informatica (productos informaticos)
- Wolters Kluwer (recursos juridicos)
- Lefebvre (analisis legal)
- Protechplus (seguridad IT)

**Consultoria:**
- LAE Consulting
- SCL Consultores
- Saltra

**Educacion:**
- Universidad Carlos III (UC3M)

#### 2.8.7 Agenda
- Calendario interactivo (DPCalendar)
- Vistas: mes, semana, dia, lista
- Calendarios ID: 90 y 91
- Funcionalidad de impresion

---

### 2.9 NOVEDADES (Noticias)

Ultimas noticias publicadas:
1. **"Del conflicto al cuidado: Acoso laboral y salud mental"** - 28 nov 2025
2. **"Medidas extraordinarias SMAC"** - 5 dic 2024
3. **"Curso practico Cuadro de Mando RRHH"** - 4 jun 2024
4. **"Real Decreto-ley 5/1979"** - 5 ago 2024
5. **"Taller Laboral 5 de Junio"** - 22 may 2024
6. **"Mejoras citas SMAC"** - 20 jun 2024
7. **"Reiki para Graduados Sociales"** - 8 abr 2024

---

### 2.10 BLOG (blog.graduadosocialmadrid.org)

**Plataforma:** WordPress (separado del Joomla principal)
**Estado:** INACTIVO desde febrero 2023

Ultimos posts:
1. "Las horas trabajadas siguen disminuyendo en 2023" - 23 feb 2023
2. "Los contratos de practicas se convierten en indefinidos" - 16 feb 2023
3. "La desconexion digital, un derecho laboral" - 9 feb 2023
4. "Autonomos en contenido digital" - 3 feb 2023
5. "ChatGPT, la IA que amenaza puestos" - 26 ene 2023

**22 categorias** de contenido (laboral, empleo, autonomos, RRHH, PRL, SS, empresa, igualdad, digitalizacion, justicia social...)
**50+ tags** relacionados con el mundo laboral

---

## 3. INFORMACION DE CONTACTO

### Sede ANTERIOR (hasta 15 marzo 2026)
- Direccion: c/ Arriaza 4, Local, 28008 Madrid
- Telefono: 91 523 08 88
- Fax: 91 522 26 85
- Email: admon@graduadosocialmadrid.org

### Sede NUEVA (desde 16 marzo 2026)
- Direccion: Calle Jose Abascal, 44 - 5o izqda, 28003 Madrid
- Instalaciones: Despachos, salas de reuniones, salas de formacion, sala de medios, sala de simulacion de juicios

### Sala de Togas
- Direccion: c/ Princesa, 3, 1a planta, Madrid
- Telefono: 915530002
- Email: saladgraduados@graduadosocialmadrid.org

### Horario
- Normal: No especificado en la web
- Verano (15 jun - 15 sept): L-J 8:00-15:00 / V 8:00-14:00

---

## 4. ELEMENTOS TECNICOS

- **Area privada:** Login modal con usuario/contrasena y recuperacion
- **Cookies:** Sistema de consentimiento con preferencias (obligatorias, analiticas Google Analytics, preferencias YouTube/Twitter)
- **Formularios:** Typeform para inscripciones a eventos
- **Calendario:** DPCalendar (plugin Joomla)
- **PDFs:** Multiples documentos descargables en /images/PDF/
- **Enlaces externos:** hablamosdemediacion.es, madrid.org (voluntariado), complylaw (denuncias)

---

## 5. ANALISIS: QUE FUNCIONA Y QUE NO

### LO QUE ESTA ROTO
- Todas las paginas internas devuelven error PHP (Joomla roto)
- Blog abandonado desde 2023
- Informacion de direccion desactualizada (sede antigua)
- Google+ en perfiles de la Junta (red social cerrada desde 2019)
- Algunos contenidos solo accesibles tras login (area privada)
- Multiples enlaces a javascript:void(0) sin funcionalidad

### LO QUE FUNCIONA
- Homepage carga correctamente con todo el slider
- Las URLs "limpias" (sin index.php) cargan la mayoria de contenido
- Formularios Typeform funcionan
- PDFs descargables accesibles

### CONTENIDO QUE DEBE PRESERVARSE
1. Datos completos de la Junta de Gobierno (14 miembros)
2. Carta del Presidente (Teresa Silleras)
3. Los 4 tipos de colegiacion y sus requisitos
4. Servicios al Ciudadano (especialmente Asistencia Juridica Gratuita)
5. Acuerdos con empresas colaboradoras
6. Archivo de revistas "El Graduado"
7. Portal de Transparencia (6 categorias de documentos)
8. Informacion de la nueva sede (Jose Abascal 44)
9. Sala de Togas (Princesa 3)
10. Servicio de correo corporativo

### CONTENIDO OBSOLETO O INNECESARIO
- Referencias a la sede antigua (Arriaza 4)
- Google+ en todos los perfiles
- Blog inactivo 3 anos
- Eventos pasados sin archivar
- Seminario cancelado aun visible en homepage
- Fax (91 522 26 85) - probablemente obsoleto

---

## 6. RESUMEN ESTADISTICO

| Metrica | Valor |
|---------|-------|
| Total paginas principales | ~25 |
| Paginas con error PHP | ~20 (80%) |
| Miembros de Junta | 14 |
| Tipos de colegiacion | 4 |
| Servicios al ciudadano | 6 |
| Acuerdos/convenios | ~15 |
| Numeros de revista | 6+ (trimestral) |
| Categorias transparencia | 6 |
| Posts en blog | ~50+ (inactivo) |
| Noticias recientes | 7 visibles |
