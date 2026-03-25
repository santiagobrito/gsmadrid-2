<?php
/**
 * Admin panel: Inscripciones por formación/evento
 *
 * Layer 1: List of formaciones/eventos with inscription count
 * Layer 2: Detail view with all inscriptions for a specific formacion
 */

add_action('admin_menu', 'gsmadrid_inscripciones_menu');

function gsmadrid_inscripciones_menu() {
    add_menu_page(
        'Inscripciones',
        'Inscripciones',
        'edit_posts',
        'gsmadrid-inscripciones',
        'gsmadrid_inscripciones_page',
        'dashicons-clipboard',
        26
    );
}

/**
 * Router: shows detail if ?formacion_id is set, otherwise shows list.
 */
function gsmadrid_inscripciones_page() {
    $formacion_id = isset($_GET['formacion_id']) ? intval($_GET['formacion_id']) : 0;

    // CSV export
    if (isset($_GET['export_csv']) && $formacion_id) {
        gsmadrid_export_csv($formacion_id);
        return;
    }

    if ($formacion_id) {
        gsmadrid_inscripciones_detail($formacion_id);
    } else {
        gsmadrid_inscripciones_list();
    }
}

/**
 * Layer 1: List of formaciones/eventos with inscription counts
 */
function gsmadrid_inscripciones_list() {
    global $wpdb;

    // Get all formaciones and eventos that have inscriptions
    $post_types = ['formacion', 'evento', 'curso'];
    $placeholders = implode(',', array_fill(0, count($post_types), '%s'));

    $posts = $wpdb->get_results($wpdb->prepare(
        "SELECT p.ID, p.post_title, p.post_type, p.post_status, p.post_date,
                pm.meta_value as inscripciones_raw
         FROM {$wpdb->posts} p
         LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_inscripciones'
         WHERE p.post_type IN ($placeholders)
         AND p.post_status IN ('publish', 'draft', 'private')
         ORDER BY p.post_date DESC",
        ...$post_types
    ));

    ?>
    <div class="wrap">
        <h1>Inscripciones</h1>
        <p class="description">Selecciona una formación o evento para ver sus inscripciones.</p>

        <table class="wp-list-table widefat fixed striped" style="margin-top: 20px;">
            <thead>
                <tr>
                    <th style="width: 40%;">Formación / Evento</th>
                    <th style="width: 10%;">Tipo</th>
                    <th style="width: 10%;">Estado</th>
                    <th style="width: 10%;">Inscritos</th>
                    <th style="width: 10%;">Pagados</th>
                    <th style="width: 10%;">Pendientes</th>
                    <th style="width: 10%;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $has_any = false;
                foreach ($posts as $post) {
                    $inscripciones = maybe_unserialize($post->inscripciones_raw);
                    if (!is_array($inscripciones)) $inscripciones = [];
                    $total = count($inscripciones);

                    // Skip posts with no inscriptions unless they're published formaciones
                    if ($total === 0 && $post->post_type !== 'formacion') continue;

                    $has_any = true;
                    $pagados = 0;
                    $pendientes = 0;
                    $confirmados = 0;
                    foreach ($inscripciones as $insc) {
                        $estado = $insc['estado'] ?? 'pendiente';
                        if ($estado === 'pagado') $pagados++;
                        elseif ($estado === 'pendiente_pago') $pendientes++;
                        else $confirmados++;
                    }

                    $type_label = $post->post_type === 'evento' ? 'Evento' : 'Formación';
                    $type_color = $post->post_type === 'evento' ? '#8B5CF6' : '#2563EB';
                    $detail_url = admin_url('admin.php?page=gsmadrid-inscripciones&formacion_id=' . $post->ID);
                    ?>
                    <tr>
                        <td>
                            <a href="<?php echo esc_url($detail_url); ?>" style="font-weight: 600; font-size: 14px;">
                                <?php echo esc_html($post->post_title); ?>
                            </a>
                            <div style="color: #6B7280; font-size: 12px; margin-top: 2px;">
                                <?php echo date('d/m/Y', strtotime($post->post_date)); ?>
                            </div>
                        </td>
                        <td>
                            <span style="background: <?php echo $type_color; ?>15; color: <?php echo $type_color; ?>; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                                <?php echo $type_label; ?>
                            </span>
                        </td>
                        <td>
                            <span style="background: <?php echo $post->post_status === 'publish' ? '#DEF7EC' : '#FEF3C7'; ?>; color: <?php echo $post->post_status === 'publish' ? '#03543F' : '#92400E'; ?>; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                                <?php echo $post->post_status === 'publish' ? 'Publicado' : ucfirst($post->post_status); ?>
                            </span>
                        </td>
                        <td style="font-weight: 700; font-size: 16px;"><?php echo $total; ?></td>
                        <td>
                            <?php if ($pagados > 0): ?>
                                <span style="color: #059669; font-weight: 600;"><?php echo $pagados; ?></span>
                            <?php else: ?>
                                <span style="color: #9CA3AF;">0</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($pendientes > 0): ?>
                                <span style="color: #D97706; font-weight: 600;"><?php echo $pendientes; ?></span>
                            <?php else: ?>
                                <span style="color: #9CA3AF;">0</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <a href="<?php echo esc_url($detail_url); ?>" class="button button-small">Ver</a>
                        </td>
                    </tr>
                    <?php
                }

                if (!$has_any) {
                    echo '<tr><td colspan="7" style="text-align: center; padding: 40px; color: #9CA3AF;">No hay formaciones o eventos creados.</td></tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

/**
 * Layer 2: Detail view — all inscriptions for a specific formacion/evento
 */
function gsmadrid_inscripciones_detail($formacion_id) {
    $post = get_post($formacion_id);
    if (!$post) {
        echo '<div class="wrap"><h1>No encontrado</h1></div>';
        return;
    }

    $inscripciones = get_post_meta($formacion_id, '_inscripciones', true);
    if (!is_array($inscripciones)) $inscripciones = [];

    $total = count($inscripciones);
    $total_pagado = 0;
    $total_pendiente = 0;
    $total_confirmado = 0;
    $ingresos = 0;

    foreach ($inscripciones as $insc) {
        $estado = $insc['estado'] ?? 'pendiente';
        $precio = floatval($insc['precio'] ?? 0);
        if ($estado === 'pagado') { $total_pagado++; $ingresos += $precio; }
        elseif ($estado === 'pendiente_pago') $total_pendiente++;
        else $total_confirmado++;
    }

    $list_url = admin_url('admin.php?page=gsmadrid-inscripciones');
    $csv_url  = admin_url('admin.php?page=gsmadrid-inscripciones&formacion_id=' . $formacion_id . '&export_csv=1');

    ?>
    <div class="wrap">
        <h1>
            <a href="<?php echo esc_url($list_url); ?>" style="text-decoration: none; color: #6B7280;">&larr; Inscripciones</a>
            &nbsp;/&nbsp;
            <?php echo esc_html($post->post_title); ?>
        </h1>

        <!-- Stats cards -->
        <div style="display: flex; gap: 16px; margin: 20px 0;">
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; flex: 1; text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: #1F2937;"><?php echo $total; ?></div>
                <div style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Total inscritos</div>
            </div>
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; flex: 1; text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: #059669;"><?php echo $total_pagado; ?></div>
                <div style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Pagados</div>
            </div>
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; flex: 1; text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: #D97706;"><?php echo $total_pendiente; ?></div>
                <div style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Pago pendiente</div>
            </div>
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; flex: 1; text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: #2563EB;"><?php echo $total_confirmado; ?></div>
                <div style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Confirmados (gratis)</div>
            </div>
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px; flex: 1; text-align: center;">
                <div style="font-size: 28px; font-weight: 800; color: #1F2937;"><?php echo number_format($ingresos, 2, ',', '.'); ?> &euro;</div>
                <div style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Ingresos</div>
            </div>
        </div>

        <!-- Actions -->
        <div style="margin-bottom: 16px;">
            <?php if ($total > 0): ?>
                <a href="<?php echo esc_url($csv_url); ?>" class="button button-primary">Exportar CSV</a>
            <?php endif; ?>
            <a href="<?php echo esc_url(get_edit_post_link($formacion_id)); ?>" class="button">Editar formación</a>
        </div>

        <!-- Inscriptions table -->
        <?php if ($total === 0): ?>
            <div style="text-align: center; padding: 60px; color: #9CA3AF; background: white; border: 1px solid #E5E7EB; border-radius: 12px;">
                <p style="font-size: 16px;">No hay inscripciones para esta formación.</p>
            </div>
        <?php else: ?>
            <table class="wp-list-table widefat fixed striped" style="background: white;">
                <thead>
                    <tr>
                        <th style="width: 5%;">#</th>
                        <th style="width: 18%;">Nombre</th>
                        <th style="width: 18%;">Email</th>
                        <th style="width: 10%;">Perfil</th>
                        <th style="width: 8%;">N.° Col.</th>
                        <th style="width: 10%;">Modalidad</th>
                        <th style="width: 8%;">Precio</th>
                        <th style="width: 10%;">Estado</th>
                        <th style="width: 13%;">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($inscripciones as $i => $insc):
                        $estado = $insc['estado'] ?? 'pendiente';
                        $precio = floatval($insc['precio'] ?? 0);

                        $estado_colors = [
                            'pagado'         => ['bg' => '#DEF7EC', 'text' => '#03543F', 'label' => 'Pagado'],
                            'pendiente_pago' => ['bg' => '#FEF3C7', 'text' => '#92400E', 'label' => 'Pago pendiente'],
                            'confirmado'     => ['bg' => '#DBEAFE', 'text' => '#1E40AF', 'label' => 'Confirmado'],
                            'pendiente'      => ['bg' => '#F3F4F6', 'text' => '#4B5563', 'label' => 'Pendiente'],
                        ];
                        $ec = $estado_colors[$estado] ?? $estado_colors['pendiente'];

                        $perfil_labels = [
                            'colegiado'    => 'Colegiado',
                            'precolegiado' => 'Pre-colegiado',
                            'externo'      => 'Externo',
                        ];
                        $perfil_label = $perfil_labels[$insc['perfil'] ?? ''] ?? ucfirst($insc['perfil'] ?? '');
                    ?>
                    <tr>
                        <td style="color: #9CA3AF;"><?php echo $i + 1; ?></td>
                        <td style="font-weight: 600;"><?php echo esc_html($insc['nombre'] ?? ''); ?></td>
                        <td>
                            <a href="mailto:<?php echo esc_attr($insc['email'] ?? ''); ?>" style="color: #2563EB;">
                                <?php echo esc_html($insc['email'] ?? ''); ?>
                            </a>
                        </td>
                        <td><?php echo esc_html($perfil_label); ?></td>
                        <td><?php echo esc_html($insc['numero_colegiado'] ?? '—'); ?></td>
                        <td><?php echo esc_html(ucfirst($insc['modalidad'] ?? 'presencial')); ?></td>
                        <td>
                            <?php echo $precio > 0 ? number_format($precio, 2, ',', '.') . ' €' : '<span style="color:#059669;">Gratis</span>'; ?>
                        </td>
                        <td>
                            <span style="background: <?php echo $ec['bg']; ?>; color: <?php echo $ec['text']; ?>; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap;">
                                <?php echo $ec['label']; ?>
                            </span>
                        </td>
                        <td style="font-size: 12px; color: #6B7280;">
                            <?php echo isset($insc['fecha']) ? date('d/m/Y H:i', strtotime($insc['fecha'])) : '—'; ?>
                            <?php if ($estado === 'pagado' && !empty($insc['fecha_pago'])): ?>
                                <br><span style="color: #059669;">Pagado: <?php echo date('d/m/Y H:i', strtotime($insc['fecha_pago'])); ?></span>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * CSV export for a specific formacion's inscriptions
 */
function gsmadrid_export_csv($formacion_id) {
    $post = get_post($formacion_id);
    if (!$post) return;

    $inscripciones = get_post_meta($formacion_id, '_inscripciones', true);
    if (!is_array($inscripciones)) $inscripciones = [];

    $filename = 'inscripciones-' . sanitize_title($post->post_title) . '-' . date('Y-m-d') . '.csv';

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . $filename);

    $output = fopen('php://output', 'w');
    // BOM for Excel UTF-8
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    fputcsv($output, ['#', 'Nombre', 'Email', 'Teléfono', 'Perfil', 'N.° Colegiado', 'Empresa', 'Modalidad', 'Precio', 'Estado', 'Fecha inscripción', 'Fecha pago'], ';');

    foreach ($inscripciones as $i => $insc) {
        $estado_labels = [
            'pagado' => 'Pagado', 'pendiente_pago' => 'Pago pendiente',
            'confirmado' => 'Confirmado', 'pendiente' => 'Pendiente',
        ];
        fputcsv($output, [
            $i + 1,
            $insc['nombre'] ?? '',
            $insc['email'] ?? '',
            $insc['telefono'] ?? '',
            ucfirst($insc['perfil'] ?? ''),
            $insc['numero_colegiado'] ?? '',
            $insc['empresa'] ?? '',
            ucfirst($insc['modalidad'] ?? 'presencial'),
            isset($insc['precio']) ? number_format(floatval($insc['precio']), 2, ',', '.') . ' €' : 'Gratis',
            $estado_labels[$insc['estado'] ?? 'pendiente'] ?? ucfirst($insc['estado'] ?? ''),
            isset($insc['fecha']) ? date('d/m/Y H:i', strtotime($insc['fecha'])) : '',
            !empty($insc['fecha_pago']) ? date('d/m/Y H:i', strtotime($insc['fecha_pago'])) : '',
        ], ';');
    }

    fclose($output);
    exit;
}
