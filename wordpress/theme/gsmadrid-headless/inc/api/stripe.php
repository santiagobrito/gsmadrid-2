<?php
/**
 * REST API: Stripe Checkout integration
 *
 * POST /gsmadrid/v1/stripe/create-session  — Create Stripe Checkout session
 * POST /gsmadrid/v1/stripe/webhook         — Handle Stripe webhook (payment confirmation)
 * GET  /gsmadrid/v1/stripe/status           — Check payment status for an inscription
 *
 * Requires STRIPE_SECRET_KEY defined as WP option or constant.
 */

add_action('rest_api_init', 'gsmadrid_register_stripe_routes');

function gsmadrid_register_stripe_routes() {
    register_rest_route('gsmadrid/v1', '/stripe/create-session', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_stripe_create_session',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('gsmadrid/v1', '/stripe/webhook', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_stripe_webhook',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('gsmadrid/v1', '/stripe/status', [
        'methods'             => 'GET',
        'callback'            => 'gsmadrid_stripe_status',
        'permission_callback' => '__return_true',
    ]);
}

/**
 * Get Stripe secret key from constant, option, or env.
 */
function gsmadrid_get_stripe_key() {
    if (defined('STRIPE_SECRET_KEY')) return STRIPE_SECRET_KEY;
    $key = get_option('gsmadrid_stripe_secret_key', '');
    if ($key) return $key;
    return getenv('STRIPE_SECRET_KEY') ?: '';
}

/**
 * Make a request to the Stripe API.
 */
function gsmadrid_stripe_request($endpoint, $body = [], $method = 'POST') {
    $secret = gsmadrid_get_stripe_key();
    if (!$secret) return new WP_Error('stripe_no_key', 'Stripe secret key not configured.');

    $args = [
        'method'  => $method,
        'headers' => [
            'Authorization' => 'Bearer ' . $secret,
            'Content-Type'  => 'application/x-www-form-urlencoded',
        ],
        'timeout' => 30,
    ];

    if ($method === 'POST' && !empty($body)) {
        $args['body'] = $body;
    }

    $response = wp_remote_request('https://api.stripe.com/v1/' . $endpoint, $args);

    if (is_wp_error($response)) return $response;

    $status = wp_remote_retrieve_response_code($response);
    $data   = json_decode(wp_remote_retrieve_body($response), true);

    if ($status >= 400) {
        $msg = $data['error']['message'] ?? 'Stripe API error';
        return new WP_Error('stripe_error', $msg, ['status' => $status]);
    }

    return $data;
}

/**
 * POST /stripe/create-session
 *
 * Creates a Stripe Checkout session for an inscription.
 * Called after the inscription is saved with estado=pendiente_pago.
 */
function gsmadrid_stripe_create_session($request) {
    $params = $request->get_json_params();

    $formacion_slug = sanitize_text_field($params['formacion_slug'] ?? '');
    $email          = sanitize_email($params['email'] ?? '');
    $nombre         = sanitize_text_field($params['nombre'] ?? '');
    $precio         = floatval($params['precio'] ?? 0);
    $modalidad      = sanitize_text_field($params['modalidad'] ?? 'presencial');
    $perfil         = sanitize_text_field($params['perfil'] ?? '');

    if (!$formacion_slug || !$email || $precio <= 0) {
        return new WP_REST_Response(['success' => false, 'message' => 'Datos incompletos para crear sesion de pago.'], 400);
    }

    // Get formacion title
    $formacion_post  = get_page_by_path($formacion_slug, OBJECT, ['formacion', 'evento', 'curso']);
    $formacion_title = $formacion_post ? $formacion_post->post_title : $formacion_slug;
    $formacion_id    = $formacion_post ? $formacion_post->ID : 0;

    // Frontend URL for redirects
    $frontend_url = defined('GSMADRID_FRONTEND_URL')
        ? GSMADRID_FRONTEND_URL
        : 'https://gsmadrid.uptomarketing.com';

    $success_url = $frontend_url . '/formacion/' . $formacion_slug . '?pago=ok&session_id={CHECKOUT_SESSION_ID}';
    $cancel_url  = $frontend_url . '/formacion/' . $formacion_slug . '?pago=cancelado';

    // Create Stripe Checkout session
    $session = gsmadrid_stripe_request('checkout/sessions', [
        'mode'                 => 'payment',
        'customer_email'       => $email,
        'success_url'          => $success_url,
        'cancel_url'           => $cancel_url,
        'line_items[0][price_data][currency]'     => 'eur',
        'line_items[0][price_data][unit_amount]'   => intval($precio * 100), // cents
        'line_items[0][price_data][product_data][name]' => $formacion_title,
        'line_items[0][price_data][product_data][description]' => ucfirst($perfil) . ' — ' . ucfirst($modalidad),
        'line_items[0][quantity]' => 1,
        'metadata[formacion_slug]'  => $formacion_slug,
        'metadata[formacion_id]'    => $formacion_id,
        'metadata[email]'           => $email,
        'metadata[nombre]'          => $nombre,
        'metadata[perfil]'          => $perfil,
        'metadata[modalidad]'       => $modalidad,
        'payment_intent_data[metadata][formacion_slug]' => $formacion_slug,
        'payment_intent_data[metadata][email]'          => $email,
    ]);

    if (is_wp_error($session)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Error al crear sesion de pago: ' . $session->get_error_message(),
        ], 500);
    }

    // Store session ID in the inscription metadata
    if ($formacion_id) {
        $inscripciones = get_post_meta($formacion_id, '_inscripciones', true);
        if (is_array($inscripciones)) {
            foreach ($inscripciones as &$insc) {
                if (isset($insc['email']) && $insc['email'] === $email && $insc['estado'] === 'pendiente_pago') {
                    $insc['stripe_session_id'] = $session['id'];
                    break;
                }
            }
            update_post_meta($formacion_id, '_inscripciones', $inscripciones);
        }
    }

    return new WP_REST_Response([
        'success'      => true,
        'checkout_url'  => $session['url'],
        'session_id'    => $session['id'],
    ], 200);
}

