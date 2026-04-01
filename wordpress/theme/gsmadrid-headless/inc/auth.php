<?php
/**
 * Authentication: roles, user↔profesional linking, token validation,
 * REST routes (login, me, profile update), admin columns
 */

// ---- Roles ----

add_action('init', 'gsmadrid_register_roles');
function gsmadrid_register_roles() {
    if (!get_role('profesional')) {
        add_role('profesional', 'Profesional Colegiado', [
            'read'         => true,
            'edit_posts'   => false,
            'delete_posts' => false,
            'upload_files' => true,
        ]);
    }
    if (!get_role('precolegiado')) {
        add_role('precolegiado', 'Precolegiado', [
            'read'         => true,
            'edit_posts'   => false,
            'delete_posts' => false,
            'upload_files' => false,
        ]);
    }
}

// ---- User meta fields: DNI/NIE, Numero de colegiado ----

add_action('show_user_profile', 'gsmadrid_user_meta_fields');
add_action('edit_user_profile', 'gsmadrid_user_meta_fields');
function gsmadrid_user_meta_fields($user) {
    $dni = get_user_meta($user->ID, '_gsmadrid_dni_nie', true);
    $num = get_user_meta($user->ID, '_gsmadrid_numero_colegiado', true);
    ?>
    <h3>Datos colegiales (GS Madrid)</h3>
    <table class="form-table">
        <tr>
            <th><label for="gsmadrid_dni_nie">DNI / NIE</label></th>
            <td><input type="text" name="gsmadrid_dni_nie" id="gsmadrid_dni_nie" value="<?php echo esc_attr($dni); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="gsmadrid_numero_colegiado">N.o de Colegiado / Precolegiado</label></th>
            <td><input type="text" name="gsmadrid_numero_colegiado" id="gsmadrid_numero_colegiado" value="<?php echo esc_attr($num); ?>" class="regular-text" />
            <p class="description">Numero oficial de colegiado (GS-XXXX) o de precolegiado (PRE-XXXX).</p></td>
        </tr>
    </table>
    <?php
}

add_action('personal_options_update', 'gsmadrid_save_user_meta_fields');
add_action('edit_user_profile_update', 'gsmadrid_save_user_meta_fields');
function gsmadrid_save_user_meta_fields($user_id) {
    if (!current_user_can('edit_user', $user_id)) return;
    if (isset($_POST['gsmadrid_dni_nie'])) {
        update_user_meta($user_id, '_gsmadrid_dni_nie', sanitize_text_field($_POST['gsmadrid_dni_nie']));
    }
    if (isset($_POST['gsmadrid_numero_colegiado'])) {
        update_user_meta($user_id, '_gsmadrid_numero_colegiado', sanitize_text_field($_POST['gsmadrid_numero_colegiado']));
    }
}

// ---- Admin user list columns: DNI, Numero ----

add_filter('manage_users_columns', 'gsmadrid_user_list_columns');
function gsmadrid_user_list_columns($columns) {
    $columns['gsmadrid_dni'] = 'DNI/NIE';
    $columns['gsmadrid_num'] = 'N.o Colegiado';
    return $columns;
}

add_filter('manage_users_custom_column', 'gsmadrid_user_list_column_content', 10, 3);
function gsmadrid_user_list_column_content($value, $column, $user_id) {
    if ($column === 'gsmadrid_dni') return esc_html(get_user_meta($user_id, '_gsmadrid_dni_nie', true) ?: '—');
    if ($column === 'gsmadrid_num') return esc_html(get_user_meta($user_id, '_gsmadrid_numero_colegiado', true) ?: '—');
    return $value;
}

// ---- Link user → profesional CPT ----

add_action('user_register', 'gsmadrid_link_user_profesional');
function gsmadrid_link_user_profesional($user_id) {
    $user = get_user_by('id', $user_id);
    if (!$user || !in_array('profesional', $user->roles, true)) {
        return;
    }

    $post_id = wp_insert_post([
        'post_type'   => 'profesional',
        'post_title'  => $user->display_name,
        'post_status' => 'draft',
        'post_author' => $user_id,
    ]);

    if ($post_id && !is_wp_error($post_id)) {
        update_user_meta($user_id, '_profesional_post_id', $post_id);
        update_post_meta($post_id, '_profesional_user_id', $user_id);

        if (function_exists('update_field')) {
            update_field('nombre_completo', $user->display_name, $post_id);
            update_field('email', $user->user_email, $post_id);
            update_field('visible_directorio', false, $post_id);
        }
    }
}

