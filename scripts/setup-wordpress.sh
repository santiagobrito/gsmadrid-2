#!/bin/bash
# ============================================================
# GS Madrid 2 — WordPress Post-Installation Setup
# Installs plugins, theme, configures permalinks
# Run AFTER setup-easypanel.sh and WordPress is accessible
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if [ -f "$PROJECT_ROOT/.env" ]; then
    source "$PROJECT_ROOT/.env"
fi

: "${EASYPANEL_API_KEY:?Set EASYPANEL_API_KEY in .env}"
PANEL_URL="${EASYPANEL_URL:-https://panel.baitcore.com}"
API="$PANEL_URL/api/trpc"
PROJECT="gsmadrid-2"
SERVER_ID="a7lflv"
WP_URL="https://$PROJECT-wordpress.$SERVER_ID.easypanel.host"

header="Authorization: Bearer $EASYPANEL_API_KEY"

trpc_post() {
    local endpoint="$1"
    local body="$2"
    echo "→ $endpoint"
    curl -s -X POST "$API/$endpoint" \
        -H "$header" \
        -H "Content-Type: application/json" \
        -d "{\"json\": $body}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(json.dumps(d.get('result',{}).get('data',{}).get('json',d), indent=2))" 2>/dev/null || true
    echo ""
}

echo "============================================"
echo "  GS Madrid 2 — WordPress Setup"
echo "============================================"
echo ""

# 1. Complete WordPress install via WP-CLI
echo "1. Completing WordPress installation..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\nwp core install --url='$WP_URL' --title='Colegio Oficial de Graduados Sociales de Madrid' --admin_user=admin --admin_password=\$(openssl rand -base64 16) --admin_email=santiagobrito@gmail.com --skip-email --allow-root\necho 'WordPress installed. Admin password shown above — SAVE IT.'\"
}"
sleep 5

# 2. Install WPGraphQL from wordpress.org
echo "2. Installing WPGraphQL..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\nwp plugin install wp-graphql --activate --allow-root\necho 'WPGraphQL installed and activated.'\"
}"
sleep 3

# 3. Install WPGraphQL for ACF
echo "3. Installing WPGraphQL for ACF..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\nwp plugin install wpgraphql-acf --activate --allow-root\necho 'WPGraphQL for ACF installed and activated.'\"
}"
sleep 3

# 4. Upload and install ACF Pro (from zip — chunked if needed)
echo "4. Uploading ACF Pro..."
echo "   NOTE: ACF Pro zip must be uploaded manually via WP admin if this fails."
echo "   File: $PROJECT_ROOT/advanced-custom-fields-pro_6.7.0.2.zip"
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\n# Try to download and install ACF Pro from URL if available\n# Otherwise install from wp-admin manually\ncd /var/www/html/wp-content/plugins/\nif [ ! -d 'advanced-custom-fields-pro' ]; then\n    echo 'ACF Pro not found. Please upload via WP Admin > Plugins > Add New > Upload.'\n    echo 'Use the zip file: advanced-custom-fields-pro_6.7.0.2.zip'\nelse\n    wp plugin activate advanced-custom-fields-pro --allow-root\n    echo 'ACF Pro already installed and activated.'\nfi\"
}"
sleep 2

# 5. Upload and activate theme
echo "5. Uploading headless theme..."
echo "   NOTE: Theme must be uploaded via WP admin or FTP."
echo "   Theme folder: $PROJECT_ROOT/wordpress/theme/gsmadrid-headless/"
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\n# Create theme directory if it doesn't exist\nmkdir -p /var/www/html/wp-content/themes/gsmadrid-headless/acf-json\n\n# Check if theme exists\nif [ -f '/var/www/html/wp-content/themes/gsmadrid-headless/style.css' ]; then\n    wp theme activate gsmadrid-headless --allow-root\n    echo 'Theme activated.'\nelse\n    echo 'Theme files not found. Upload via WP Admin or FTP.'\n    echo 'Theme directory created at /var/www/html/wp-content/themes/gsmadrid-headless/'\nfi\"
}"
sleep 2

# 6. Configure permalinks
echo "6. Setting permalinks to /%postname%/..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\nwp rewrite structure '/%postname%/' --allow-root\nwp rewrite flush --allow-root\necho 'Permalinks set to /%postname%/'\"
}"
sleep 2

# 7. Configure WordPress settings
echo "7. Configuring WordPress settings..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\n# Timezone\nwp option update timezone_string 'Europe/Madrid' --allow-root\n# Date format\nwp option update date_format 'd/m/Y' --allow-root\n# Language\nwp language core install es_ES --allow-root\nwp site switch-language es_ES --allow-root\n# Discourage search engines (staging)\nwp option update blog_public 0 --allow-root\necho 'Settings configured.'\"
}"
sleep 2

# 8. Create default taxonomy terms
echo "8. Creating default taxonomy terms..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\n\n# Modalidades\nwp term create modalidad 'Presencial' --allow-root 2>/dev/null || true\nwp term create modalidad 'Online' --allow-root 2>/dev/null || true\nwp term create modalidad 'Hibrido' --allow-root 2>/dev/null || true\n\n# Areas Formativas\nwp term create area_formativa 'Laboral' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Fiscal' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Seguridad Social' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Contable' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Juridico' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Prevencion de Riesgos' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Extranjeria' --allow-root 2>/dev/null || true\nwp term create area_formativa 'Mediacion' --allow-root 2>/dev/null || true\n\n# Especialidades\nwp term create especialidad 'Laboral' --allow-root 2>/dev/null || true\nwp term create especialidad 'Fiscal' --allow-root 2>/dev/null || true\nwp term create especialidad 'Seguridad Social' --allow-root 2>/dev/null || true\nwp term create especialidad 'Prevencion de Riesgos Laborales' --allow-root 2>/dev/null || true\nwp term create especialidad 'Extranjeria' --allow-root 2>/dev/null || true\nwp term create especialidad 'Mediacion' --allow-root 2>/dev/null || true\nwp term create especialidad 'Contable' --allow-root 2>/dev/null || true\n\n# Localidades (principales Madrid)\nwp term create localidad 'Madrid Capital' --allow-root 2>/dev/null || true\nwp term create localidad 'Alcala de Henares' --allow-root 2>/dev/null || true\nwp term create localidad 'Getafe' --allow-root 2>/dev/null || true\nwp term create localidad 'Leganes' --allow-root 2>/dev/null || true\nwp term create localidad 'Mostoles' --allow-root 2>/dev/null || true\nwp term create localidad 'Alcorcon' --allow-root 2>/dev/null || true\nwp term create localidad 'Fuenlabrada' --allow-root 2>/dev/null || true\nwp term create localidad 'Torrejon de Ardoz' --allow-root 2>/dev/null || true\n\necho 'Taxonomy terms created.'\"
}"

echo ""
echo "============================================"
echo "  WordPress setup complete!"
echo "  Admin: $WP_URL/wp-admin"
echo ""
echo "  MANUAL STEPS REQUIRED:"
echo "  1. Upload ACF Pro zip via WP Admin > Plugins"
echo "  2. Upload theme via WP Admin or copy files"
echo "  3. Activate ACF Pro license"
echo "  4. Verify GraphQL endpoint: $WP_URL/graphql"
echo "============================================"
