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

    // Evento (actos institucionales, asambleas, jornadas networking)
    register_post_type('evento', [
        'labels' => [
            'name'               => 'Eventos',
            'singular_name'      => 'Evento',
            'add_new_item'       => 'Anadir nuevo evento',
            'edit_item'          => 'Editar evento',
            'all_items'          => 'Todos los eventos',
            'search_items'       => 'Buscar eventos',
            'not_found'          => 'No se encontraron eventos',
        ],
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'evento'],
        'menu_icon'           => 'dashicons-megaphone',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'evento',
        'graphql_plural_name' => 'eventos',
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

    // Miembro Junta de Gobierno
    register_post_type('miembro_junta', [
        'labels' => [
            'name'               => 'Junta de Gobierno',
            'singular_name'      => 'Miembro',
            'add_new_item'       => 'Anadir miembro',
            'edit_item'          => 'Editar miembro',
            'all_items'          => 'Junta de Gobierno',
            'search_items'       => 'Buscar miembros',
            'not_found'          => 'No se encontraron miembros',
        ],
        'public'              => true,
        'has_archive'         => false,
        'rewrite'             => ['slug' => 'junta'],
        'menu_icon'           => 'dashicons-groups',
        'supports'            => ['title', 'thumbnail', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'miembroJunta',
        'graphql_plural_name' => 'miembrosJunta',
    ]);
}

// ============================================================
// 1b. REGISTER NAV MENUS
// ============================================================

add_action('after_setup_theme', 'gsmadrid_register_menus');

function gsmadrid_register_menus() {
    register_nav_menus([
        'primary' => 'Menu Principal',
        'footer'  => 'Menu Footer',
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
// 6b. DISABLE GUTENBERG — Use Classic Editor
// (headless CMS: Gutenberg blocks not rendered in frontend)
// ============================================================

add_filter('use_block_editor_for_post', '__return_false');
add_filter('use_block_editor_for_post_type', '__return_false');

// Also remove Gutenberg styles from admin
add_action('admin_init', function () {
    remove_action('wp_enqueue_scripts', 'wp_common_block_scripts_and_styles');
    wp_deregister_style('wp-block-library');
    wp_deregister_style('wp-block-library-theme');
    wp_deregister_style('global-styles');
});

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

// ============================================================
// 10. ROLE: PROFESIONAL (colegiado)
// ============================================================

add_action('init', 'gsmadrid_register_profesional_role');

function gsmadrid_register_profesional_role() {
    if (!get_role('profesional')) {
        add_role('profesional', 'Profesional Colegiado', [
            'read'         => true,
            'edit_posts'   => false,
            'delete_posts' => false,
            'upload_files' => true,
        ]);
    }
}

// ============================================================
// 11. LINK USER → PROFESIONAL CPT
// When a user with role 'profesional' is created, auto-create
// a 'profesional' CPT post linked via user meta.
// Admin can also manually link existing CPT posts to users.
// ============================================================

add_action('user_register', 'gsmadrid_link_user_profesional');

function gsmadrid_link_user_profesional($user_id) {
    $user = get_user_by('id', $user_id);
    if (!$user || !in_array('profesional', $user->roles, true)) {
        return;
    }

    // Create linked profesional CPT post
    $post_id = wp_insert_post([
        'post_type'   => 'profesional',
        'post_title'  => $user->display_name,
        'post_status' => 'draft',
        'post_author' => $user_id,
    ]);

    if ($post_id && !is_wp_error($post_id)) {
        update_user_meta($user_id, '_profesional_post_id', $post_id);
        update_post_meta($post_id, '_profesional_user_id', $user_id);

        // Set default ACF fields
        if (function_exists('update_field')) {
            update_field('nombre_completo', $user->display_name, $post_id);
            update_field('email', $user->user_email, $post_id);
            update_field('visible_directorio', false, $post_id);
        }
    }
}

// ============================================================
// 12. REST API: Authentication + Profile Management
// JWT-like auth via application passwords or custom token endpoint
// ============================================================

add_action('rest_api_init', 'gsmadrid_register_auth_routes');

function gsmadrid_register_auth_routes() {

    // POST /wp-json/gsmadrid/v1/auth/login
    register_rest_route('gsmadrid/v1', '/auth/login', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_auth_login',
        'permission_callback' => '__return_true',
        'args' => [
            'username' => ['required' => true, 'type' => 'string'],
            'password' => ['required' => true, 'type' => 'string'],
        ],
    ]);

    // GET /wp-json/gsmadrid/v1/auth/me (requires auth)
    register_rest_route('gsmadrid/v1', '/auth/me', [
        'methods'             => 'GET',
        'callback'            => 'gsmadrid_auth_me',
        'permission_callback' => 'is_user_logged_in',
    ]);

    // POST /wp-json/gsmadrid/v1/profile/update (requires auth)
    register_rest_route('gsmadrid/v1', '/profile/update', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_profile_update',
        'permission_callback' => 'is_user_logged_in',
    ]);
}

function gsmadrid_auth_login($request) {
    $username = sanitize_text_field($request->get_param('username'));
    $password = $request->get_param('password');

    $user = wp_authenticate($username, $password);

    if (is_wp_error($user)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Credenciales incorrectas.',
        ], 401);
    }

    // Generate a simple token (base64 of user_id:time:hash)
    $token_data = $user->ID . ':' . time() . ':' . wp_hash($user->ID . time());
    $token = base64_encode($token_data);

    // Store token in user meta (valid 30 days)
    update_user_meta($user->ID, '_gsmadrid_auth_token', $token);
    update_user_meta($user->ID, '_gsmadrid_auth_token_expires', time() + (30 * DAY_IN_SECONDS));

    $profesional_post_id = get_user_meta($user->ID, '_profesional_post_id', true);

    return new WP_REST_Response([
        'success' => true,
        'token'   => $token,
        'user'    => [
            'id'          => $user->ID,
            'username'    => $user->user_login,
            'email'       => $user->user_email,
            'displayName' => $user->display_name,
            'roles'       => $user->roles,
            'profesionalPostId' => $profesional_post_id ? (int) $profesional_post_id : null,
        ],
    ], 200);
}

