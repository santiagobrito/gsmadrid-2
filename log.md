# Log de acciones — gsmadrid

Registro cronológico de acciones realizadas.

---

## 2026-06-04 — Import de colegiados: curado CSV + auditoría WP + script

**Qué se hizo:**

*Curado del censo*
- Recibido Excel "COLEGIADOS ACTUALIZADO JUNIO 2026" (1.138 graduados) de CGSM, convertido a CSV.
- Auditoría de calidad: 1.040 emails válidos, 19 inválidos (texto basura), 77 vacíos, 2 corporativos compartidos → 98 placeholders `col-{N}@gsmadrid.local`. 0 duplicados de nº colegiado/DNI.
- CSV curado generado: `data/clean/colegiados_clean.csv` (1.138 cuentas listas para import). Title case español con partículas (`de`, `del`, etc.) en minúscula, San/Santa en mayúscula, apellidos con guión correctos. Sin acentos (CSV original no los traía; el colegiado los corrige en onboarding).
- Lista `data/clean/colegiados_accion_manual.csv` (98 casos a contactar offline).
- Informe completo: `reports/colegiados_auditoria_2026-06-04.md`.

*Modalidades confirmadas por CGSM:*
- EL = Ejerciente Libre · EE = Ejerciente Empresa · NE = No Ejerciente · NU = Numerario (jubilado) · UN = typo de NU.
- Derivación `ejerciente` (ACF bool): EL/EE → true; NE/NU → false.

*Auditoría WP gsmadrid-2*
- WP 7.0, ACF Pro 6.7, WPGraphQL 2.13 (update 2.15 disponible), tema custom `gsmadrid-headless` v1.0.0.
- Modelo `profesional` ya montado: rol `profesional` + CPT con 18 campos ACF + vinculación bidireccional user↔CPT via meta `_profesional_post_id` / `_profesional_user_id`.
- Hook `gsmadrid_link_user_profesional` crea CPT en `draft` automáticamente al `user_register`. Hace split del display_name (split por primer espacio) — bug que sortearemos sobreescribiendo ACF después.
- Email de bienvenida (`gsmadrid_email_bienvenida_colegiado`) se dispara solo al pasar CPT a `publish`. Como nace en draft, **el import NO manda 1.138 emails**.
- Sistema auth tokens custom (`_gsmadrid_auth_token`, base64 userID:timestamp:hash, 7d expiry, rate-limit 5/5min) + 5 endpoints REST en `/wp-json/gsmadrid/v1/`.
- Snapshot del tema en `data/wp-theme-snapshot/` (no se commiteará).

*Backup ACF Field Groups (BD-only)*
- ACF JSON sync deshabilitado en `inc/acf.php`, carpeta `acf-json/` vacía → field groups solo en BD del WP. Si se reconstruye container sin restore SQL, se pierden.
- Exportados los 5 grupos via `scripts/import/export_acf.php` (usa `acf_prepare_field_group_for_export()` con env var ACF_OUT_DIR): `group_profesional` (18 campos), `group_formacion` (27), `group_evento` (14), `group_miembro_junta` (9), `group_post_extra` (4). Guardados en `data/wp-theme-snapshot/acf-json/`. Restorable via WP Admin → ACF → Tools → Import.

*Script de import*
- Anterior `scripts/import-colegiados.js` archivado como `.old` (renombrado y con API key limpiada — antes hardcoded; problemas: username=email, output a `/code/import-result.txt` accesible por HTTP público con passwords en plano, sin tracking meta, sin log estructurado).
- Nuevo en `scripts/import/`:
  - `import_colegiados.py` (orquestador local): dry-run por defecto, `--apply` y `--limit N`, idempotente por `user_login=col-{nº}`.
  - `worker.php` (corre dentro container): suprime emails (filtros + remove_action), crea user role `profesional`, espera CPT creado por hook, sobreescribe ACF con valores correctos del CSV, setea user meta de tracking (`gsmadrid_modalidad_original`, `gsmadrid_email_estado`, `gsmadrid_import_batch`, `gsmadrid_perfil_completado`).
- Dry-run verificado: 1.138 filas a crear, 0 conflictos.

