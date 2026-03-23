<?php
/**
 * Emails de bienvenida para colegiados y precolegiados.
 *
 * - Colegiado: se dispara cuando su CPT "profesional" pasa a publish.
 * - Precolegiado: se dispara al crear el usuario con rol "precolegiado".
 */

// ---- Colegiado: al publicar ficha ----

add_action('transition_post_status', 'gsmadrid_email_bienvenida_colegiado', 10, 3);
function gsmadrid_email_bienvenida_colegiado($new_status, $old_status, $post) {
    if ($post->post_type !== 'profesional') return;
    if ($new_status !== 'publish') return;
    if ($old_status === 'publish') return;

    $user_id = get_post_meta($post->ID, '_profesional_user_id', true);
    if (!$user_id) return;

    $user = get_user_by('id', $user_id);
    if (!$user) return;

    $nombre = '';
    $numero = '';
    if (function_exists('get_field')) {
        $nombre = get_field('nombre_completo', $post->ID) ?: $user->display_name;
        $numero = get_field('numero_colegiado', $post->ID) ?: '';
    } else {
        $nombre = $user->display_name;
    }

    $data = gsmadrid_email_base_data($user);
    $data['nombre'] = $nombre;
    $data['numero'] = $numero;
    $data['tipo']   = 'colegiado';

    $body = gsmadrid_email_template($data);
    $headers = gsmadrid_email_headers();

    wp_mail($user->user_email, 'Bienvenido al Colegio de Graduados Sociales de Madrid', $body, $headers);
}

// ---- Precolegiado: al crear usuario ----

add_action('user_register', 'gsmadrid_email_bienvenida_precolegiado');
function gsmadrid_email_bienvenida_precolegiado($user_id) {
    $user = get_user_by('id', $user_id);
    if (!$user || !in_array('precolegiado', $user->roles, true)) return;

    $data = gsmadrid_email_base_data($user);
    $data['nombre'] = $user->display_name;
    $data['numero'] = '';
    $data['tipo']   = 'precolegiado';

    $body = gsmadrid_email_template($data);
    $headers = gsmadrid_email_headers();

    wp_mail($user->user_email, 'Bienvenido al Colegio de Graduados Sociales de Madrid', $body, $headers);
}

// ---- Helpers ----

function gsmadrid_email_headers() {
    return [
        'Content-Type: text/html; charset=UTF-8',
        'From: Colegio de Graduados Sociales de Madrid <admon@graduadosocialmadrid.org>',
    ];
}

function gsmadrid_email_base_data($user) {
    $reset_key = get_password_reset_key($user);
    $reset_url = '';
    if (!is_wp_error($reset_key)) {
        $reset_url = network_site_url("wp-login.php?action=rp&key={$reset_key}&login=" . rawurlencode($user->user_login), 'login');
    }

    $frontend_url = defined('GSMADRID_FRONTEND_URL')
        ? GSMADRID_FRONTEND_URL
        : 'https://gsmadrid-2-web.a7lflv.easypanel.host';

    return [
        'username'         => $user->user_login,
        'email'            => $user->user_email,
        'reset_url'        => $reset_url,
        'area_privada_url' => $frontend_url . '/area-privada',
        'directorio_url'   => $frontend_url . '/directorio',
        'formacion_url'    => $frontend_url . '/formacion-eventos',
        'colegiarse_url'   => $frontend_url . '/hazte-colegiado/colegiados',
        'logo_url'         => $frontend_url . '/logo.png',
    ];
}

/**
 * Plantilla HTML del email — adapta contenido segun tipo (colegiado/precolegiado).
 */
