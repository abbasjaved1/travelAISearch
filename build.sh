#!/bin/bash
set -e

echo "Starting build process for TravelAI application..."

# Clean old build artifacts
echo "Cleaning previous build..."
rm -rf dist/

# Create necessary directories
mkdir -p dist/client dist/public dist/server

# Build the frontend 
echo "Building frontend assets with Vite..."
NODE_ENV=production npx vite build

# Build the server
echo "Building server with esbuild..."
NODE_ENV=production npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/server

# Copy services and shared folders
echo "Copying server services and shared code..."
cp -r server/services dist/server/
cp -r shared dist/server/

# Copy public assets
echo "Copying public assets..."
cp -r public/* dist/public/ 2>/dev/null || :

# Make sure the client directory exists and has a copy of index.html
echo "Setting up client directory..."
if [ -f dist/public/index.html ]; then
  cp dist/public/index.html dist/client/
fi

# Set permissions
chmod +x dist/server/index.js

echo "Build complete! Run with: NODE_ENV=production node --experimental-modules dist/server/index.js"