**Por qué:**
La web está a punto de lanzarse. CGSM quiere que el censo de 1.138 colegiados quede importado como cuentas latentes en WP — sin directorio público todavía, sin notificar a nadie. Tras lanzamiento se hará una campaña dedicada para que cada colegiado active su cuenta y complete su perfil (foto, despacho, etc.).

**Resultado / impacto:**
- Tooling completo y reusable. Próxima sesión basta con `python3 scripts/import/import_colegiados.py --apply --limit 5` para test, luego sin `--limit` para batch completo.
- Backup ACF resuelve riesgo de pérdida si se reconstruye el container.
- `.gitignore` actualizado: `data/` bloqueado (datos personales no van a Git), `scripts/import/` añadido a allowlist.

**Pendiente / próximos pasos:**
- [interno] Ejecutar `--apply --limit 5` y validar a ojo en wp-admin: user existe, CPT en draft, ACF correctos, sin email enviado. Después batch completo.
- [interno] Confirmar formato definitivo del nº colegiado con CGSM ("85" puro vs "GD-85" como tenían los usuarios test). Asumido formato puro del censo.
- Diseñar flow de la campaña de invitación post-lanzamiento (no urge — semanas después del go-live).

---

## 2026-06-03 — Reset password WP admin (rotación seguridad)

**Qué se hizo:**
- Password `admin` de WP rotada vía `wp user update --user_pass` (ssh easypanel → `docker exec gsmadrid-2_wordpress.1.<id> wp ...`).
- Nueva pass guardada en `clientes/gsmadrid/.env` (vars `WP_USER` / `WP_PASS`).
- Memoria de proyecto actualizada con pointer (`reference_wp_admin.md` + índice).

**Por qué:**
La anterior (`18YUoqER5t4LBsH4K5Xk`) llevaba meses hardcoded en literal en `scripts/save-via-xmlrpc.js`, `fix-styles.js`, `inject-font-css.js`, `upload-batch.js`. Si esos scripts se hubieran filtrado (push accidental, screen share), la cuenta admin se abría. Pidió rotación tras detectarlo.

**Resultado / impacto:**
- Login verificado con curl: 302 + cookie `wordpress_logged_in` OK.
- Esos 4 scripts quedan rotos (literal viejo). No se refactorizó: cuando se vuelvan a necesitar, leer `WP_PASS` del `.env`.

**Pendiente:**
- (interno) Refactorizar scripts cuando se reutilicen — no antes (YAGNI; varios podrían no usarse más).

---

## 2026-06-03 — Reunión CGSM (Mónica + Carlos): cierre prelanzamiento web

**Acta completa:** [reuniones/2026-06-03-cgsm-web-prelanzamiento.md](reuniones/2026-06-03-cgsm-web-prelanzamiento.md)

**Asistentes:** Mónica Esteban (Asetra, lleva gestión CGSM), Carlos Ruiz (CGSM, formación), Santi. Juanjo Carmelo y Álvaro Rueda no se incorporaron. Antonio Izquierdo CC pero no asistió.

**Qué se decidió:**

*Lanzamiento*
- **Deadline duro: miércoles 10-jun** — fecha legal por Junta General (cuentas anuales tienen que estar disponibles a colegiados 8 días antes). Carlos planteó la fecha, Santi aceptó.
- Plan B explícito de Carlos si no llega: cuentas se envían por correo / suben a web actual. La nueva web NO bloquea la Junta.

*Cambios de contenido y datos (la mayoría triviales)*
- Cifras estáticas: pasar de "3000 colegiados" → **1124 graduados activos**; **70 años de historia**.
- Junta de Gobierno: Mónica pasa a Tesorera. Carlos enviará lista actualizada + fotos del proyecto Justicia Social.

*Directorio profesional (cambios estructurales)*
- Eliminar límite de 3 especialidades por perfil → **sin límite** (Carlos defendió que el ciudadano filtra → marcar todas no beneficia al colegiado generalista).
- Renombrar: "Nóminas y SS" → **"Gestión Laboral"**; "Derecho Laboral" → **"Asesoría Jurídico Laboral"**.
- Añadir especialidad: **Tráfico** (pidió Carlos).
- Localidad: cambiar desplegable cerrado → **campo libre** (hay colegiados en Canarias y municipios de Toledo/Guadalajara/Cuenca que no caben en los partidos judiciales prefijados).
- Estados de colegiación (gestionados solo por el colegio): **Ejerciente Libre / Ejerciente de Empresa / No Ejerciente / Numerarios** (jubilados). Carlos dudó incluir numerarios; Mónica forzó inclusión "mejor que sobre" — ganó Mónica.
- **SAJ** (Servicio Asistencia Jurídica Gratuita) y **Mediador**: NO son especialidades. Son flags SÍ/NO en ficha colegiado, gestionados por el colegio. NO aparecen en filtros públicos del buscador (uso interno para estadísticas y derivaciones).

