#!/bin/bash
# ============================================================
# GS Madrid 2 — Seed Mock Data
# Creates sample content in all CPTs for demo/testing
# Run inside the WordPress container via runScript
# ============================================================

cd /code

# ============================================================
# 1. BLOG POSTS (6 noticias)
# ============================================================

wp post create --post_type=post --post_title='Principales novedades de la reforma laboral 2026' \
  --post_content='<p>El primer trimestre de 2026 trae consigo cambios significativos en la legislacion laboral espanola. La reduccion de la jornada laboral a 37,5 horas semanales, la implantacion del registro horario digital obligatorio y la actualizacion del Salario Minimo Interprofesional son las medidas mas destacadas.</p><p>Desde el Colegio Oficial de Graduados Sociales de Madrid analizamos el impacto de estas reformas en la practica profesional y ofrecemos las claves para su correcta aplicacion.</p><h2>Reduccion de jornada</h2><p>La nueva jornada maxima de 37,5 horas semanales entrara en vigor de forma progresiva. Los graduados sociales juegan un papel fundamental en la adaptacion de los convenios colectivos y contratos individuales.</p><h2>Registro horario digital</h2><p>Se elimina definitivamente el registro en papel. Todas las empresas deberan contar con un sistema digital homologado antes del 30 de junio de 2026.</p>' \
  --post_status=publish --post_excerpt='Analizamos los cambios mas significativos de la nueva normativa laboral que entra en vigor este trimestre.' \
  --allow-root 2>/dev/null

wp post create --post_type=post --post_title='Nuevo convenio con la Universidad Complutense de Madrid' \
  --post_content='<p>El Colegio Oficial de Graduados Sociales de Madrid ha firmado un acuerdo de colaboracion con la Universidad Complutense de Madrid para el desarrollo de programas de practicas y formacion continua.</p><p>Este convenio permitira a los estudiantes del Grado en Relaciones Laborales y Recursos Humanos realizar practicas tuteladas en despachos de graduados sociales colegiados, acercando la universidad al ejercicio profesional real.</p>' \
  --post_status=publish --post_excerpt='El Colegio firma un acuerdo de colaboracion con la UCM para practicas y formacion continua.' \
  --allow-root 2>/dev/null

wp post create --post_type=post --post_title='Guia practica de cotizacion a la Seguridad Social 2026' \
  --post_content='<p>Ya esta disponible la guia actualizada con las bases y tipos de cotizacion vigentes para el ejercicio 2026. Este documento, elaborado por la Comision de Formacion del Colegio, incluye tablas comparativas, ejemplos practicos y un resumen de los cambios mas relevantes respecto al ejercicio anterior.</p><p>La guia esta disponible para descarga gratuita para todos los colegiados desde el Area Privada.</p>' \
  --post_status=publish --post_excerpt='Descarga la guia actualizada con las bases y tipos de cotizacion vigentes para este ejercicio.' \
  --allow-root 2>/dev/null

wp post create --post_type=post --post_title='Inauguracion de la nueva sede en Jose Abascal 44' \
  --post_content='<p>El pasado 16 de marzo de 2026, el Colegio Oficial de Graduados Sociales de Madrid inauguro oficialmente su nueva sede en la Calle Jose Abascal, 44. El acto conto con la presencia de la presidenta Teresa Silleras, la Junta de Gobierno en pleno, representantes institucionales y mas de 200 colegiados.</p><p>Las nuevas instalaciones incluyen salas de formacion con equipamiento audiovisual de ultima generacion, despachos, salas de reuniones, una sala de medios y una sala de simulacion de juicios unica en Madrid.</p>' \
  --post_status=publish --post_excerpt='El Colegio estrena nuevas instalaciones con sala de formacion, simulacion de juicios y espacios de coworking.' \
  --allow-root 2>/dev/null

wp post create --post_type=post --post_title='La inteligencia artificial en el ambito laboral: oportunidades y riesgos' \
  --post_content='<p>La irrupcion de la inteligencia artificial en los departamentos de recursos humanos plantea nuevos retos para los profesionales del derecho laboral. Desde la seleccion automatizada de candidatos hasta la monitorizacion del rendimiento, la IA esta transformando la relacion entre empresas y trabajadores.</p><p>El Colegio organiza un ciclo de conferencias sobre IA y derecho laboral durante el mes de abril, con ponentes de primer nivel del ambito academico y empresarial.</p>' \
  --post_status=publish --post_excerpt='Analizamos como la IA esta transformando los departamentos de RRHH y que implica para los graduados sociales.' \
  --allow-root 2>/dev/null

