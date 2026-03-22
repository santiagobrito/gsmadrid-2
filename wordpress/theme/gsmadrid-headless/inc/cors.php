<?php
/**
 * CORS headers — Allow Next.js frontend origins
 */

add_action('init', 'gsmadrid_cors_headers');

function gsmadrid_cors_headers() {
    $allowed_origins = [
        'http://localhost:3000',
        'https://gsmadrid-2-web.a7lflv.easypanel.host',
    ];

    if (defined('FRONTEND_URL')) {
        $allowed_origins[] = FRONTEND_URL;
    }

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit;
        }
    }
}