*Pagos / Stripe*
- Migran de Typeform a integración Stripe nativa en la web (el botón de inscripción del formulario cobrará directo).
- Mónica/Carlos darán acceso a Santi como **"Desarrollador"** (no admin) en panel Stripe del colegio: Configuración → Equipo y Seguridad → Añadir miembro → rol Developer.
- Mónica pasará un formulario actual de Typeform para replicar campos.

*Datos de colegiados*
- Carlos/Mónica pasan **Excel con: nombre, apellido, DNI, número colegiado, email, estado, modalidad** lunes/martes (10 min de trabajo en su lado). Volcado a sistema → cada colegiado podrá entrar al área privada con esos datos y completar perfil.
- Tras lanzamiento: correo masivo a todos los colegiados invitando a acceder al área privada.

*Newsletter*
- Bloque actual de newsletter **se quita por ahora** (siguen usando proveedor externo). Posponer integración (Mailjet u otro) post-lanzamiento.

*Convenios*
- Reorganizar por categorías (seguros, financieros, tecnología, formación, movilidad) en lugar de retahíla de logos.
- Welcome Pack como subset. Recopilación sigue abierta (no bloquea 10-jun).

*Transparencia*
- Apartado "Memoria" debe pasar a **"Memoria y Cuentas Anuales"** en un mismo cajetín (cambio mínimo de label + estructura).
- Cuentas anuales 2025 + memoria se suben cuando estén aprobadas (esta semana).

*Cambio de dominio*
- Al activar la nueva: el dominio actual redirige automáticamente. Web antigua queda inoperativa.
- Santi pasará accesos al backend + sesión de formación / video corto para el equipo que cargará contenidos (noticias, formaciones, eventos).

*Mantenimiento*
- Santi enviará propuesta formal de hosting + mantenimiento técnico **en estos días**. Mónica aclaró que la **formación a colegiados** la harán internamente, no es parte de la cuota.

**Por qué importa:**
Sin la nueva web pública el 10, hay que improvisar la entrega de cuentas a colegiados → mala imagen institucional en vísperas de Junta. Aunque Carlos dio plan B, todos asumen que llegamos.

**Próximos pasos vinculantes para Santi:**
1. Aplicar cambios técnicos de directorio + cifras + Junta + transparencia + newsletter (esta semana).
2. Pedir Excel de colegiados lunes/martes para volcado.
3. Configurar Stripe live cuando Mónica habilite acceso developer.
4. Redactar propuesta de mantenimiento + hosting (pendiente, "estos días").
5. Grabar video / preparar sesión de formación de la herramienta.
6. Coordinar cutover de dominio + envío masivo invitación área privada.

**[interno] Crítica constructiva post-reunión:**

*Calificación global del rol de Santi:* **5/10** — ejecución técnica sólida, control comercial muy débil.

- **Ejecución técnica (8/10):** demo en vivo bien preparada, navegó la web mostrando cada sección, capturó cambios con precisión, propuso bien la transición Typeform → Stripe nativo.
- **Partner estratégico (4/10):** aceptó casi todas las peticiones del cliente sin contrapropuesta. Caso ejemplo — el límite de 3 especialidades lo había puesto él con razón válida ("para que todos no marquen todas para aparecer más"). Cuando Carlos pushó, cedió al primer comentario sin defender la decisión ni proponer una alternativa intermedia (ej. máximo 5, o "destacar" 3 con visualización distinta).
- **Control comercial (2/10):** ver detalle abajo.

*Dónde cedió donde tocaba poner fricción:*