wp post create --post_type=post --post_title='Balance del primer semestre del mandato de Teresa Silleras' \
  --post_content='<p>Seis meses despues de la toma de posesion de la nueva Junta de Gobierno, la presidenta Teresa Silleras presenta los avances del plan estrategico 2025-2029. Entre los logros mas destacados: la nueva sede, la renovacion digital de la web, el incremento de un 15% en la oferta formativa y la firma de tres convenios con universidades madrilenas.</p>' \
  --post_status=publish --post_excerpt='La presidenta presenta los avances del plan estrategico a seis meses de su mandato.' \
  --allow-root 2>/dev/null

echo "Blog posts created"

# ============================================================
# 2. FORMACIONES (5 formaciones)
# ============================================================

wp post create --post_type=formacion --post_title='Jornada de Actualizacion Laboral 2026' \
  --post_content='<p>Jornada intensiva de actualizacion sobre las principales novedades legislativas en materia laboral y de Seguridad Social para el ejercicio 2026. Dirigida a graduados sociales en activo que necesitan estar al dia de los cambios normativos.</p><h2>Programa</h2><ul><li>09:30 - Registro y bienvenida</li><li>10:00 - Reduccion de jornada: impacto en convenios colectivos</li><li>11:30 - Pausa cafe</li><li>12:00 - Registro horario digital obligatorio</li><li>13:00 - Actualizacion SMI y cotizaciones 2026</li><li>14:00 - Clausura</li></ul>' \
  --post_status=publish --post_excerpt='Cambios clave en legislacion laboral y Seguridad Social para el ejercicio profesional.' \
  --allow-root 2>/dev/null

wp post create --post_type=formacion --post_title='Webinar: Novedades en Seguridad Social 2026' \
  --post_content='<p>Seminario online de 2 horas sobre las ultimas reformas en materia de Seguridad Social. Analizaremos los cambios en bases de cotizacion, prestaciones y el nuevo sistema de cotizacion por ingresos reales para autonomos.</p>' \
  --post_status=publish --post_excerpt='Repaso completo a las ultimas reformas de Seguridad Social y su impacto en el ambito laboral.' \
  --allow-root 2>/dev/null

wp post create --post_type=formacion --post_title='Curso de Mediacion y Arbitraje Laboral' \
  --post_content='<p>Curso presencial de 20 horas lectivas sobre mediacion y arbitraje en el ambito laboral. Habilitante para la inscripcion en el Registro de Mediadores del Ministerio de Justicia. Incluye practicas con casos reales y simulacion de sesiones de mediacion.</p>' \
  --post_status=publish --post_excerpt='Curso habilitante para mediacion laboral con practicas y simulacion de casos reales.' \
  --allow-root 2>/dev/null

wp post create --post_type=formacion --post_title='Taller: IA Aplicada al Ambito Laboral' \
  --post_content='<p>Taller practico de 4 horas sobre el uso de herramientas de inteligencia artificial en la gestion laboral. Aprende a utilizar IA para redaccion de contratos, analisis de convenios, calculo de indemnizaciones y mas.</p>' \
  --post_status=publish --post_excerpt='Taller practico sobre herramientas de IA para la gestion laboral diaria.' \
  --allow-root 2>/dev/null

wp post create --post_type=formacion --post_title='Masterclass: Tecnica Procesal ante la Jurisdiccion Social' \
  --post_content='<p>Masterclass de 6 horas impartida por magistrados del TSJ de Madrid. Analisis de las claves de la tecnica procesal, errores frecuentes, preparacion de juicio oral y recursos. Incluye sesion practica en la sala de simulacion de juicios.</p>' \
  --post_status=publish --post_excerpt='Claves de la tecnica procesal con magistrados del TSJ de Madrid y practica en sala de simulacion.' \
  --allow-root 2>/dev/null

echo "Formaciones created"

# ============================================================
# 3. EVENTOS (4 eventos)
# ============================================================

wp post create --post_type=evento --post_title='Asamblea General Ordinaria 2026' \
  --post_content='<p>Convocatoria de la Asamblea General Ordinaria del Colegio Oficial de Graduados Sociales de Madrid. Orden del dia: aprobacion de cuentas 2025, presupuestos 2026, memoria de actividades y ruegos y preguntas.</p>' \
  --post_status=publish --post_excerpt='Asamblea General Ordinaria del Colegio. Aprobacion de cuentas y presupuestos.' \
  --allow-root 2>/dev/null

