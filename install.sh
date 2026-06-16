#!/bin/bash
set -e

echo ""
echo "════════════════════════════════════════"
echo "  Portfolio — Install Dependencies"
echo "════════════════════════════════════════"
echo ""

# Python backend
echo "📦 Installing Python backend dependencies..."
cd "$(dirname "$0")/backend"
python3 -m pip install -r requirements.txt --quiet
echo "✅ Python dependencies installed."
echo ""

# Node frontend
echo "📦 Installing Node frontend dependencies..."
cd "$(dirname "$0")/frontend"
npm install
echo "✅ Node dependencies installed."
echo ""

echo "════════════════════════════════════════"
echo "  ✅ All done! Run: ./start.sh"
echo "════════════════════════════════════════"
