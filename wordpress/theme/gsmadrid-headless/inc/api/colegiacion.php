<?php
/**
 * REST API: POST /gsmadrid/v1/colegiacion
 * Handles colegiation request form submissions
 */

add_action('rest_api_init', 'gsmadrid_register_colegiacion_route');

function gsmadrid_register_colegiacion_route() {
    register_rest_route('gsmadrid/v1', '/colegiacion', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_handle_colegiacion',
        'permission_callback' => '__return_true',
    ]);
}

function gsmadrid_handle_colegiacion($request) {
    $params = $request->get_json_params();

    $tipo        = sanitize_text_field($params['tipo'] ?? '');
    $nombre      = sanitize_text_field($params['nombre'] ?? '');
    $apellidos   = sanitize_text_field($params['apellidos'] ?? '');
    $email       = sanitize_email($params['email'] ?? '');
    $telefono    = sanitize_text_field($params['telefono'] ?? '');
    $universidad = sanitize_text_field($params['universidad'] ?? '');
    $titulacion  = sanitize_text_field($params['titulacion'] ?? '');
    $mensaje     = wp_kses_post($params['mensaje'] ?? '');

    if (empty($nombre) || empty($apellidos) || empty($email) || empty($tipo)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Faltan campos obligatorios.'], 400);
    }
    if (!is_email($email)) {
        return new WP_REST_Response(['success' => false, 'message' => 'El email proporcionado no es valido.'], 400);
    }

    // Rate limiting (1 per email per hour)
    $rate_key = 'colegiacion_' . md5($email);
    if (get_transient($rate_key)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Ya hemos recibido tu solicitud. Te contactaremos pronto.'], 429);
    }
    set_transient($rate_key, true, 3600);

    $tipoLabels = [
        'precolegiado'       => 'Precolegiado (Estudiante)',
        'ejerciente-libre'   => 'Ejerciente Libre',
        'ejerciente-empresa' => 'Ejerciente en Empresa',
        'no-ejerciente'      => 'No Ejerciente',
    ];
    $tipoLabel = $tipoLabels[$tipo] ?? $tipo;

    $body = "Nueva solicitud de colegiacion:\n\nTipo: {$tipoLabel}\nNombre: {$nombre} {$apellidos}\nEmail: {$email}\n";
    if ($telefono) $body .= "Telefono: {$telefono}\n";
    if ($universidad) $body .= "Universidad: {$universidad}\n";
    if ($titulacion) $body .= "Titulacion: {$titulacion}\n";
    if ($mensaje) $body .= "Mensaje: {$mensaje}\n";
    $body .= "\nFecha: " . current_time('d/m/Y H:i') . "\n";

    $admin_headers = ["Reply-To: {$nombre} {$apellidos} <{$email}>"];
    wp_mail('admon@graduadosocialmadrid.org', "[CGSM] Solicitud de colegiacion: {$tipoLabel}", $body, $admin_headers);
    wp_mail(get_option('admin_email'), "[CGSM] Solicitud de colegiacion: {$tipoLabel}", $body, $admin_headers);

    $reply_body = "Estimado/a {$nombre},\n\nHemos recibido tu solicitud de colegiacion como {$tipoLabel}.\n\n";
    $reply_body .= "Nuestro equipo revisara tu solicitud y se pondra en contacto contigo para indicarte los siguientes pasos y la documentacion necesaria.\n\n";
    $reply_body .= "Si tienes alguna duda, puedes llamarnos al 91 523 08 88.\n\n";
    $reply_body .= "Un saludo,\nColegio Oficial de Graduados Sociales de Madrid\nC/ Jose Abascal, 44 — 28003 Madrid\n";

    wp_mail($email, "Hemos recibido tu solicitud de colegiacion — CGSM", $reply_body, ['From: CGSM <admon@graduadosocialmadrid.org>']);

    return new WP_REST_Response(['success' => true, 'message' => 'Solicitud enviada correctamente. Te contactaremos pronto.'], 200);
}
