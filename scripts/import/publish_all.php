<?php
/**
 * Pasa a `publish` todos los CPT `profesional` con post_status='draft'
 * pertenecientes a un batch de import.
 *
 * Suprime emails (filtros wp_mail + remove_action sobre transition_post_status)
 * para no notificar a 1.138 colegiados.
 *
 * Uso:
 *   GSMADRID_BATCH_ID=<batch_id> wp eval-file publish_all.php
 *
 * Si no se pasa GSMADRID_BATCH_ID, actualiza TODOS los CPT profesional en draft
 * que estén vinculados a un user via _profesional_user_id (es decir, los del import).
 */

$batch_id = getenv('GSMADRID_BATCH_ID');

// ---- Email suppression ----
add_filter('wp_mail', function () { return false; }, 999);
remove_action('transition_post_status', 'gsmadrid_email_bienvenida_colegiado');
add_filter('send_password_change_email', '__return_false');
add_filter('send_email_change_email', '__return_false');

// ---- Selección de posts ----

$query_args = [
    'post_type'      => 'profesional',
    'post_status'    => 'draft',
    'posts_per_page' => -1,
    'fields'         => 'ids',
    // Solo CPTs vinculados a un user (los del import; ignora drafts huérfanos)
    'meta_query'     => [
        ['key' => '_profesional_user_id', 'compare' => 'EXISTS'],
    ],
];

if ($batch_id) {
    // Filtra por batch del import: cruza users con meta gsmadrid_import_batch=$batch_id
    $user_ids = get_users([
        'meta_key'   => 'gsmadrid_import_batch',
        'meta_value' => $batch_id,
        'fields'     => 'ID',
    ]);
    if (empty($user_ids)) {
        echo json_encode(['error' => "no users with batch=$batch_id"]) . "\n";
        exit(1);
    }
    $query_args['meta_query'][] = ['key' => '_profesional_user_id', 'value' => $user_ids, 'compare' => 'IN'];
}

$q = new WP_Query($query_args);
$post_ids = $q->posts;
$total = count($post_ids);

$updated = 0;
$errors = 0;
$started_at = microtime(true);

foreach ($post_ids as $post_id) {
    $result = wp_update_post([
        'ID'          => $post_id,
        'post_status' => 'publish',
    ], true);
    if (is_wp_error($result)) {
        $errors++;
    } else {
        $updated++;
    }
}

$total_ms = (int) ((microtime(true) - $started_at) * 1000);

echo json_encode([
    'total_candidates' => $total,
    'updated' => $updated,
    'errors' => $errors,
    'total_ms' => $total_ms,
    'batch_id' => $batch_id ?: '(all linked drafts)',
], JSON_PRETTY_PRINT) . "\n";

wp_cache_flush();