1. **Mantenimiento sin pricing ni fecha** (00:56:43). Santi: *"eso también bueno se los pasaría en estos días. tampoco es urgente, pero pero es algo que sí que que va a estar que es opcional, no lo pueden hacer con otra empresa sin problema"*. Esa frase regaló dos cosas: (a) sin urgencia → la propuesta se demora indefinidamente; (b) decir "no problem si lo hacen con otros" antes de presentar precio = anchor cero. La propuesta hay que mandarla en 48h, con cifra concreta, deadline de respuesta antes del 10-jun (cutover del dominio depende de quién hostea), y explicación de qué cubre (que el cliente NO pueda imaginar que un competidor le da lo mismo más barato sin saber qué pierde).

2. **Formación regalada** (00:57:34). Mónica: *"Yo yo esa parte creo que tenemos que hacerla de manera interna porque si no claro..."*. Santi: *"Me parece mejor, ¿eh? Sí, porque es es claro y además que es super fácil de actualizar"*. Le dijo a la clienta que su producto es tan fácil que ella misma puede formar a su gente — auto-sabotaje comercial. Tocaba: *"Os dejo un onboarding de 2h grabado + 1 sesión Q&A en vivo, e incluido en la propuesta de mantenimiento. Después si queréis formar a más gente vosotros, perfecto."* — un onboarding pagado vale 250-500€ y reduce roundtrips de soporte después.

3. **Deadline imposible aceptada sin contingencia escrita** (00:55:15). Carlos puso 7 días. Santi: *"realmente de mi lado no lo veo tan complicado tampoco porque la web está hecha prácticamente son ajustes"*. Eso minimiza el alcance real: Stripe live + migración 1124 contactos + cambios de schema (especialidades, localidad libre, flags SAJ/Mediador, estados) + sección transparencia + cutover DNS + envío masivo. Tocaba: *"miércoles 10 SI me llega el Excel lunes y los accesos Stripe martes. Si no, jueves 11"*. Lo dijo después pero más como conversación que como condición contractual.

4. **"En el peor de los casos el área privada puede no funcionar"** (00:56:13). Santi mismo abrió esa puerta como mitigación. Mónica solo respondió "ok". Carlos no se enteró. Si llega el día y el área privada no funciona, la conversación va a ser muy distinta. **Mandar email post-reunión con scope cierto vs scope contingente** — Mónica ya acordó que ese degradado es aceptable, dejarlo por escrito para que Carlos no se sorprenda.

5. **Stripe — no preguntó por la cuenta**. Acordó rol "developer" pero no validó: ¿es cuenta nueva o existente? ¿modo test o live? ¿quién es responsable financiero del colegio para webhooks de disputes? La integración Stripe completa en 7 días sin haber visto el dashboard del colegio es una apuesta optimista.

6. **Numerarios — Carlos NO los quería, Mónica forzó** (00:23:26). Santi quedó con Mónica sin pedir aclaración. Carlos es quien cargará el Excel — su preferencia operativa vale. Punto menor, pero ejemplo de no preguntar "¿quién manda en esta decisión?" cuando hay desacuerdo entre dos personas del cliente.

*Lo que funcionó (replicar):*
- Demo en vivo, no slides. Mónica salió con sensación de control.
- Captura precisa de los 7+ cambios técnicos pedidos durante la llamada (los repitió en voz alta antes de cerrar cada bloque — eso evita malentendidos después).
- Acordó autonomía total para que el cliente edite contenido — reduce dependencia operativa futura, buena decisión.

*Patrón a vigilar:* baseline — es la primera reunión documentada con CGSM. Patrón candidato a confirmar en próximas: tendencia a aceptar deadlines con "ajustes menores, no es complicado". En Sistema Continuo y Holiday también ha aparecido. Si se repite con CGSM en próxima reunión, formalizar como anti-patrón en memoria global.

---

## 2026-05-13 — Heroes de landing pages: reemplazo de 10 imágenes estáticas + optimización

**Origen:** Santi quería renovar las imágenes hero de las landings de servicios. Pidió inventario primero, luego envió zip con 10 imágenes a reemplazar.

