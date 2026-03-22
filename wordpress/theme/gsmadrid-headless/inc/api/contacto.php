<?php
/**
 * REST API: POST /gsmadrid/v1/contacto
 * Handles contact form submissions with rate limiting and routing by subject
 */

add_action('rest_api_init', 'gsmadrid_register_contacto_route');

function gsmadrid_register_contacto_route() {
    register_rest_route('gsmadrid/v1', '/contacto', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_handle_contacto',
        'permission_callback' => '__return_true',
        'args' => [
            'nombre'   => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'email'    => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_email'],
            'telefono' => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'asunto'   => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'mensaje'  => ['required' => true, 'type' => 'string'],
        ],
    ]);
}

function gsmadrid_handle_contacto($request) {
    $params = $request->get_json_params();

    $nombre   = sanitize_text_field($params['nombre'] ?? '');
    $email    = sanitize_email($params['email'] ?? '');
    $telefono = sanitize_text_field($params['telefono'] ?? '');
    $asunto   = sanitize_text_field($params['asunto'] ?? '');
    $mensaje  = wp_kses_post($params['mensaje'] ?? '');

    if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Faltan campos obligatorios.'], 400);
    }
    if (!is_email($email)) {
        return new WP_REST_Response(['success' => false, 'message' => 'El email proporcionado no es valido.'], 400);
    }

    // Rate limiting (1 per email per 60s)
    $rate_key = 'contacto_' . md5($email);
    if (get_transient($rate_key)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Por favor, espera un momento antes de enviar otro mensaje.'], 429);
    }
    set_transient($rate_key, true, 60);

    $asuntoLabels = [
        'colegiacion' => 'Colegiacion', 'formacion' => 'Formacion',
        'sala-togas' => 'Sala de Togas', 'gestiones' => 'Gestiones', 'otros' => 'Otros',
    ];
    $asuntoLabel = $asuntoLabels[$asunto] ?? $asunto;

    // Route by subject
    $to = ($asunto === 'sala-togas') ? 'saladgraduados@graduadosocialmadrid.org' : 'admon@graduadosocialmadrid.org';

    $body = "Nuevo mensaje desde el formulario de contacto:\n\nNombre: {$nombre}\nEmail: {$email}\n";
    if ($telefono) $body .= "Telefono: {$telefono}\n";
    $body .= "Asunto: {$asuntoLabel}\n\nMensaje:\n{$mensaje}\n\n---\nEnviado desde: graduadosocialmadrid.org\nFecha: " . current_time('d/m/Y H:i') . "\n";

    wp_mail($to, "[Web CGSM] Contacto: {$asuntoLabel}", $body, ["Reply-To: {$nombre} <{$email}>"]);

    // Auto-reply
    $reply_body = "Estimado/a {$nombre},\n\nHemos recibido tu consulta sobre \"{$asuntoLabel}\" y la atenderemos lo antes posible.\n\n";
    $reply_body .= "Si tu consulta es urgente, te recomendamos llamarnos al 91 523 08 88.\n\n";
    $reply_body .= "Un saludo,\nColegio Oficial de Graduados Sociales de Madrid\nC/ Jose Abascal, 44 — 28003 Madrid\n";

    wp_mail($email, "Hemos recibido tu mensaje — CGSM", $reply_body, ['From: CGSM <admon@graduadosocialmadrid.org>']);

    return new WP_REST_Response(['success' => true, 'message' => 'Mensaje enviado correctamente.'], 200);
}