/**
 * POST /stripe/webhook
 *
 * Handles Stripe webhook events (checkout.session.completed).
 * Updates inscription estado from pendiente_pago to pagado.
 */
function gsmadrid_stripe_webhook($request) {
    $payload = $request->get_body();
    $sig     = $request->get_header('stripe-signature');

    // Parse the event (in production, verify signature with webhook secret)
    $event = json_decode($payload, true);
    if (!$event || !isset($event['type'])) {
        return new WP_REST_Response(['error' => 'Invalid payload'], 400);
    }

    // Only process checkout.session.completed
    if ($event['type'] !== 'checkout.session.completed') {
        return new WP_REST_Response(['received' => true], 200);
    }

    $session  = $event['data']['object'] ?? [];
    $metadata = $session['metadata'] ?? [];

    $formacion_slug = $metadata['formacion_slug'] ?? '';
    $email          = $metadata['email'] ?? '';
    $session_id     = $session['id'] ?? '';

    if (!$formacion_slug || !$email) {
        return new WP_REST_Response(['error' => 'Missing metadata'], 400);
    }

    // Find the formacion and update the inscription
    $formacion_post = get_page_by_path($formacion_slug, OBJECT, ['formacion', 'evento', 'curso']);
    if (!$formacion_post) {
        return new WP_REST_Response(['error' => 'Formacion not found'], 404);
    }

    $inscripciones = get_post_meta($formacion_post->ID, '_inscripciones', true);
    if (!is_array($inscripciones)) {
        return new WP_REST_Response(['error' => 'No inscriptions found'], 404);
    }

    $updated = false;
    foreach ($inscripciones as &$insc) {
        if (isset($insc['email']) && $insc['email'] === $email && $insc['estado'] === 'pendiente_pago') {
            $insc['estado']            = 'pagado';
            $insc['stripe_session_id'] = $session_id;
            $insc['fecha_pago']        = current_time('mysql');
            $updated = true;
            break;
        }
    }

    if ($updated) {
        update_post_meta($formacion_post->ID, '_inscripciones', $inscripciones);

        // Send confirmation email
        $nombre = $metadata['nombre'] ?? $email;
        $formacion_title = $formacion_post->post_title;

        $body = "Estimado/a {$nombre},\n\n";
        $body .= "Su pago ha sido confirmado correctamente.\n\n";
        $body .= "- Actividad: {$formacion_title}\n";
        $body .= "- Importe: " . number_format($session['amount_total'] / 100, 2, ',', '.') . " EUR\n";
        $body .= "- Estado: PAGADO\n\n";
        $body .= "Queda oficialmente inscrito/a. Le enviaremos recordatorios antes del evento.\n\n";
        $body .= "Un saludo,\nColegio Oficial de Graduados Sociales de Madrid\n";

        wp_mail($email, "Pago confirmado — {$formacion_title}", $body, ['From: CGSM <admon@graduadosocialmadrid.org>']);

        // Notify admin
        wp_mail('admon@graduadosocialmadrid.org', "[CGSM] Pago recibido: {$formacion_title}", "Pago confirmado para:\nNombre: {$nombre}\nEmail: {$email}\nImporte: " . number_format($session['amount_total'] / 100, 2) . " EUR\nStripe Session: {$session_id}\n");
    }

    return new WP_REST_Response(['received' => true, 'updated' => $updated], 200);
}

/**
 * GET /stripe/status?formacion_slug=xxx&email=xxx
 *
 * Check payment status for an inscription.
 */
function gsmadrid_stripe_status($request) {
    $slug  = sanitize_text_field($request->get_param('formacion_slug'));
    $email = sanitize_email($request->get_param('email'));

    if (!$slug || !$email) {
        return new WP_REST_Response(['success' => false, 'message' => 'Faltan parametros.'], 400);
    }

    $post = get_page_by_path($slug, OBJECT, ['formacion', 'evento', 'curso']);
    if (!$post) {
        return new WP_REST_Response(['success' => false, 'message' => 'Formacion no encontrada.'], 404);
    }

    $inscripciones = get_post_meta($post->ID, '_inscripciones', true);
    if (!is_array($inscripciones)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Sin inscripciones.'], 404);
    }

    foreach ($inscripciones as $insc) {
        if (isset($insc['email']) && $insc['email'] === $email) {
            return new WP_REST_Response([
                'success' => true,
                'estado'  => $insc['estado'] ?? 'pendiente',
                'fecha_pago' => $insc['fecha_pago'] ?? null,
            ], 200);
        }
    }

    return new WP_REST_Response(['success' => false, 'message' => 'Inscripcion no encontrada.'], 404);
}