**Inventario de imágenes del sitio** (referencia para futuro):
- **Estáticas hardcoded** (en `frontend/public/images/`, 10 heroes + `teresa-silleras.jpg` + `logo.png`)
- **Partners** (`frontend/public/partners/`, 4 logos usados solo en clinica-juridica)
- **Editables vía WordPress** (miembro_junta featured, profesional ACF foto, post featured, formacion featured, evento featured) — NO tocar código, se editan en wp-admin
- **Placeholders SVG** (`/placeholder-{evento,formacion,news}.svg`) — fallbacks
- **Huérfanas detectadas**: `frontend/public/images/{hazte-colegiado-hero,precolegiados-hero}.jpg` (en disco, nadie las referencia — el código de `/hazte-colegiado/` y `/hazte-colegiado/precolegiados/` no monta hero image) + carpeta `frontend/public/junta/*` (~5 MB obsoleta, las fotos vienen de WP).

**Iteración aspect ratio:**
- Primer zip (`estaticas.zip`): 10 imágenes a 1200×675 (16:9). Pero las páginas usan `aspect-[4/3]` en el `<Image>` del hero → 16:9 se hubiera recortado. Avisé.
- Segundo zip (`Estaticas-web (1600 x 1200 px).zip`): 1600×1200 (4:3 correcto, ratio 1.333). Total 12 MB.

**Optimización con sharp:**
- 12 MB original era exceso para uso web (sources al ~95 quality). Sharp + mozjpeg quality 82 progressive → **1.8 MB total (-84%)** sin pérdida visual perceptible al tamaño renderizado.
- Comando: `sharp(src).jpeg({quality:82, mozjpeg:true, progressive:true}).toFile(dst)` — sharp viene en `frontend/node_modules/` por Next.js.
- Cliente recibe ~80-150 KB (Next.js convierte a WebP/AVIF on-demand). Repo gana 10+ MB de espacio limpio.

**Commit `4bfc752`:** Reemplazo de los 10 .jpg en `frontend/public/images/`. Trigger deploy. Verificado en producción (content-length: 191362 para colegiados-hero.jpg, last-modified de hoy).

**Limpieza:** Los 2 zips procesados + 3 directorios tmp eliminados de `~/CLAUDE/uploads/` y `/tmp/`.

---

## 2026-05-13 — Foto de Manuel Rodriguez Noguera no se actualizaba: diagnóstico WP vs frontend cache

**Reporte de Santi:** "Cambié la foto de Manuel desde el backend pero en frontend sigue la antigua".

**Diagnóstico** (patrón útil para futuros casos similares):
1. **Primero verificar qué devuelve la API WP**, no asumir caché frontend:
   ```bash
   curl -sS "<wp-domain>/wp-json/wp/v2/<cpt>?search=<nombre>&_embed" | python3 -m json.tool
   ```
2. Para Manuel (CPT `miembro_junta` ID 137): API devolvió `featured_media: 291` apuntando a la foto VIEJA de marzo. `post.modified: 2026-03-21` (no se modificó hoy).
3. Confirmé en `wp/v2/media` ordenado por fecha desc: única subida del día era **Javier Cerrajero**, no Manuel. Tampoco existía media nueva con "manuel" en el filename.
4. Headers de la imagen: `Last-Modified: 21 Mar 2026` → el archivo nunca fue sobreescrito en uploads.

**Conclusión:** No era caché del frontend ni de Next.js. El cambio nunca se guardó en WP. Posibles causas: olvido del botón "Actualizar", confusión de persona, o falló silenciosamente algún plugin.

**Lección:** Antes de tirarse al frontend buscando caché o problemas de fetch GraphQL, validar la fuente de verdad (WP REST API). Si la API ya devuelve el valor viejo, el problema está en WP, no en el frontend.

**Resolución:** Santi verificó en wp-admin que efectivamente no había guardado. Re-actualizó el campo. Frontend lo recogió en el siguiente revalidate (60s).

---

## 2026-05-13 — Alineación de tamaño de fotos en /el-colegio/junta-de-gobierno

**Reporte:** Las fotos de Vocales Ejercientes y No Ejercientes se veían demasiado pequeñas vs las de Equipo Directivo.

**Cambio (`687d45f`):** En `frontend/src/app/el-colegio/junta-de-gobierno/page.tsx`, en las secciones de Vocales (ejercientes + no ejercientes), igualar dimensiones:
- `<Image width={56} height={56}>` → `width={80} height={80}` (igual que Equipo Directivo)
- `className="h-14 w-14 ..."` → `"h-20 w-20 ..."`
- `<AvatarPlaceholder size="sm">` → `size="md"`

