<?php
/**
 * GS Madrid Headless — functions.php
 *
 * Hub file: only requires, no logic.
 * Each module lives in inc/ for maintainability.
 */

// CPTs, taxonomias, nav menus, image sizes
require_once __DIR__ . '/inc/cpt.php';

// ACF Pro: JSON sync, options page, GraphQL support
require_once __DIR__ . '/inc/acf.php';

// CORS headers for Next.js frontend
require_once __DIR__ . '/inc/cors.php';

// Headless config: redirects, clean head, disable Gutenberg/XML-RPC
require_once __DIR__ . '/inc/headless.php';

// Auth: roles, user↔profesional linking, token validation, login/me/profile routes
require_once __DIR__ . '/inc/auth.php';

// Email de bienvenida al publicar ficha de profesional
require_once __DIR__ . '/inc/email-bienvenida.php';

// REST API endpoints
require_once __DIR__ . '/inc/api/inscripcion.php';
require_once __DIR__ . '/inc/api/contacto.php';
require_once __DIR__ . '/inc/api/colegiacion.php';