wp post create --post_type=evento --post_title='Networking: Jovenes Graduados Sociales' \
  --post_content='<p>Encuentro informal para graduados sociales menores de 35 anos y precolegiados. Un espacio para compartir experiencias, generar contactos y conocer las oportunidades que ofrece el Colegio a las nuevas generaciones de profesionales.</p>' \
  --post_status=publish --post_excerpt='Encuentro para jovenes graduados sociales y precolegiados. Networking y oportunidades.' \
  --allow-root 2>/dev/null

wp post create --post_type=evento --post_title='Dia del Graduado Social 2026' \
  --post_content='<p>Celebracion del Dia del Graduado Social con acto institucional, entrega de insignias a los colegiados con 25 y 50 anos de colegiacion, y coctel. Acto abierto a todos los colegiados y sus acompanantes.</p>' \
  --post_status=publish --post_excerpt='Acto institucional, entrega de insignias y celebracion de la profesion.' \
  --allow-root 2>/dev/null

wp post create --post_type=evento --post_title='Conferencia: El Futuro del Trabajo en Espana' \
  --post_content='<p>Conferencia magistral a cargo de expertos en economia laboral, relaciones laborales y tecnologia. Debate sobre los retos del mercado de trabajo espanol en la proxima decada: automatizacion, teletrabajo, nuevas formas de empleo y proteccion social.</p>' \
  --post_status=publish --post_excerpt='Debate sobre automatizacion, teletrabajo y nuevas formas de empleo con expertos del sector.' \
  --allow-root 2>/dev/null

echo "Eventos created"

# ============================================================
# 4. JUNTA DE GOBIERNO (14 miembros)
# ============================================================

wp post create --post_type=miembro_junta --post_title='Teresa Silleras Martinez' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Manuel Rodriguez Noguera' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Amaya Segovia Mahillo' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Monica Esteban Amate' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Ana Maria Cerezo Rodriguez' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Jose Luis Perea Prieto' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Raul Bachot Ruiz' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Jose Antonio Juarez Rodriguez' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Juan Jose Carmelo Santana' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Maria Luisa Martin Bardera' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Elena Tolbanos Cobo' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Jose Carlos Astudillo Agudo' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Alvaro Rueda Sanchez' \
  --post_status=publish --allow-root 2>/dev/null

wp post create --post_type=miembro_junta --post_title='Francisco Javier Cerrajero Mendez' \
  --post_status=publish --allow-root 2>/dev/null

echo "Junta members created"

# ============================================================
# 5. CREATE WP MENU
# ============================================================

wp menu create "Menu Principal" --allow-root 2>/dev/null
wp menu location assign "Menu Principal" primary --allow-root 2>/dev/null

wp menu item add-custom "Menu Principal" "El Colegio" "/el-colegio" --allow-root 2>/dev/null
wp menu item add-custom "Menu Principal" "Hazte Colegiado" "/hazte-colegiado" --allow-root 2>/dev/null
wp menu item add-custom "Menu Principal" "Servicios" "/servicios-colegiado" --allow-root 2>/dev/null
wp menu item add-custom "Menu Principal" "Formacion" "/formacion-eventos" --allow-root 2>/dev/null
wp menu item add-custom "Menu Principal" "Eventos" "/eventos" --allow-root 2>/dev/null
wp menu item add-custom "Menu Principal" "Actualidad" "/actualidad" --allow-root 2>/dev/null
wp menu item add-custom "Menu Principal" "Directorio" "/directorio" --allow-root 2>/dev/null

echo "Menu created"

# ============================================================
# 6. SUMMARY
# ============================================================

echo "=== SEED COMPLETE ==="
wp post list --post_type=post --post_status=publish --fields=ID,post_title --allow-root 2>/dev/null | head -10
echo "---"
wp post list --post_type=formacion --post_status=publish --fields=ID,post_title --allow-root 2>/dev/null | head -10
echo "---"
wp post list --post_type=evento --post_status=publish --fields=ID,post_title --allow-root 2>/dev/null | head -10
echo "---"
wp post list --post_type=miembro_junta --post_status=publish --fields=ID,post_title --allow-root 2>/dev/null | head -20
echo "=== DONE ==="