Deploy disparado. Verificación: 13 avatares en producción a 80×80 (1 presidenta + 3 directivos + 5 vocales ejercientes + 4 vocales no ejercientes).

---

## 2026-05-13 — Limpieza estructural del repo: line endings, gitignore allowlist, reorganización

**Origen:** Mientras iba a commitear el fix de 404 detecté que git status mostraba 170 archivos modificados, mayoría ruido CRLF↔LF, pero también mezclados con 79 deletions sin stagear y 87 untracked. El user pidió revisar uno por uno; con clasificación automática agrupé en bloques accionables.

**Auditoría inicial** (script de clasificación):
- 87 M (modificados): 84 solo line-endings, 3 cambios reales (`CLAUDE.md`, `frontend/next-env.d.ts`, `log.md`)
- 79 D (borrados sin stagear): 39 mocks + 17 del tema viejo (movido a /theme) + 5 scripts setup obsoletos + 5 reports + 5 logos + 6 root sueltos
- 87 ?? (untracked): 77 scripts throwaway (payloads, builders) + 4 theme/ + 1 assets/ + 4 reports/ + informe incidente

**Cambios (3 commits dedicados):**

`d465178` — Normalize line endings + scripts/ allowlist in gitignore:
- `.gitattributes` nuevo con `* text=auto eol=lf` + binarios explícitos
- `.gitignore` ampliado: `scripts/*` + `!scripts/<3 tools allowlist>` (deploy-auth-update.js, enable-wordfence-2fa.js, import-colegiados.js)
- Efecto inmediato: los 84 archivos de line-endings dejaron de aparecer modificados

`506534f` — Repository cleanup: 79 deletions + 10 nuevos archivos:
- Borrados: `Fotos-santi-mock/*` (39), `wordpress/theme/gsmadrid-headless/*` excepto `inc/auth.php` (17, tema movido a `/theme/`), 5 scripts setup obsoletos, 5 reports antiguos, 5 logos sueltos, 6 archivos root mock
- Añadidos: `/theme/` (tema WP relocalizado), `/assets/` (logos colaboradores incl. Banco Sabadell), `informe-incidente-seguridad-20260414.md`, reports actuales (manual estilo, propuesta mantenimiento)
- Renames detectados por git: `manual-estilo-web_2026-03-15.{html,md}` → `reports/`

`3bd76b6` — Update CLAUDE.md, log, next-env:
- `CLAUDE.md`: -253 +97 líneas, reemplaza versión inicial del scaffold por la operativa actual (datos, plataformas, stack, audiencias, agentes, reglas específicas)
- `log.md`: entradas del día
- `frontend/next-env.d.ts`: +1 línea autogen Next.js

**Lecciones aprendidas:**
- Al detectar diff masivo aparentemente "todo modificado", primero clasificar: comparar `git show HEAD:<file> | tr -d '\r'` vs `tr -d '\r' < <file>`. Si son iguales = solo line-endings = safe a renormalizar.
- `git diff --name-only -w` NO filtra archivos: lista cualquier archivo con diff aunque sea solo whitespace. Para detectar diferencias reales hay que comparar contenido normalizado a mano.
- `.gitattributes` con `eol=lf` no requiere convertir archivos en disco manualmente: git re-evalúa el status comparando contra contenido canonicalizado.
- Para evitar arrastrar ruido CRLF en commits parciales: `git restore <file>` + re-aplicar edits = diff limpio del cambio real.

**Deploy:** No requerido. Ninguno de los 5 commits cleanup toca código runtime del frontend (todo eran tooling/cleanup/docs).

---

## 2026-05-13 — Fix 404 en Hazte Colegiado: consolidación de rutas ejercientes

**Origen:** Santi reportó que `https://gsmadrid.uptomarketing.com/hazte-colegiado/ejercientes-libres` (y luego `/ejercientes-empresa`, `/no-ejercientes`) devolvían 404.

**Diagnóstico:** Las tres páginas **nunca existieron como archivo** en el repo (`git log --diff-filter=A` en esas rutas = 0 commits). Los enlaces vivían en `QuickAccess.tsx` (4 cards en la home) y `Footer.tsx`, pero no se construyeron las páginas destino. En el commit `3ea7479` (22-mar-2026) reconocí el problema y redirigí los CTAs dentro de `hazte-colegiado/page.tsx` a `/colegiados`, pero olvidé tocar `QuickAccess.tsx` y `Footer.tsx`, que seguían enlazando a las rutas muertas.