function gsmadrid_auth_me($request) {
    $user = wp_get_current_user();
    $profesional_post_id = get_user_meta($user->ID, '_profesional_post_id', true);

    $profile = null;
    if ($profesional_post_id && function_exists('get_fields')) {
        $profile = get_fields($profesional_post_id);
    }

    return new WP_REST_Response([
        'user' => [
            'id'          => $user->ID,
            'username'    => $user->user_login,
            'email'       => $user->user_email,
            'displayName' => $user->display_name,
            'roles'       => $user->roles,
            'profesionalPostId' => $profesional_post_id ? (int) $profesional_post_id : null,
        ],
        'profile' => $profile,
    ], 200);
}

function gsmadrid_profile_update($request) {
    $user = wp_get_current_user();
    $profesional_post_id = get_user_meta($user->ID, '_profesional_post_id', true);

    if (!$profesional_post_id) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'No tienes un perfil profesional vinculado.',
        ], 403);
    }

    // Only allow professionals to edit their own profile
    if (!in_array('profesional', $user->roles, true) && !current_user_can('manage_options')) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'No tienes permisos para editar este perfil.',
        ], 403);
    }

    // Allowed fields that a professional can edit
    $editable_fields = [
        'despacho', 'direccion', 'codigo_postal', 'telefono',
        'email', 'web', 'linkedin', 'bio', 'idiomas',
        'visible_directorio',
    ];

    $updated = [];
    $params = $request->get_json_params();

    if (function_exists('update_field')) {
        foreach ($editable_fields as $field_name) {
            if (isset($params[$field_name])) {
                $value = $field_name === 'visible_directorio'
                    ? (bool) $params[$field_name]
                    : sanitize_text_field($params[$field_name]);

                if ($field_name === 'bio') {
                    $value = wp_kses_post($params[$field_name]);
                }

                update_field($field_name, $value, $profesional_post_id);
                $updated[] = $field_name;
            }
        }
    }

    // If the profile is being made visible, publish the CPT post
    if (isset($params['visible_directorio']) && $params['visible_directorio']) {
        wp_update_post([
            'ID'          => $profesional_post_id,
            'post_status' => 'publish',
        ]);
    }

    return new WP_REST_Response([
        'success'       => true,
        'updatedFields' => $updated,
        'message'       => 'Perfil actualizado correctamente.',
    ], 200);
}

// ============================================================
// 13. AUTH TOKEN VALIDATION (for REST API)
// Validate custom token in Authorization header
// ============================================================

add_filter('determine_current_user', 'gsmadrid_validate_auth_token', 20);

