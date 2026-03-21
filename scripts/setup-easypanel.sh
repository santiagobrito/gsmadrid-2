#!/bin/bash
# ============================================================
# GS Madrid 2 — EasyPanel Setup
# Creates project + WordPress + Next.js services
# ============================================================

set -euo pipefail

# Load env
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
GITHUB_REPO="https://github.com/santiagobrito/gsmadrid-2"

header="Authorization: Bearer $EASYPANEL_API_KEY"

# Helper: tRPC mutation
trpc_post() {
    local endpoint="$1"
    local body="$2"
    echo "→ POST $endpoint"
    curl -s -X POST "$API/$endpoint" \
        -H "$header" \
        -H "Content-Type: application/json" \
        -d "{\"json\": $body}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(json.dumps(d.get('result',{}).get('data',{}).get('json',d), indent=2))" 2>/dev/null || true
    echo ""
}

# Helper: tRPC query
trpc_get() {
    local endpoint="$1"
    local input="$2"
    echo "→ GET $endpoint"
    local encoded=$(python3 -c "import urllib.parse,json; print(urllib.parse.quote(json.dumps({'json': $input})))")
    curl -s "$API/$endpoint?input=$encoded" \
        -H "$header" | python3 -c "import sys,json; d=json.load(sys.stdin); print(json.dumps(d.get('result',{}).get('data',{}).get('json',d), indent=2))" 2>/dev/null || true
    echo ""
}

echo "============================================"
echo "  GS Madrid 2 — EasyPanel Setup"
echo "============================================"
echo ""

# 1. Check if we can create a project
echo "1. Checking project availability..."
trpc_get "projects.canCreateProject" "{}"

# 2. Create project
echo "2. Creating project '$PROJECT'..."
trpc_post "projects.createProject" "{\"name\": \"$PROJECT\"}"
sleep 2

# 3. Create WordPress service (auto-creates MariaDB companion)
echo "3. Creating WordPress service..."
trpc_post "services.wordpress.createService" "{\"projectName\": \"$PROJECT\", \"serviceName\": \"wordpress\"}"
sleep 5

# 4. CRITICAL: Fix nginx + PHP upload limits BEFORE anything else
echo "4. Fixing nginx/PHP upload limits (CRITICAL for ACF Pro upload)..."
trpc_post "services.wordpress.runScript" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"script\": \"#!/bin/bash\nset -e\n\n# Fix nginx client_max_body_size\nif [ -f /etc/nginx/nginx.conf ]; then\n    sed -i 's/client_max_body_size.*/client_max_body_size 256M;/' /etc/nginx/nginx.conf\n    if ! grep -q 'client_max_body_size' /etc/nginx/nginx.conf; then\n        sed -i '/http {/a \\    client_max_body_size 256M;' /etc/nginx/nginx.conf\n    fi\nfi\n\n# Fix nginx site config\nfor f in /etc/nginx/conf.d/*.conf /etc/nginx/sites-enabled/*; do\n    if [ -f \\\"\\$f\\\" ]; then\n        if ! grep -q 'client_max_body_size' \\\"\\$f\\\"; then\n            sed -i '/server {/a \\    client_max_body_size 256M;' \\\"\\$f\\\"\n        fi\n    fi\ndone\n\n# Fix PHP upload limits\nPHP_INI=\\$(php -r 'echo php_ini_loaded_file();' 2>/dev/null || echo '/usr/local/etc/php/php.ini')\nPHP_DIR=\\$(dirname \\\"\\$PHP_INI\\\")\nmkdir -p \\\"\\$PHP_DIR/conf.d\\\"\ncat > \\\"\\$PHP_DIR/conf.d/uploads.ini\\\" <<PHPEOF\nupload_max_filesize = 256M\npost_max_size = 256M\nmemory_limit = 512M\nmax_execution_time = 300\nPHPEOF\n\n# Restart services\nnginx -s reload 2>/dev/null || true\nkill -USR2 1 2>/dev/null || true\necho 'Upload limits fixed.'\"
}"
sleep 3

# 5. Create WordPress domain
echo "5. Creating WordPress domain..."
trpc_post "domains.createDomain" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"wordpress\",
    \"host\": \"$PROJECT-wordpress.$SERVER_ID.easypanel.host\"
}"
sleep 2

# 6. Wait for WordPress to be accessible
echo "6. Waiting for WordPress to be accessible..."
WP_URL="https://$PROJECT-wordpress.$SERVER_ID.easypanel.host"
for i in $(seq 1 30); do
    if curl -s -o /dev/null -w "%{http_code}" "$WP_URL" | grep -qE "200|301|302"; then
        echo "   WordPress is up!"
        break
    fi
    echo "   Waiting... ($i/30)"
    sleep 10
done

# 7. Create Next.js app service
echo "7. Creating Next.js app service..."
trpc_post "services.app.createService" "{\"projectName\": \"$PROJECT\", \"serviceName\": \"web\"}"
sleep 3

# 8. Connect GitHub
echo "8. Connecting GitHub repo..."
trpc_post "services.app.updateSourceGithub" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"web\",
    \"owner\": \"santiagobrito\",
    \"repo\": \"gsmadrid-2\",
    \"ref\": \"main\",
    \"path\": \"/\",
    \"autoDeploy\": true
}"
sleep 2

# 9. Configure build (Dockerfile in frontend/)
echo "9. Configuring Dockerfile build..."
trpc_post "services.app.updateBuild" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"web\",
    \"type\": \"dockerfile\",
    \"file\": \"frontend/Dockerfile\",
    \"path\": \"frontend\"
}"
sleep 2

# 10. Set environment variables
echo "10. Setting environment variables..."
trpc_post "services.app.updateEnv" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"web\",
    \"env\": \"NEXT_PUBLIC_WORDPRESS_URL=https://$PROJECT-wordpress.$SERVER_ID.easypanel.host\nNEXT_PUBLIC_SITE_URL=https://$PROJECT-web.$SERVER_ID.easypanel.host\nNEXT_PUBLIC_GRAPHQL_URL=https://$PROJECT-wordpress.$SERVER_ID.easypanel.host/graphql\nHOSTNAME=0.0.0.0\nPORT=3000\"
}"
sleep 2

# 11. Create web domain
echo "11. Creating web domain..."
trpc_post "domains.createDomain" "{
    \"projectName\": \"$PROJECT\",
    \"serviceName\": \"web\",
    \"host\": \"$PROJECT-web.$SERVER_ID.easypanel.host\"
}"
sleep 2

# 12. Deploy
echo "12. Deploying frontend..."
trpc_post "services.app.deployService" "{\"projectName\": \"$PROJECT\", \"serviceName\": \"web\"}"

echo ""
echo "============================================"
echo "  Setup complete!"
echo "  WordPress: https://$PROJECT-wordpress.$SERVER_ID.easypanel.host"
echo "  Frontend:  https://$PROJECT-web.$SERVER_ID.easypanel.host"
echo "============================================"