**Decisión:** Opción "limpiar primero". En lugar de crear las 3 páginas (más SEO pero más trabajo) o redirigir vía `next.config.ts`, consolidamos los 3 perfiles de ejerciente en la página única `/hazte-colegiado/colegiados` (que ya existe). Más honesto y elimina rot.

**Cambios:**
1. `frontend/src/components/sections/QuickAccess.tsx` — Array `paths` reducido de 4 a 2 entradas (`Colegiados` con badge "Mas comun", `Precolegiados`). Eliminados imports muertos `BookOpen`, `Scale`. Comentario `4 paths` → `2 paths`.
2. `frontend/src/components/layout/Footer.tsx` — Entrada `Ejercientes Libres → /hazte-colegiado/ejercientes-libres` renombrada a `Colegiados → /hazte-colegiado/colegiados` (mantiene paralelo con QuickAccess).

**Detalle técnico — line endings:** El repo tiene 170 archivos marcados como modificados por un problema CRLF↔LF (`git diff -w` confirma 0 diff de contenido en archivos no tocados). Para no arrastrar ~26000 líneas falsas al commit, restauré los 2 archivos con `git restore`, re-apliqué solo los cambios reales con Edit, y stagee solo esos 2 archivos. Commit final: 10 insertions / 22 deletions. **Pendiente:** decidir qué hacer con el ruido de line-endings global (normalizar via `.gitattributes` + `git add --renormalize` o ignorarlo).

**Verificación:**
- `tsc --noEmit` sin errores
- Post-deploy: home enlaza solo a `/hazte-colegiado`, `/hazte-colegiado/colegiados`, `/hazte-colegiado/precolegiados`
- Las 3 URLs viejas siguen 404 (esperado — desenlazadas, no creadas). Si Google las tiene indexadas o hay backlinks, conviene añadir redirects en `next.config.ts` o `middleware.ts`. **No hecho a propósito** — pendiente de decisión.

**Deploy:**
- Commit `9cf8c7d` push a `main` → trigger manual vía `services.app.deployService` sobre `gsmadrid-2/web` (autoDeploy=false). Build ~2 min.

**Iteración (mismo día):** El user pidió volver a 4 tarjetas con alturas iguales. Commit `f2a3aa1` revierte la consolidación a 2 tarjetas y restablece las 4 (Precolegiados, Ejercientes Libres, Ejercientes en Empresa, No Ejercientes). Para igualar alturas en el grid sm:grid-cols-2: `Link` ahora `group block h-full`, div interno `flex h-full flex-col`, y la línea "Ver requisitos" con `mt-auto pt-3` para anclarla al pie. Las 3 ejercientes apuntan a `/colegiados`, Precolegiados a su propia página. Deploy disparado y verificado.

**Redirects 301 (commit `ba6b11e`):** Añadidos en `frontend/next.config.ts` con `permanent: true` (Next.js usa 308, equivalente SEO). Cubre el caso de Google/backlinks externos con las URLs viejas indexadas. Verificado: `/ejercientes-libres`, `/ejercientes-empresa`, `/no-ejercientes` → 308 → `/colegiados`.

---

## 2026-05-13 — Limpieza de memoria de agentes stale

**Origen:** Auditando agent-memory aparecieron credenciales de un proyecto antiguo `graduados-sociales` (ya destruido en EasyPanel) y un password admin de WP (`18YUoqER5t4LBsH4K5Xk`) que Santi confirmó haber rotado.

**Cambios en `.claude/agent-memory/`:**
1. `easypanel-devops/project_graduados-sociales.md` → reemplazado por `project_gsmadrid-2.md` (passwords MariaDB actuales: user `4e5955ec5998980bcb97`, root `81a1a5e44ec0e4abd2f5`; modelo de persistencia verificado; baseline de seguridad post-incidente abril 2026).
2. `wordpress-tech-scaffold/project_graduados_sociales.md` → reemplazado por `project_gsmadrid-2.md` (sin admin pass; nota explícita de que el plugin stack puede haber driftado).
3. `elementor-designer/project_gsmadrid-homepage.md` → URLs corregidas (WP backend vs frontend Next.js), admin login pass eliminado, REST API App Password marcado como "needs verification".
4. Índices `MEMORY.md` actualizados en los 3 agentes.