function gsmadrid_validate_auth_token($user_id) {
    if ($user_id) {
        return $user_id;
    }

    $auth_header = isset($_SERVER['HTTP_AUTHORIZATION'])
        ? $_SERVER['HTTP_AUTHORIZATION']
        : (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])
            ? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
            : '');

    if (empty($auth_header) || strpos($auth_header, 'Bearer ') !== 0) {
        return $user_id;
    }

    $token = substr($auth_header, 7);
    $decoded = base64_decode($token);

    if (!$decoded) {
        return $user_id;
    }

    $parts = explode(':', $decoded);
    if (count($parts) < 3) {
        return $user_id;
    }

    $token_user_id = (int) $parts[0];
    $stored_token = get_user_meta($token_user_id, '_gsmadrid_auth_token', true);
    $expires = (int) get_user_meta($token_user_id, '_gsmadrid_auth_token_expires', true);

    if ($stored_token === $token && $expires > time()) {
        return $token_user_id;
    }

    return $user_id;
}

// ============================================================
// 14. REST API: Inscripcion Form
// ============================================================

add_action('rest_api_init', 'gsmadrid_register_inscripcion_route');

function gsmadrid_register_inscripcion_route() {
    register_rest_route('gsmadrid/v1', '/inscripcion', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_handle_inscripcion',
        'permission_callback' => '__return_true',
        'args' => [
            'formacion_slug' => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'perfil'         => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'nombre'         => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'email'          => ['required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_email'],
            'telefono'       => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'empresa'        => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'numero_colegiado' => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'modalidad'      => ['required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field'],
            'precio'         => ['required' => false, 'type' => 'number'],
        ],
    ]);
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

    // Validate required fields
    if (empty($formacion_slug) || empty($perfil) || empty($nombre) || empty($email)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Faltan campos obligatorios (formacion, perfil, nombre, email).',
        ], 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'El email proporcionado no es valido.',
        ], 400);
    }

    // Find the formacion/evento post
    $formacion_post = get_page_by_path($formacion_slug, OBJECT, ['formacion', 'evento', 'curso']);
    $formacion_title = $formacion_post ? $formacion_post->post_title : $formacion_slug;
    $formacion_id = $formacion_post ? $formacion_post->ID : 0;

    // Store inscription as post meta on the formacion (array of inscriptions)
    if ($formacion_id) {
        $inscripciones = get_post_meta($formacion_id, '_inscripciones', true);
        if (!is_array($inscripciones)) {
            $inscripciones = [];
        }

        // Check for duplicate email
        foreach ($inscripciones as $insc) {
            if (isset($insc['email']) && $insc['email'] === $email) {
                return new WP_REST_Response([
                    'success' => false,
                    'message' => 'Ya existe una inscripcion con este email para esta formacion.',
                ], 409);
            }
        }

        $inscripcion = [
            'nombre'           => $nombre,
            'email'            => $email,
            'telefono'         => $telefono,
            'empresa'          => $empresa,
            'perfil'           => $perfil,
            'numero_colegiado' => $numero_colegiado,
            'modalidad'        => $modalidad,
            'precio'           => $precio,
            'fecha'            => current_time('mysql'),
            'estado'           => 'pendiente',
        ];

        $inscripciones[] = $inscripcion;
        update_post_meta($formacion_id, '_inscripciones', $inscripciones);
    }

    // Email to admin
    $admin_email = get_option('admin_email');
    $perfilLabel = ucfirst($perfil);
    $precioLabel = $precio > 0 ? "{$precio} EUR" : 'Gratuito';

    $admin_subject = "[CGSM] Nueva inscripcion: {$formacion_title}";
    $admin_body = "Nueva inscripcion recibida:\n\n";
    $admin_body .= "Formacion: {$formacion_title}\n";
    $admin_body .= "Nombre: {$nombre}\n";
    $admin_body .= "Email: {$email}\n";
    if ($telefono) $admin_body .= "Telefono: {$telefono}\n";
    $admin_body .= "Perfil: {$perfilLabel}\n";
    if ($numero_colegiado) $admin_body .= "N. Colegiado: {$numero_colegiado}\n";
    if ($empresa) $admin_body .= "Empresa: {$empresa}\n";
    $admin_body .= "Modalidad: {$modalidad}\n";
    $admin_body .= "Precio: {$precioLabel}\n";
    $admin_body .= "Fecha: " . current_time('d/m/Y H:i') . "\n";

    wp_mail($admin_email, $admin_subject, $admin_body);

    // Also send to the dedicated email
    wp_mail('admon@graduadosocialmadrid.org', $admin_subject, $admin_body);

    // Confirmation email to user
    $user_subject = "Confirmacion de inscripcion — {$formacion_title}";
    $user_body = "Estimado/a {$nombre},\n\n";
    $user_body .= "Su inscripcion ha sido registrada correctamente.\n\n";
    $user_body .= "Datos de la inscripcion:\n";
    $user_body .= "- Actividad: {$formacion_title}\n";
    $user_body .= "- Modalidad: {$modalidad}\n";
    $user_body .= "- Perfil: {$perfilLabel}\n";
    $user_body .= "- Importe: {$precioLabel}\n\n";
    if ($precio > 0) {
        $user_body .= "Recibira las instrucciones de pago por email en las proximas 24 horas habiles.\n\n";
    }
    $user_body .= "Un saludo,\n";
    $user_body .= "Colegio Oficial de Graduados Sociales de Madrid\n";
    $user_body .= "C/ Jose Abascal, 44 — 28003 Madrid\n";
    $user_body .= "Tel: 91 523 08 88\n";

    $headers = ['From: CGSM <admon@graduadosocialmadrid.org>'];
    wp_mail($email, $user_subject, $user_body, $headers);

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Inscripcion registrada correctamente. Se ha enviado un email de confirmacion.',
    ], 200);
}

