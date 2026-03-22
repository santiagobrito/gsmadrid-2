<?php
/**
 * Headless config: frontend redirect, clean head, disable Gutenberg, disable XML-RPC
 */

// Redirect all frontend requests to Next.js
add_action('template_redirect', 'gsmadrid_redirect_frontend');
function gsmadrid_redirect_frontend() {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST) || (defined('GRAPHQL_REQUEST') && GRAPHQL_REQUEST)) {
        return;
    }
    $frontend_url = defined('FRONTEND_URL') ? FRONTEND_URL : 'https://gsmadrid-2-web.a7lflv.easypanel.host';
    wp_redirect($frontend_url, 301);
    exit;
}

// Clean head
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);

// Disable Gutenberg (headless — blocks not rendered in frontend)
add_filter('use_block_editor_for_post', '__return_false');
add_filter('use_block_editor_for_post_type', '__return_false');
add_action('admin_init', function () {
    remove_action('wp_enqueue_scripts', 'wp_common_block_scripts_and_styles');
    wp_deregister_style('wp-block-library');
    wp_deregister_style('wp-block-library-theme');
    wp_deregister_style('global-styles');
});

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');