**Verificación:** Volúmenes persistentes WP confirmados antes de la limpieza — el WordPress nativo de EasyPanel monta `/code` como bind-mount desde host (`/etc/easypanel/projects/gsmadrid-2/wordpress/code`). Sin riesgo de pérdida en rebuilds.

**Pendiente:** Añadir `.claude/agent-memory/` al `.gitignore` (el `.gitignore` está actualmente marcado como `deleted` en git status — incidencia separada).

---

## 2026-05-08 — Alta de Banco Sabadell como entidad colaboradora en /servicios-colegiado/acuerdos-convenios

**Origen:** Email de Carlos Ruiz (Director Institucional CGSM, formacion@graduadosocialmadrid.org) del 2026-04-29, reenviando petición de Marta Portilla (Banco Sabadell, Segmento Colectivos Profesionales) para colocar el logo "B Sabadell Professional" como entidad colaboradora con link al landing del convenio.

**Cambios:**
1. `frontend/public/images/colaboradores/banco-sabadell.png` — Logo PNG (164 KB) procedente del adjunto del correo. Original archivado en `assets/colaboradores/banco-sabadell-logo-2026-04-29.png`.
2. `frontend/src/app/servicios-colegiado/acuerdos-convenios/page.tsx` — Añadida nueva sección "Entidades colaboradoras" entre el bloque de Categorías y el de Highlights. Estructura `partners[]` extensible para sumar más logos cuando lleguen otros convenios. El link de Sabadell apunta a la URL exacta solicitada en el correo, abre en nueva pestaña con `rel="noopener noreferrer"`.

**Verificación:** `tsc --noEmit` sin errores.

**Deploy:**
- Push a `main` (commit `7d1dbb0`) y deploy disparado vía EasyPanel API (`services.app.deployService` sobre `gsmadrid-2/web`). `autoDeploy` está en false en EasyPanel — siempre hay que disparar manualmente.
- Verificado en producción: `https://gsmadrid.uptomarketing.com/servicios-colegiado/acuerdos-convenios` devuelve HTTP 200 con la nueva sección "Entidades colaboradoras" y el logo de Sabadell con el href correcto al landing del convenio.

**Lecciones / correcciones de memoria:**
- El proyecto en EasyPanel se llama `gsmadrid-2` (no `gsmadrid`) — coincide con el repo `santiagobrito/gsmadrid-2`.
- El dominio del frontend es `gsmadrid.uptomarketing.com` (no `graduados-sociales.uptomarketing.com` como decía el CLAUDE.md del cliente — ya corregido).
- `autoDeploy=false`: cada push a main requiere disparar deploy manualmente vía API o panel.

**Pendiente (no hecho a propósito):**
- Responder a Carlos Ruiz confirmando que la nueva web ya incluye Sabadell como entidad colaboradora. Si Banco Sabadell también necesita actualizar el banner en la web actual (graduadosocialmadrid.org, Joomla), eso lo gestiona el proveedor actual del Colegio — no nosotros.

---

## 2026-04-11 — Fix crash loop: standalone mode + timeout GraphQL

**Problema:** El contenedor `web` (Next.js) entraba en crash loop continuo con `ERR_HTTP_HEADERS_SENT` repetido. CPU al 200%.

**Causa raíz:** Mismatch entre `output: 'standalone'` en `next.config.ts` y `npm run start` (→ `next start`) en `nixpacks.toml`. Next.js advierte explícitamente que `next start` no funciona con `output: standalone`. El build servido era incompleto/corrupto, causando `TypeError: Cannot read properties of undefined` durante SSR streaming, que a su vez disparaba `ERR_HTTP_HEADERS_SENT` en cascada infinita.

**Cambios:**
1. `frontend/next.config.ts` — Eliminado `output: 'standalone'` (el deploy usa Nixpacks con `next start`, no el Dockerfile con `node server.js`)
2. `frontend/src/lib/graphql/client.ts` — Añadido timeout de 10s a cada request GraphQL para evitar fetches colgados si WordPress responde lento

**Nota:** El `Dockerfile` sigue existiendo con la config standalone por si se necesita en el futuro, pero el deploy activo usa `nixpacks.toml`.