// ============================================================
// 15. REST API: Contact Form
// ============================================================

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
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Faltan campos obligatorios.',
        ], 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'El email proporcionado no es valido.',
        ], 400);
    }

    // Rate limiting: simple check via transient (1 submission per email per 60 seconds)
    $rate_key = 'contacto_' . md5($email);
    if (get_transient($rate_key)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Por favor, espera un momento antes de enviar otro mensaje.',
        ], 429);
    }
    set_transient($rate_key, true, 60);

    // Map asunto to label
    $asuntoLabels = [
        'colegiacion' => 'Colegiacion',
        'formacion'   => 'Formacion',
        'sala-togas'  => 'Sala de Togas',
        'gestiones'   => 'Gestiones',
        'otros'       => 'Otros',
    ];
    $asuntoLabel = $asuntoLabels[$asunto] ?? $asunto;

    // Determine recipient based on subject
    $to = 'admon@graduadosocialmadrid.org';
    if ($asunto === 'sala-togas') {
        $to = 'saladgraduados@graduadosocialmadrid.org';
    }

    // Send email to admin
    $subject = "[Web CGSM] Contacto: {$asuntoLabel}";
    $body = "Nuevo mensaje desde el formulario de contacto:\n\n";
    $body .= "Nombre: {$nombre}\n";
    $body .= "Email: {$email}\n";
    if ($telefono) $body .= "Telefono: {$telefono}\n";
    $body .= "Asunto: {$asuntoLabel}\n\n";
    $body .= "Mensaje:\n{$mensaje}\n\n";
    $body .= "---\n";
    $body .= "Enviado desde: graduadosocialmadrid.org\n";
    $body .= "Fecha: " . current_time('d/m/Y H:i') . "\n";

    $admin_headers = [
        "Reply-To: {$nombre} <{$email}>",
    ];

    wp_mail($to, $subject, $body, $admin_headers);

    // Auto-reply to user
    $reply_subject = "Hemos recibido tu mensaje — Colegio de Graduados Sociales de Madrid";
    $reply_body = "Estimado/a {$nombre},\n\n";
    $reply_body .= "Hemos recibido tu consulta sobre \"{$asuntoLabel}\" y la atenderemos lo antes posible.\n\n";
    $reply_body .= "Si tu consulta es urgente, te recomendamos llamarnos al 91 523 08 88.\n\n";
    $reply_body .= "Un saludo,\n";
    $reply_body .= "Colegio Oficial de Graduados Sociales de Madrid\n";
    $reply_body .= "C/ Jose Abascal, 44 — 28003 Madrid\n";

    $reply_headers = ['From: CGSM <admon@graduadosocialmadrid.org>'];
    wp_mail($email, $reply_subject, $reply_body, $reply_headers);

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Mensaje enviado correctamente. Te responderemos lo antes posible.',
    ], 200);
}

// ============================================================
// 16. ADMIN: Add profesional user management columns
// ============================================================

