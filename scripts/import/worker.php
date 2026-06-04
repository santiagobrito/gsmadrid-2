<?php
/**
 * Worker PHP para import de colegiados a WordPress (gsmadrid-2).
 *
 * Diseñado para ejecutarse DENTRO del container WP via:
 *   wp --allow-root --path=/code eval-file worker.php --batch=/path/to/batch.json --out=/path/to/results.json
 *
 * Para cada entry en el batch JSON:
 *   1. Verifica idempotencia (skip si col-{N} ya existe)
 *   2. Suprime emails (filtros + remove_action) para que el alta no notifique
 *   3. wp_insert_user con rol "profesional"
 *   4. El hook gsmadrid_link_user_profesional crea CPT en draft
 *   5. Sobreescribe ACF correctamente (el hook splittea mal el display_name)
 *   6. Setea user meta de tracking
 *
 * Output: JSON con summary + results por entry.
 */

// WP-CLI eval-file intercepts --flags, so we read paths from env vars instead.
$batch_path = getenv('GSMADRID_BATCH');
$out_path = getenv('GSMADRID_OUT');
if (!$batch_path || !$out_path) {
    fwrite(STDERR, "Usage: GSMADRID_BATCH=<path> GSMADRID_OUT=<path> wp eval-file worker.php\n");
    exit(1);
}
if (!file_exists($batch_path)) {
    fwrite(STDERR, "Batch file not found: $batch_path\n");
    exit(1);
}

$batch = json_decode(file_get_contents($batch_path), true);
if (!$batch || !isset($batch['entries']) || !is_array($batch['entries'])) {
    fwrite(STDERR, "Invalid batch JSON.\n");
    exit(1);
}

$batch_id = $batch['batch_id'] ?? date('Y-m-d_His');
$entries = $batch['entries'];

// ---- Email suppression ----
// Belt and suspenders: bloquear wp_mail global + quitar hooks del tema custom.
add_filter('wp_mail', function () { return false; }, 999);
remove_action('user_register', 'gsmadrid_email_bienvenida_precolegiado');
remove_action('transition_post_status', 'gsmadrid_email_bienvenida_colegiado');
// También por si hay otros hooks de notificación core de WP:
add_filter('send_password_change_email', '__return_false');
add_filter('send_email_change_email', '__return_false');

// ---- Helpers ----

function gen_password($len = 32) {
    $bytes = random_bytes($len);
    return rtrim(strtr(base64_encode($bytes), '+/', '-_'), '=');
}

function safe_str($v) {
    return is_string($v) ? trim($v) : '';
}

function classify_ejerciente($modalidad) {
    // EL / EE → true, NE / NU → false
    $m = strtoupper(safe_str($modalidad));
    if ($m === 'UN') $m = 'NU'; // typo fix
    return in_array($m, ['EL', 'EE'], true);
}

function normalize_modalidad($modalidad) {
    $m = strtoupper(safe_str($modalidad));
    if ($m === 'UN') return 'NU';
    return $m;
}

// ---- Main loop ----

$results = [];
$summary = ['created' => 0, 'skipped' => 0, 'errors' => 0];
$started_at = microtime(true);

