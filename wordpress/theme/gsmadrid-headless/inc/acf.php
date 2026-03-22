<?php
/**
 * ACF Pro configuration: JSON sync + Options page + GraphQL support
 */

// JSON sync paths
add_filter('acf/settings/save_json', 'gsmadrid_acf_save_json');
function gsmadrid_acf_save_json($path) {
    return get_stylesheet_directory() . '/acf-json';
}

add_filter('acf/settings/load_json', 'gsmadrid_acf_load_json');
function gsmadrid_acf_load_json($paths) {
    unset($paths[0]);
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
}

// GraphQL + Options page
add_action('init', 'gsmadrid_graphql_acf_support');
function gsmadrid_graphql_acf_support() {
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    acf_add_options_page([
        'page_title'      => 'Ajustes del Sitio',
        'menu_title'      => 'Ajustes Sitio',
        'menu_slug'       => 'site-settings',
        'capability'      => 'edit_posts',
        'show_in_graphql' => true,
    ]);
}