// ---- Token validation ----

add_filter('determine_current_user', 'gsmadrid_validate_auth_token', 20);
function gsmadrid_validate_auth_token($user_id) {
    if ($user_id) return $user_id;

    $auth_header = isset($_SERVER['HTTP_AUTHORIZATION'])
        ? $_SERVER['HTTP_AUTHORIZATION']
        : (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])
            ? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
            : '');

    if (empty($auth_header) || strpos($auth_header, 'Bearer ') !== 0) return $user_id;

    $token = substr($auth_header, 7);
    $decoded = base64_decode($token);
    if (!$decoded) return $user_id;

    $parts = explode(':', $decoded);
    if (count($parts) < 3) return $user_id;

    $token_user_id = (int) $parts[0];
    $stored_token = get_user_meta($token_user_id, '_gsmadrid_auth_token', true);
    $expires = (int) get_user_meta($token_user_id, '_gsmadrid_auth_token_expires', true);

    if ($stored_token === $token && $expires > time()) return $token_user_id;

    return $user_id;
}

// ---- REST routes ----

add_action('rest_api_init', 'gsmadrid_register_auth_routes');
function gsmadrid_register_auth_routes() {
    register_rest_route('gsmadrid/v1', '/auth/login', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_auth_login',
        'permission_callback' => '__return_true',
        'args' => [
            'username' => ['required' => true, 'type' => 'string'],
            'password' => ['required' => true, 'type' => 'string'],
        ],
    ]);

    register_rest_route('gsmadrid/v1', '/auth/me', [
        'methods'             => 'GET',
        'callback'            => 'gsmadrid_auth_me',
        'permission_callback' => 'is_user_logged_in',
    ]);

    register_rest_route('gsmadrid/v1', '/profile/update', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_profile_update',
        'permission_callback' => 'is_user_logged_in',
    ]);

    register_rest_route('gsmadrid/v1', '/profile/upload-photo', [
        'methods'             => 'POST',
        'callback'            => 'gsmadrid_profile_upload_photo',
        'permission_callback' => 'is_user_logged_in',
    ]);
}

function gsmadrid_auth_login($request) {
    $username = sanitize_text_field($request->get_param('username'));
    $password = $request->get_param('password');
    $user = wp_authenticate($username, $password);

    if (is_wp_error($user)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Credenciales incorrectas.'], 401);
    }

    $token_data = $user->ID . ':' . time() . ':' . wp_hash($user->ID . time());
    $token = base64_encode($token_data);

    update_user_meta($user->ID, '_gsmadrid_auth_token', $token);
    update_user_meta($user->ID, '_gsmadrid_auth_token_expires', time() + (30 * DAY_IN_SECONDS));

    $profesional_post_id = get_user_meta($user->ID, '_profesional_post_id', true);

    return new WP_REST_Response([
        'success' => true,
        'token'   => $token,
        'user'    => [
            'id'               => $user->ID,
            'username'         => $user->user_login,
            'email'            => $user->user_email,
            'displayName'      => $user->display_name,
            'roles'            => $user->roles,
            'profesionalPostId' => $profesional_post_id ? (int) $profesional_post_id : null,
            'dniNie'           => get_user_meta($user->ID, '_gsmadrid_dni_nie', true) ?: null,
            'numeroColegiado'  => get_user_meta($user->ID, '_gsmadrid_numero_colegiado', true) ?: null,
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
            'id'               => $user->ID,
            'username'         => $user->user_login,
            'email'            => $user->user_email,
            'displayName'      => $user->display_name,
            'roles'            => $user->roles,
            'profesionalPostId' => $profesional_post_id ? (int) $profesional_post_id : null,
            'dniNie'           => get_user_meta($user->ID, '_gsmadrid_dni_nie', true) ?: null,
            'numeroColegiado'  => get_user_meta($user->ID, '_gsmadrid_numero_colegiado', true) ?: null,
        ],
        'profile' => $profile,
    ], 200);
}

