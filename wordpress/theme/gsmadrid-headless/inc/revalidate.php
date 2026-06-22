<?php
/**
 * On-demand revalidation — Notifica al frontend Next.js cuando cambia
 * un evento o un post de actualidad para que invalide su cache ISR.
 *
 * Requiere variables de entorno en el container WP:
 *   - FRONTEND_URL       (ej. https://gsmadrid.uptomarketing.com)
 *   - REVALIDATE_SECRET  (mismo valor que en el frontend)
 */

const GSMADRID_REVALIDATE_CPTS = ['evento', 'post'];

function gsmadrid_revalidate_paths_for($post) {
    $slug = $post->post_name;
    switch ($post->post_type) {
        case 'evento':
            return ['/', '/eventos', '/eventos/' . $slug, '/formacion-eventos'];
        case 'post':
            return ['/', '/actualidad', '/actualidad/' . $slug];
        default:
            return [];
    }
}

function gsmadrid_revalidate_dispatch(array $paths) {
    if (empty($paths)) {
        return;
    }

    $frontend = defined('FRONTEND_URL') ? FRONTEND_URL : getenv('FRONTEND_URL');
    $secret   = defined('REVALIDATE_SECRET') ? REVALIDATE_SECRET : getenv('REVALIDATE_SECRET');

    if (!$frontend || !$secret) {
        error_log('[gsmadrid_revalidate] FRONTEND_URL or REVALIDATE_SECRET not configured');
        return;
    }

    $url = rtrim($frontend, '/') . '/api/revalidate';

    wp_remote_post($url, [
        'timeout'   => 5,
        'blocking'  => false,
        'headers'   => ['Content-Type' => 'application/json'],
        'body'      => wp_json_encode([
            'secret' => $secret,
            'paths'  => array_values(array_unique($paths)),
        ]),
    ]);
}

add_action('transition_post_status', function ($new_status, $old_status, $post) {
    if (!in_array($post->post_type, GSMADRID_REVALIDATE_CPTS, true)) {
        return;
    }
    if ($new_status === 'auto-draft' || ($new_status === 'inherit' && $old_status === 'inherit')) {
        return;
    }
    if ($new_status === $old_status && $new_status !== 'publish') {
        return;
    }

    gsmadrid_revalidate_dispatch(gsmadrid_revalidate_paths_for($post));
}, 10, 3);

add_action('deleted_post', function ($post_id, $post) {
    if (!in_array($post->post_type, GSMADRID_REVALIDATE_CPTS, true)) {
        return;
    }
    gsmadrid_revalidate_dispatch(gsmadrid_revalidate_paths_for($post));
}, 10, 2);
