<?php
/**
 * Exporta cada ACF Field Group como JSON individual con su key como nombre de archivo,
 * en formato compatible con ACF Pro "Import" o sync via `acf-json/`.
 *
 * Uso (dentro del container WP):
 *   wp --allow-root --path=/code eval-file export_acf.php --out=/tmp/acf-export
 *
 * Output: un JSON por field group en --out=<dir>/group_<key>.json
 */

$out_dir = getenv('ACF_OUT_DIR');
if (!$out_dir) {
    fwrite(STDERR, "Usage: ACF_OUT_DIR=<dir> wp eval-file export_acf.php\n");
    exit(1);
}
if (!is_dir($out_dir)) mkdir($out_dir, 0755, true);

if (!function_exists('acf_get_field_groups')) {
    fwrite(STDERR, "ACF Pro no está activo o no se cargó.\n");
    exit(1);
}

$exported = [];
foreach (acf_get_field_groups() as $group) {
    // Hidrata fields (acf_get_field_groups no los incluye)
    $group['fields'] = acf_get_fields($group);

    // Usa la propia preparación de ACF Pro para export (formato compatible UI/JSON sync)
    $export = acf_prepare_field_group_for_export($group);

    $filename = sprintf('%s/%s.json', rtrim($out_dir, '/'), $export['key']);
    file_put_contents(
        $filename,
        json_encode($export, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
    );

    $exported[] = [
        'key'      => $export['key'],
        'title'    => $export['title'],
        'fields'   => count($export['fields'] ?? []),
        'filename' => basename($filename),
    ];
}

echo json_encode(['exported' => $exported, 'count' => count($exported)], JSON_PRETTY_PRINT) . "\n";