function gsmadrid_profile_update($request) {
    $user = wp_get_current_user();
    $params = $request->get_json_params();
    $updated = [];

    $is_profesional = in_array('profesional', $user->roles, true);
    $is_precolegiado = in_array('precolegiado', $user->roles, true);
    $is_admin = current_user_can('manage_options');

    if (!$is_profesional && !$is_precolegiado && !$is_admin) {
        return new WP_REST_Response(['success' => false, 'message' => 'No tienes permisos para editar este perfil.'], 403);
    }

    // User meta fields (available to all authenticated roles)
    $user_meta_fields = ['dni_nie', 'numero_colegiado'];
    foreach ($user_meta_fields as $meta_key) {
        if (isset($params[$meta_key])) {
            update_user_meta($user->ID, '_gsmadrid_' . $meta_key, sanitize_text_field($params[$meta_key]));
            $updated[] = $meta_key;
        }
    }

    // ACF fields on profesional CPT (only for profesional role)
    $profesional_post_id = get_user_meta($user->ID, '_profesional_post_id', true);
    if ($profesional_post_id && ($is_profesional || $is_admin)) {
        $editable_fields = ['despacho', 'direccion', 'codigo_postal', 'telefono', 'email', 'web', 'linkedin', 'bio', 'idiomas', 'visible_directorio'];

        if (function_exists('update_field')) {
            foreach ($editable_fields as $field_name) {
                if (isset($params[$field_name])) {
                    $value = $field_name === 'visible_directorio'
                        ? (bool) $params[$field_name]
                        : sanitize_text_field($params[$field_name]);
                    if ($field_name === 'bio') {
                        $value = wp_kses($params[$field_name], [
                            'p'      => [],
                            'br'     => [],
                            'strong' => [],
                            'em'     => [],
                            'ul'     => [],
                            'ol'     => [],
                            'li'     => [],
                        ]);
                    }
                    update_field($field_name, $value, $profesional_post_id);
                    $updated[] = $field_name;
                }
            }
        }

        if (isset($params['visible_directorio']) && $params['visible_directorio']) {
            wp_update_post(['ID' => $profesional_post_id, 'post_status' => 'publish']);
        }
    }

    return new WP_REST_Response(['success' => true, 'updatedFields' => $updated, 'message' => 'Perfil actualizado correctamente.'], 200);
}

function gsmadrid_profile_upload_photo($request) {
    $user = wp_get_current_user();
    $profesional_post_id = get_user_meta($user->ID, '_profesional_post_id', true);

    if (!$profesional_post_id) {
        return new WP_REST_Response(['success' => false, 'message' => 'No tienes un perfil profesional vinculado.'], 403);
    }

    if (!in_array('profesional', $user->roles, true) && !current_user_can('manage_options')) {
        return new WP_REST_Response(['success' => false, 'message' => 'No tienes permisos.'], 403);
    }

    $files = $request->get_file_params();
    if (empty($files['photo'])) {
        return new WP_REST_Response(['success' => false, 'message' => 'No se ha recibido ninguna imagen.'], 400);
    }

    $file = $files['photo'];

    // Validate file type
    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($file['type'], $allowed, true)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Formato no permitido. Usa JPG, PNG o WebP.'], 400);
    }

    // Max 2MB
    if ($file['size'] > 2 * 1024 * 1024) {
        return new WP_REST_Response(['success' => false, 'message' => 'La imagen no puede superar los 2 MB.'], 400);
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    // Upload to media library
    $attachment_id = media_handle_sideload([
        'name'     => sanitize_file_name($file['name']),
        'tmp_name' => $file['tmp_name'],
        'type'     => $file['type'],
        'size'     => $file['size'],
        'error'    => $file['error'],
    ], $profesional_post_id);

    if (is_wp_error($attachment_id)) {
        return new WP_REST_Response(['success' => false, 'message' => 'Error al subir la imagen: ' . $attachment_id->get_error_message()], 500);
    }

    // Update ACF foto field
    if (function_exists('update_field')) {
        update_field('foto', $attachment_id, $profesional_post_id);
    }

    $url = wp_get_attachment_url($attachment_id);

    return new WP_REST_Response([
        'success'      => true,
        'message'      => 'Foto actualizada correctamente.',
        'attachmentId' => $attachment_id,
        'url'          => $url,
    ], 200);
}

// ---- Admin columns for profesional CPT ----

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
        echo $user_id ? esc_html(get_user_by('id', $user_id)->user_login ?? 'Usuario eliminado') : '<em>Sin vincular</em>';
    }
    if ($column === 'visible') {
        if (function_exists('get_field')) {
            echo get_field('visible_directorio', $post_id) ? '✅' : '❌';
        }
    }
}
