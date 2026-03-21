<?php
/**
 * GS Madrid Headless — functions.php
 *
 * CPTs, taxonomias, headless config, CORS, GraphQL support.
 */

// ============================================================
// 1. CUSTOM POST TYPES
// ============================================================

add_action('init', 'gsmadrid_register_cpts');

function gsmadrid_register_cpts() {

    // Formacion (jornadas, seminarios, talleres)
    register_post_type('formacion', [
        'labels' => [
            'name'               => 'Formacion',
            'singular_name'      => 'Formacion',
            'add_new_item'       => 'Anadir nueva formacion',
            'edit_item'          => 'Editar formacion',
            'all_items'          => 'Todas las formaciones',
            'search_items'       => 'Buscar formaciones',
            'not_found'          => 'No se encontraron formaciones',
        ],
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'formacion'],
        'menu_icon'           => 'dashicons-calendar-alt',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'formacion',
        'graphql_plural_name' => 'formaciones',
    ]);

    // Curso (formacion larga con modulos)
    register_post_type('curso', [
        'labels' => [
            'name'               => 'Cursos',
            'singular_name'      => 'Curso',
            'add_new_item'       => 'Anadir nuevo curso',
            'edit_item'          => 'Editar curso',
            'all_items'          => 'Todos los cursos',
            'search_items'       => 'Buscar cursos',
            'not_found'          => 'No se encontraron cursos',
        ],
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'curso'],
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'curso',
        'graphql_plural_name' => 'cursos',
    ]);

    // Profesional (directorio de colegiados)
    register_post_type('profesional', [
        'labels' => [
            'name'               => 'Profesionales',
            'singular_name'      => 'Profesional',
            'add_new_item'       => 'Anadir nuevo profesional',
            'edit_item'          => 'Editar profesional',
            'all_items'          => 'Todos los profesionales',
            'search_items'       => 'Buscar profesionales',
            'not_found'          => 'No se encontraron profesionales',
        ],
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'profesional'],
        'menu_icon'           => 'dashicons-id-alt',
        'supports'            => ['title', 'thumbnail', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'profesional',
        'graphql_plural_name' => 'profesionales',
    ]);
}

// ============================================================
// 2. TAXONOMIAS
// ============================================================

add_action('init', 'gsmadrid_register_taxonomies');

function gsmadrid_register_taxonomies() {

    // Modalidad (Presencial, Online, Hibrido)
    register_taxonomy('modalidad', ['formacion', 'curso'], [
        'labels' => [
            'name'          => 'Modalidades',
            'singular_name' => 'Modalidad',
        ],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'modalidad',
        'graphql_plural_name' => 'modalidades',
        'rewrite'             => ['slug' => 'modalidad'],
    ]);

    // Area Formativa
    register_taxonomy('area_formativa', ['formacion', 'curso'], [
        'labels' => [
            'name'          => 'Areas Formativas',
            'singular_name' => 'Area Formativa',
        ],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'areaFormativa',
        'graphql_plural_name' => 'areasFormativas',
        'rewrite'             => ['slug' => 'area-formativa'],
    ]);

    // Especialidad (profesionales)
    register_taxonomy('especialidad', ['profesional'], [
        'labels' => [
            'name'          => 'Especialidades',
            'singular_name' => 'Especialidad',
        ],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'especialidad',
        'graphql_plural_name' => 'especialidades',
        'rewrite'             => ['slug' => 'especialidad'],
    ]);

    // Localidad (profesionales)
    register_taxonomy('localidad', ['profesional'], [
        'labels' => [
            'name'          => 'Localidades',
            'singular_name' => 'Localidad',
        ],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'localidad',
        'graphql_plural_name' => 'localidades',
        'rewrite'             => ['slug' => 'localidad'],
    ]);
}

// ============================================================
// 3. HEADLESS CONFIG — Redirect frontend
// ============================================================

add_action('template_redirect', 'gsmadrid_redirect_frontend');

function gsmadrid_redirect_frontend() {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST) || (defined('GRAPHQL_REQUEST') && GRAPHQL_REQUEST)) {
        return;
    }

    $frontend_url = defined('FRONTEND_URL') ? FRONTEND_URL : 'https://gsmadrid-2-web.a7lflv.easypanel.host';
    wp_redirect($frontend_url, 301);
    exit;
}

// ============================================================
// 4. ACF JSON SYNC
// ============================================================

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

// ============================================================
// 5. CORS — Allow Next.js frontend
// ============================================================

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

// ============================================================
// 6. CLEAN HEAD
// ============================================================

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);

// ============================================================
// 7. DISABLE XML-RPC
// ============================================================

add_filter('xmlrpc_enabled', '__return_false');

// ============================================================
// 8. GRAPHQL — Register ACF fields
// ============================================================

add_action('init', 'gsmadrid_graphql_acf_support');

function gsmadrid_graphql_acf_support() {
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    // ACF options page for site-wide settings
    acf_add_options_page([
        'page_title' => 'Ajustes del Sitio',
        'menu_title' => 'Ajustes Sitio',
        'menu_slug'  => 'site-settings',
        'capability' => 'edit_posts',
        'show_in_graphql' => true,
    ]);
}

// ============================================================
// 9. IMAGE SIZES
// ============================================================

add_action('after_setup_theme', 'gsmadrid_image_sizes');

function gsmadrid_image_sizes() {
    add_theme_support('post-thumbnails');
    add_image_size('card', 400, 260, true);
    add_image_size('blog', 800, 450, true);
    add_image_size('hero', 1920, 900, true);
}