add_filter('manage_profesional_posts_columns', 'gsmadrid_profesional_admin_columns');

function gsmadrid_profesional_admin_columns($columns) {
    $columns['linked_user'] = 'Usuario vinculado';
    $columns['visible'] = 'Visible';
    return $columns;
}

add_action('manage_profesional_posts_custom_column', 'gsmadrid_profesional_admin_column_content', 10, 2);

function gsmadrid_profesional_admin_column_content($column, $post_id) {
    if ($column === 'linked_user') {
        $user_id = get_post_meta($post_id, '_profesional_user_id', true);
        if ($user_id) {
            $user = get_user_by('id', $user_id);
            echo $user ? esc_html($user->user_login) : 'Usuario eliminado';
        } else {
            echo '<em>Sin vincular</em>';
        }
    }
    if ($column === 'visible') {
        if (function_exists('get_field')) {
            $visible = get_field('visible_directorio', $post_id);
            echo $visible ? '✅' : '❌';
        }
    }
}

// ============================================================
// 17. REST API: Solicitud de Colegiacion
// ============================================================

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

    $tipo      = sanitize_text_field($params['tipo'] ?? '');
    $nombre    = sanitize_text_field($params['nombre'] ?? '');
    $apellidos = sanitize_text_field($params['apellidos'] ?? '');
    $email     = sanitize_email($params['email'] ?? '');
    $telefono  = sanitize_text_field($params['telefono'] ?? '');
    $universidad = sanitize_text_field($params['universidad'] ?? '');
    $titulacion  = sanitize_text_field($params['titulacion'] ?? '');
    $mensaje   = wp_kses_post($params['mensaje'] ?? '');

    if (empty($nombre) || empty($apellidos) || empty($email) || empty($tipo)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Faltan campos obligatorios.',
        ], 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'El email proporcionado no es valido.',
        ], 400);
    }

    $rate_key = 'colegiacion_' . md5($email);
    if (get_transient($rate_key)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Ya hemos recibido tu solicitud. Te contactaremos pronto.',
        ], 429);
    }
    set_transient($rate_key, true, 3600);

    $tipoLabels = [
        'precolegiado'       => 'Precolegiado (Estudiante)',
        'ejerciente-libre'   => 'Ejerciente Libre',
        'ejerciente-empresa' => 'Ejerciente en Empresa',
        'no-ejerciente'      => 'No Ejerciente',
    ];
    $tipoLabel = $tipoLabels[$tipo] ?? $tipo;

    $subject = "[CGSM] Solicitud de colegiacion: {$tipoLabel}";
    $body = "Nueva solicitud de colegiacion:\n\n";
    $body .= "Tipo: {$tipoLabel}\n";
    $body .= "Nombre: {$nombre} {$apellidos}\n";
    $body .= "Email: {$email}\n";
    if ($telefono) $body .= "Telefono: {$telefono}\n";
    if ($universidad) $body .= "Universidad: {$universidad}\n";
    if ($titulacion) $body .= "Titulacion: {$titulacion}\n";
    if ($mensaje) $body .= "Mensaje: {$mensaje}\n";
    $body .= "\nFecha: " . current_time('d/m/Y H:i') . "\n";

    $admin_headers = ["Reply-To: {$nombre} {$apellidos} <{$email}>"];
    wp_mail('admon@graduadosocialmadrid.org', $subject, $body, $admin_headers);
    wp_mail(get_option('admin_email'), $subject, $body, $admin_headers);

    $reply_subject = "Hemos recibido tu solicitud de colegiacion — CGSM";
    $reply_body = "Estimado/a {$nombre},\n\n";
    $reply_body .= "Hemos recibido tu solicitud de colegiacion como {$tipoLabel}.\n\n";
    $reply_body .= "Nuestro equipo revisara tu solicitud y se pondra en contacto contigo para indicarte los siguientes pasos y la documentacion necesaria.\n\n";
    $reply_body .= "Si tienes alguna duda, puedes llamarnos al 91 523 08 88.\n\n";
    $reply_body .= "Un saludo,\nColegio Oficial de Graduados Sociales de Madrid\nC/ Jose Abascal, 44 — 28003 Madrid\n";

    wp_mail($email, $reply_subject, $reply_body, ['From: CGSM <admon@graduadosocialmadrid.org>']);

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Solicitud enviada correctamente. Te contactaremos pronto.',
    ], 200);
}