foreach ($entries as $entry) {
    $t0 = microtime(true);
    $numero = safe_str($entry['numero_colegiado'] ?? '');
    $nombres = safe_str($entry['nombres'] ?? '');
    $apellidos = safe_str($entry['apellidos'] ?? '');
    $display_name = safe_str($entry['display_name'] ?? "$nombres $apellidos");
    $email = safe_str($entry['email'] ?? '');
    $email_estado = safe_str($entry['email_estado'] ?? '');
    $modalidad = normalize_modalidad($entry['modalidad'] ?? '');
    $ejerciente = classify_ejerciente($entry['modalidad'] ?? '');

    $row = [
        'numero_colegiado' => $numero,
        'login' => "col-$numero",
        'duration_ms' => 0,
    ];

    if (!$numero || !$nombres || !$apellidos) {
        $row['status'] = 'error';
        $row['reason'] = 'Missing required fields (numero/nombres/apellidos)';
        $summary['errors']++;
        $row['duration_ms'] = (int) ((microtime(true) - $t0) * 1000);
        $results[] = $row;
        continue;
    }

    $login = "col-$numero";

    // Idempotencia: skip si login ya existe
    $existing = get_user_by('login', $login);
    if ($existing) {
        $row['status'] = 'skipped';
        $row['reason'] = "user_login $login already exists";
        $row['user_id'] = (int) $existing->ID;
        $summary['skipped']++;
        $row['duration_ms'] = (int) ((microtime(true) - $t0) * 1000);
        $results[] = $row;
        continue;
    }

    // Si el email coincide con otra cuenta, también skip (no debería ocurrir con el CSV curado, pero por si acaso)
    if ($email && email_exists($email)) {
        $row['status'] = 'error';
        $row['reason'] = "email $email already used by another account";
        $summary['errors']++;
        $row['duration_ms'] = (int) ((microtime(true) - $t0) * 1000);
        $results[] = $row;
        continue;
    }

    // Crear user
    $user_id = wp_insert_user([
        'user_login'   => $login,
        'user_email'   => $email,
        'user_pass'    => gen_password(32),
        'display_name' => $display_name,
        'first_name'   => $nombres,
        'last_name'    => $apellidos,
        'role'         => 'profesional',
    ]);

    if (is_wp_error($user_id)) {
        $row['status'] = 'error';
        $row['reason'] = $user_id->get_error_message();
        $summary['errors']++;
        $row['duration_ms'] = (int) ((microtime(true) - $t0) * 1000);
        $results[] = $row;
        continue;
    }

    // El hook gsmadrid_link_user_profesional ya creó el CPT en draft.
    $post_id = (int) get_user_meta($user_id, '_profesional_post_id', true);

    if (!$post_id) {
        $row['status'] = 'error';
        $row['reason'] = 'CPT profesional no fue creado por el hook (?)';
        $row['user_id'] = $user_id;
        $summary['errors']++;
        $row['duration_ms'] = (int) ((microtime(true) - $t0) * 1000);
        $results[] = $row;
        continue;
    }

    // Sobreescribir ACF — el hook hizo split mal del display_name
    if (function_exists('update_field')) {
        update_field('nombre_completo', $nombres, $post_id);
        update_field('apellidos', $apellidos, $post_id);
        update_field('numero_colegiado', $numero, $post_id);
        update_field('email', $email, $post_id);
        update_field('ejerciente', $ejerciente, $post_id);
        update_field('visible_directorio', false, $post_id);
    }

    // Actualizar título del CPT para reflejar el display name correcto
    wp_update_post([
        'ID'         => $post_id,
        'post_title' => $display_name,
    ]);

    // User meta de tracking interno
    update_user_meta($user_id, 'gsmadrid_modalidad_original', $modalidad);
    update_user_meta($user_id, 'gsmadrid_email_estado', $email_estado);
    update_user_meta($user_id, 'gsmadrid_import_batch', $batch_id);
    update_user_meta($user_id, 'gsmadrid_perfil_completado', 0);

    $row['status'] = 'created';
    $row['user_id'] = $user_id;
    $row['post_id'] = $post_id;
    $row['ejerciente'] = $ejerciente;
    $row['modalidad'] = $modalidad;
    $summary['created']++;
    $row['duration_ms'] = (int) ((microtime(true) - $t0) * 1000);
    $results[] = $row;
}

$total_ms = (int) ((microtime(true) - $started_at) * 1000);

// Output JSON
$output = [
    'batch_id'    => $batch_id,
    'started_at'  => date('c'),
    'total_ms'    => $total_ms,
    'summary'     => $summary,
    'results'     => $results,
];

file_put_contents($out_path, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Echo summary to stdout for the orchestrator to see
echo json_encode($summary) . "\n";

// Flush WP cache so the next read sees fresh data
wp_cache_flush();
