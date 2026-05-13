<?php
/**
 * CGSM Theme — Functions
 */

define('CGSM_VERSION', '1.0.0');
define('CGSM_DIR', get_stylesheet_directory());
define('CGSM_URI', get_stylesheet_directory_uri());

/* ── Assets ─────────────────────────────────────────── */
add_action('wp_enqueue_scripts', function () {
    // Parent
    wp_enqueue_style('hello-elementor', get_template_directory_uri() . '/style.css');

    // Google Font
    wp_enqueue_style(
        'plus-jakarta-sans',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
        [],
        null
    );

    // Theme
    wp_enqueue_style('cgsm-theme', CGSM_URI . '/assets/css/main.css', ['hello-elementor', 'plus-jakarta-sans'], CGSM_VERSION);
});

add_action('wp_head', function () {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . PHP_EOL;
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . PHP_EOL;
}, 1);

/* ── Hide Hello Elementor page title on front page ── */
add_filter('hello_elementor_page_title', function ($show) {
    return is_front_page() ? false : $show;
});

/* ── ACF helpers ────────────────────────────────────── */
function cgsm_field($name, $default = '') {
    if (!function_exists('get_field')) return $default;
    $val = get_field($name);
    return $val ?: $default;
}

function cgsm_img($name, $size = 'large') {
    if (!function_exists('get_field')) return '';
    $img = get_field($name);
    if (!$img) return '';
    if (is_array($img)) return $img['sizes'][$size] ?? $img['url'];
    return wp_get_attachment_image_url($img, $size) ?: '';
}
