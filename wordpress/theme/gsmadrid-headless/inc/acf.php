<?php
/**
 * ACF Pro configuration: Options page + GraphQL support
 *
 * JSON sync DISABLED — ACF reads from the database only.
 * The acf-json/ files in the repo serve as backup/documentation.
 * To restore field groups: WP Admin → Custom Fields → Tools → Import.
 */

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
