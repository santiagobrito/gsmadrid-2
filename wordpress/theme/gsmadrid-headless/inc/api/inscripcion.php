<?php
/**
 * REST API: POST /gsmadrid/v1/inscripcion
 * Handles training/event inscription form submissions
 */

add_action('rest_api_init', 'gsmadrid_register_inscripcion_route');

function gsmadrid_register_inscripcion_route() {
    // Seats availability check
    register_rest_route('gsmadrid/v1', '/plazas', [
        'methods'             => 'GET',
        'callback'            => 'gsmadrid_check_plazas',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('gsmadrid/v1', '/inscripcion', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_handle_inscripcion',
        'permission_callback' => '__return_true',
        'args' => [
            'formacion_slug'   => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'perfil'           => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'nombre'           => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'email'            => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_email'],
            'telefono'         => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'empresa'          => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'numero_colegiado' => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'modalidad'        => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'precio'           => ['required' => false, 'type' => 'number'],
        ],
    ]);
}

function gsmadrid_check_plazas($request) {
    $slug = sanitize_text_field($request->get_param('slug'));
    if (!$slug) return new WP_REST_Response(['success' => false], 400);

    $post = get_page_by_path($slug, OBJECT, ['formacion', 'evento', 'curso']);
    if (!$post) return new WP_REST_Response(['success' => false], 404);

    $plazas_total = function_exists('get_field') ? intval(get_field('plazas', $post->ID)) : 0;
    $inscripciones = get_post_meta($post->ID, '_inscripciones', true);
    $inscritos = is_array($inscripciones) ? count($inscripciones) : 0;
    $restantes = $plazas_total > 0 ? max(0, $plazas_total - $inscritos) : null;

    return new WP_REST_Response([
        'success'    => true,
        'total'      => $plazas_total,
        'inscritos'  => $inscritos,
        'restantes'  => $restantes,
    ], 200);
}

function gsmadrid_handle_inscripcion($request) {
    $params = $request->get_json_params();

    $formacion_slug   = sanitize_text_field($params['formacion_slug'] ?? '');
    $perfil           = sanitize_text_field($params['perfil'] ?? '');
    $nombre           = sanitize_text_field($params['nombre'] ?? '');
    $email            = sanitize_email($params['email'] ?? '');
    $telefono         = sanitize_text_field($params['telefono'] ?? '');
    $empresa          = sanitize_text_field($params['empresa'] ?? '');
    $numero_colegiado = sanitize_text_field($params['numero_colegiado'] ?? '');
    $modalidad        = sanitize_text_field($params['modalidad'] ?? 'presencial');
    $precio           = floatval($params['precio'] ?? 0);

    if (empty($formacion_slug) || empty($perfil) || empty($nombre) || empty($email)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Faltan campos obligatorios.'], 400);
    }
    if (!is_email($email)) {
        return new WP_REST_Response(['success' => false, 'message' => 'El email proporcionado no es valido.'], 400);
    }

    $formacion_post = get_page_by_path($formacion_slug, OBJECT, ['formacion', 'evento', 'curso']);
    $formacion_title = $formacion_post ? $formacion_post->post_title : $formacion_slug;
    $formacion_id = $formacion_post ? $formacion_post->ID : 0;

    if ($formacion_id) {
        $inscripciones = get_post_meta($formacion_id, '_inscripciones', true);
        if (!is_array($inscripciones)) $inscripciones = [];

        // Check duplicate
        foreach ($inscripciones as $insc) {
            if (isset($insc['email']) && $insc['email'] === $email) {
                return new WP_REST_Response(['success' => false, 'message' => 'Ya existe una inscripcion con este email.'], 409);
            }
        }

        // Check available seats
        $plazas_total = 0;
        if (function_exists('get_field')) {
            $plazas_total = intval(get_field('plazas', $formacion_id));
        }
        if ($plazas_total > 0) {
            $inscritos = count($inscripciones);
            if ($inscritos >= $plazas_total) {
                // Auto-set estado to completa
                if (function_exists('update_field')) {
                    update_field('estado', 'completa', $formacion_id);
                }
                return new WP_REST_Response(['success' => false, 'message' => 'Lo sentimos, no quedan plazas disponibles.'], 409);
            }
        }

        $inscripciones[] = [
            'nombre' => $nombre, 'email' => $email, 'telefono' => $telefono,
            'empresa' => $empresa, 'perfil' => $perfil, 'numero_colegiado' => $numero_colegiado,
            'modalidad' => $modalidad, 'precio' => $precio,
            'fecha' => current_time('mysql'),
            'estado' => ($precio > 0) ? 'pendiente_pago' : 'confirmado',
        ];
        update_post_meta($formacion_id, '_inscripciones', $inscripciones);

        // Update remaining seats count and auto-close if full
        if ($plazas_total > 0) {
            $plazas_restantes = $plazas_total - count($inscripciones);
            if ($plazas_restantes <= 0 && function_exists('update_field')) {
                update_field('estado', 'completa', $formacion_id);
            }
        }
    }

    // Emails
    $perfilLabel = ucfirst($perfil);
    $precioLabel = $precio > 0 ? "{$precio} EUR" : 'Gratuito';

    $admin_body = "Nueva inscripcion recibida:\n\nFormacion: {$formacion_title}\nNombre: {$nombre}\nEmail: {$email}\n";
    if ($telefono) $admin_body .= "Telefono: {$telefono}\n";
    $admin_body .= "Perfil: {$perfilLabel}\n";
    if ($numero_colegiado) $admin_body .= "N. Colegiado: {$numero_colegiado}\n";
    if ($empresa) $admin_body .= "Empresa: {$empresa}\n";
    $admin_body .= "Modalidad: {$modalidad}\nPrecio: {$precioLabel}\nFecha: " . current_time('d/m/Y H:i') . "\n";

    wp_mail(get_option('admin_email'), "[CGSM] Nueva inscripcion: {$formacion_title}", $admin_body);
    wp_mail('admon@graduadosocialmadrid.org', "[CGSM] Nueva inscripcion: {$formacion_title}", $admin_body);

    $user_body = "Estimado/a {$nombre},\n\nSu inscripcion ha sido registrada correctamente.\n\n";
    $user_body .= "- Actividad: {$formacion_title}\n- Modalidad: {$modalidad}\n- Perfil: {$perfilLabel}\n- Importe: {$precioLabel}\n\n";
    if ($precio > 0) $user_body .= "Recibira las instrucciones de pago por email en las proximas 24 horas habiles.\n\n";
    $user_body .= "Un saludo,\nColegio Oficial de Graduados Sociales de Madrid\nC/ Jose Abascal, 44 — 28003 Madrid\nTel: 91 523 08 88\n";

    wp_mail($email, "Confirmacion de inscripcion — {$formacion_title}", $user_body, ['From: CGSM <admon@graduadosocialmadrid.org>']);

    return new WP_REST_Response([
        'success'        => true,
        'message'        => 'Inscripcion registrada correctamente.',
        'requires_payment' => $precio > 0,
    ], 200);
}
