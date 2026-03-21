#!/bin/bash
# ============================================================
# GS Madrid 2 — Deploy Frontend
# Triggers a new deployment of the Next.js app on EasyPanel
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

header="Authorization: Bearer $EASYPANEL_API_KEY"

echo "Deploying frontend..."
curl -s -X POST "$API/services.app.deployService" \
    -H "$header" \
    -H "Content-Type: application/json" \
    -d "{\"json\": {\"projectName\": \"$PROJECT\", \"serviceName\": \"web\"}}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(json.dumps(d.get('result',{}).get('data',{}).get('json',d), indent=2))" 2>/dev/null || true

echo ""
echo "Deploy triggered. Check progress at:"
echo "  https://panel.baitcore.com/projects/$PROJECT/services/web"
