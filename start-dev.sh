#!/bin/bash

# Kill any existing watcher processes
pkill -f "node scripts/watch.js" 2>/dev/null || true

# Start the development watcher
echo "🚀 Starting development watcher..."
echo "📁 Watching: config/typography-config.json and src/*.scss"
echo "🛑 Press Ctrl+C to stop"
echo ""

npm run dev 