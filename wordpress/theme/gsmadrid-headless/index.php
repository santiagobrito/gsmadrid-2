<?php
/**
 * GS Madrid Headless Theme
 *
 * Este tema no tiene frontend — redirige al sitio Next.js.
 */

$frontend_url = defined('FRONTEND_URL') ? FRONTEND_URL : 'https://gsmadrid-2-web.a7lflv.easypanel.host';

wp_redirect($frontend_url, 301);
exit;
