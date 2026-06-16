#!/bin/bash
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "════════════════════════════════════════"
echo "  Portfolio — Dev Server"
echo "════════════════════════════════════════"
echo ""
echo "  http://localhost:5173"
echo ""
echo "  Edit frontend/public/portfolio.json"
echo "  to update content live."
echo "════════════════════════════════════════"
echo ""

cd "$ROOT/frontend" && npm run dev
