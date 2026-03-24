<?php
/**
 * Custom Post Types + Taxonomias + Nav Menus + Image Sizes
 */

add_action('init', 'gsmadrid_register_cpts');

function gsmadrid_register_cpts() {

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

// Taxonomias
add_action('init', 'gsmadrid_register_taxonomies');

function gsmadrid_register_taxonomies() {

    register_taxonomy('modalidad', ['formacion'], [
        'labels'              => ['name' => 'Modalidades', 'singular_name' => 'Modalidad'],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'modalidad',
        'graphql_plural_name' => 'modalidades',
        'rewrite'             => ['slug' => 'modalidad'],
    ]);

    register_taxonomy('area_formativa', ['formacion'], [
        'labels'              => ['name' => 'Areas Formativas', 'singular_name' => 'Area Formativa'],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'areaFormativa',
        'graphql_plural_name' => 'areasFormativas',
        'rewrite'             => ['slug' => 'area-formativa'],
    ]);

    register_taxonomy('especialidad', ['profesional'], [
        'labels'              => ['name' => 'Especialidades', 'singular_name' => 'Especialidad'],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'especialidad',
        'graphql_plural_name' => 'especialidades',
        'rewrite'             => ['slug' => 'especialidad'],
    ]);

    register_taxonomy('localidad', ['profesional'], [
        'labels'              => ['name' => 'Localidades', 'singular_name' => 'Localidad'],
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'localidad',
        'graphql_plural_name' => 'localidades',
        'rewrite'             => ['slug' => 'localidad'],
    ]);
}

// Nav menus
add_action('after_setup_theme', 'gsmadrid_register_menus');
function gsmadrid_register_menus() {
    register_nav_menus(['primary' => 'Menu Principal', 'footer' => 'Menu Footer']);
}

// Image sizes
add_action('after_setup_theme', 'gsmadrid_image_sizes');
function gsmadrid_image_sizes() {
    add_theme_support('post-thumbnails');
    add_image_size('card', 400, 260, true);
    add_image_size('blog', 800, 450, true);
    add_image_size('hero', 1920, 900, true);
}