function gsmadrid_email_template($data) {
    $tipo             = $data['tipo'];
    $nombre           = esc_html($data['nombre']);
    $numero           = esc_html($data['numero'] ?? '');
    $username         = esc_html($data['username']);
    $email            = esc_html($data['email']);
    $reset_url        = esc_url($data['reset_url']);
    $area_privada_url = esc_url($data['area_privada_url']);
    $directorio_url   = esc_url($data['directorio_url']);
    $formacion_url    = esc_url($data['formacion_url']);
    $colegiarse_url   = esc_url($data['colegiarse_url']);
    $logo_url         = esc_url($data['logo_url']);

    // Badge
    $badge_text  = $tipo === 'colegiado' ? 'Bienvenido' : 'Precolegiado';
    $badge_color = $tipo === 'colegiado' ? '#2563EB' : '#18B7B0';

    // Intro
    $intro = $tipo === 'colegiado'
        ? 'Tu cuenta de colegiado ha sido activada. Ya puedes acceder al Area Privada de la web del Colegio.'
        : 'Tu cuenta de precolegiado ha sido creada. Ya puedes acceder al Area Privada y disfrutar de las ventajas exclusivas para futuros graduados sociales.';

    // Info card
    $numero_html = ($tipo === 'colegiado' && $numero)
        ? "<p style=\"margin:0 0 4px;font-size:14px;color:#6B7280;\">N.&ordm; de colegiado: <strong style=\"color:#0F172A;\">{$numero}</strong></p>"
        : '';

    $tipo_label = $tipo === 'colegiado' ? 'Profesional Colegiado' : 'Precolegiado';
    $tipo_html = "<p style=\"margin:0 0 4px;font-size:14px;color:#6B7280;\">Tipo: <strong style=\"color:#0F172A;\">{$tipo_label}</strong></p>";

    // CTA
    $reset_html = $reset_url
        ? "<a href=\"{$reset_url}\" style=\"display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#2F5BEA,#18B7B0);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;border-radius:40px;letter-spacing:0.02em;\">Establecer mi contrasena</a>"
        : '';

    // Steps
    if ($tipo === 'colegiado') {
        $steps = <<<STEPS
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#18B7B0);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">1</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            <strong style="color:#0F172A;">Establece tu contrasena</strong> usando el boton de arriba.
          </td>
        </tr>
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#18B7B0);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">2</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            <strong style="color:#0F172A;">Accede al Area Privada</strong> y completa tu perfil: foto, despacho, direccion, bio.
          </td>
        </tr>
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#18B7B0);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">3</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            <strong style="color:#0F172A;">Activa tu visibilidad</strong> en el directorio para que te encuentren en <a href="{$directorio_url}" style="color:#2563EB;text-decoration:underline;">/directorio</a>.
          </td>
        </tr>
STEPS;
    } else {
        $steps = <<<STEPS
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#18B7B0,#2563EB);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">1</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            <strong style="color:#0F172A;">Establece tu contrasena</strong> usando el boton de arriba.
          </td>
        </tr>
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#18B7B0,#2563EB);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">2</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            <strong style="color:#0F172A;">Accede al Area Privada</strong> para consultar formaciones, documentos y recursos del Colegio.
          </td>
        </tr>
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#18B7B0,#2563EB);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">3</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            <strong style="color:#0F172A;">Explora la formacion</strong> disponible con tarifas especiales en <a href="{$formacion_url}" style="color:#2563EB;text-decoration:underline;">formacion y eventos</a>.
          </td>
        </tr>
        <tr>
          <td width="36" valign="top" style="padding-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#18B7B0,#2563EB);color:#fff;font-size:12px;font-weight:800;text-align:center;line-height:28px;">4</div>
          </td>
          <td style="padding:4px 0 12px 12px;font-size:14px;color:#475569;line-height:1.5;">
            Cuando estes listo, <a href="{$colegiarse_url}" style="color:#2563EB;text-decoration:underline;font-weight:600;">hazte colegiado</a> para acceder a todos los servicios.
          </td>
        </tr>
STEPS;
    }

    return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bienvenido al Colegio</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F8FA;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F8FA;">
<tr><td align="center" style="padding:40px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">

  <tr>
    <td style="background:linear-gradient(135deg,#0F172A 0%,#1E293B 100%);padding:32px 40px;text-align:center;">
      <img src="{$logo_url}" alt="Colegio de Graduados Sociales de Madrid" width="200" style="display:inline-block;max-width:200px;height:auto;" />
    </td>
  </tr>

  <tr>
    <td align="center" style="padding:28px 40px 0;">
      <span style="display:inline-block;padding:5px 16px;background-color:{$badge_color};color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border-radius:40px;">{$badge_text}</span>
    </td>
  </tr>

  <tr>
    <td style="padding:20px 40px 0;text-align:center;">
      <h1 style="margin:0;font-size:26px;font-weight:800;color:#0F172A;line-height:1.3;">Hola, {$nombre}</h1>
      <p style="margin:12px 0 0;font-size:16px;font-weight:300;color:#475569;line-height:1.6;">{$intro}</p>
    </td>
  </tr>

  <tr>
    <td style="padding:24px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F8FA;border-radius:12px;border:1px solid #E2E8F0;">
        <tr>
          <td style="padding:20px 24px;">
            {$tipo_html}
            {$numero_html}
            <p style="margin:0 0 4px;font-size:14px;color:#6B7280;">Usuario: <strong style="color:#0F172A;">{$username}</strong></p>
            <p style="margin:0;font-size:14px;color:#6B7280;">Email: <strong style="color:#0F172A;">{$email}</strong></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td align="center" style="padding:0 40px 8px;">{$reset_html}</td></tr>

  <tr>
    <td align="center" style="padding:12px 40px 0;">
      <a href="{$area_privada_url}" style="font-size:14px;color:#2563EB;text-decoration:underline;font-weight:600;">Ir al Area Privada</a>
    </td>
  </tr>

  <tr>
    <td style="padding:28px 40px 0;">
      <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#0F172A;">Tus proximos pasos:</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        {$steps}
      </table>
    </td>
  </tr>

  <tr><td style="padding:8px 40px 0;"><div style="border-top:1px solid #E2E8F0;"></div></td></tr>

  <tr>
    <td style="padding:20px 40px;text-align:center;">
      <p style="margin:0;font-size:13px;color:#6B7280;line-height:1.6;">
        ¿Necesitas ayuda? Escribenos a
        <a href="mailto:admon@graduadosocialmadrid.org" style="color:#2563EB;text-decoration:none;font-weight:600;">admon@graduadosocialmadrid.org</a>
        o llamanos al <strong>91 523 08 88</strong>.
      </p>
    </td>
  </tr>

  <tr>
    <td style="background-color:#0E111B;padding:24px 40px;text-align:center;">
      <p style="margin:0 0 4px;font-size:13px;color:#94A3B8;font-weight:600;">Colegio Oficial de Graduados Sociales de Madrid</p>
      <p style="margin:0;font-size:12px;color:#64748B;">C/ Jose Abascal, 44 — 28003 Madrid</p>
    </td>
  </tr>

</table>

</td></tr>
</table>

</body>
</html>
HTML;
}
