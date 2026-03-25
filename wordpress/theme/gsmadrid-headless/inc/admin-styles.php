<?php
/**
 * Custom admin menu colors for key menu items
 */

add_action('admin_head', 'gsmadrid_admin_menu_colors');

function gsmadrid_admin_menu_colors() {
    ?>
    <style>
        /* Entradas (edit.php) — Azul primario */
        #adminmenu li.menu-top a[href="edit.php"],
        #adminmenu li.menu-top a[href="edit.php"] .wp-menu-name {
            color: #fff !important;
        }
        #adminmenu li.menu-top a[href="edit.php"] {
            background: #2563EB !important;
            border-radius: 6px;
            margin: 2px 8px;
        }
        #adminmenu li.menu-top a[href="edit.php"]:hover {
            background: #1D4ED8 !important;
        }
        #adminmenu li.menu-top a[href="edit.php"] .wp-menu-image::before {
            color: #fff !important;
        }

        /* Formación (edit.php?post_type=formacion) — Verde */
        #adminmenu li.menu-top a[href="edit.php?post_type=formacion"],
        #adminmenu li.menu-top a[href="edit.php?post_type=formacion"] .wp-menu-name {
            color: #fff !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=formacion"] {
            background: #059669 !important;
            border-radius: 6px;
            margin: 2px 8px;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=formacion"]:hover {
            background: #047857 !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=formacion"] .wp-menu-image::before {
            color: #fff !important;
        }

        /* Inscripciones (gsmadrid-inscripciones) — Naranja */
        #adminmenu li.menu-top a[href="admin.php?page=gsmadrid-inscripciones"],
        #adminmenu li.menu-top a[href="admin.php?page=gsmadrid-inscripciones"] .wp-menu-name {
            color: #fff !important;
        }
        #adminmenu li.menu-top a[href="admin.php?page=gsmadrid-inscripciones"] {
            background: #D97706 !important;
            border-radius: 6px;
            margin: 2px 8px;
        }
        #adminmenu li.menu-top a[href="admin.php?page=gsmadrid-inscripciones"]:hover {
            background: #B45309 !important;
        }
        #adminmenu li.menu-top a[href="admin.php?page=gsmadrid-inscripciones"] .wp-menu-image::before {
            color: #fff !important;
        }

        /* Eventos (edit.php?post_type=evento) — Morado */
        #adminmenu li.menu-top a[href="edit.php?post_type=evento"],
        #adminmenu li.menu-top a[href="edit.php?post_type=evento"] .wp-menu-name {
            color: #fff !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=evento"] {
            background: #7C3AED !important;
            border-radius: 6px;
            margin: 2px 8px;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=evento"]:hover {
            background: #6D28D9 !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=evento"] .wp-menu-image::before {
            color: #fff !important;
        }

        /* Profesionales (edit.php?post_type=profesional) — Teal */
        #adminmenu li.menu-top a[href="edit.php?post_type=profesional"],
        #adminmenu li.menu-top a[href="edit.php?post_type=profesional"] .wp-menu-name {
            color: #fff !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=profesional"] {
            background: #0D9488 !important;
            border-radius: 6px;
            margin: 2px 8px;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=profesional"]:hover {
            background: #0F766E !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=profesional"] .wp-menu-image::before {
            color: #fff !important;
        }

        /* Junta de Gobierno (edit.php?post_type=miembro_junta) — Slate oscuro */
        #adminmenu li.menu-top a[href="edit.php?post_type=miembro_junta"],
        #adminmenu li.menu-top a[href="edit.php?post_type=miembro_junta"] .wp-menu-name {
            color: #fff !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=miembro_junta"] {
            background: #475569 !important;
            border-radius: 6px;
            margin: 2px 8px;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=miembro_junta"]:hover {
            background: #334155 !important;
        }
        #adminmenu li.menu-top a[href="edit.php?post_type=miembro_junta"] .wp-menu-image::before {
            color: #fff !important;
        }
    </style>
    <?php
}
