#!/bin/bash
# -------------------------------------------------------------
# BEAST FITNESS FACTORY - 1-Click Launch Script for macOS
# -------------------------------------------------------------
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "================================================================"
echo " 🏋️  LAUNCHING BEAST FITNESS FACTORY WEBSITE"
echo "================================================================"
echo ""
echo "Opening website in your default browser..."
open "$DIR/standalone.html" || open "$DIR/index.html"

echo ""
echo "Also hosting live local HTTP server at:"
echo "👉 http://localhost:8000"
echo ""
echo "Press Ctrl + C to stop the server when done."
echo "================================================================"

python3 -m http.server 8000
