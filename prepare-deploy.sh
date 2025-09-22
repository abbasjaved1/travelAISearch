#!/bin/bash

# TravelAI Platform Deployment Preparation Script
echo "TravelAI Platform - Preparing for deployment..."

# Ensure dist directory exists
mkdir -p dist/server/services
mkdir -p dist/client
mkdir -p dist/public

# Step 1: Transpile server TypeScript files to JavaScript
echo "Transpiling server files..."
# Main server files
npx esbuild server/index.ts server/routes.ts server/auth.ts server/db.ts server/storage.ts server/vite.ts server/websocket.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/server

# Service files (if needed directly in deployment)
npx esbuild server/services/*.ts --platform=node --packages=external --format=esm --outdir=dist/server/services

# Shared files
npx esbuild shared/*.ts --platform=node --packages=external --format=esm --outdir=dist/server/shared

# Step 2: Run our deployment script
echo "Running deployment preparation script..."
node deploy.js

echo "Deployment preparation complete!"
echo "You can now deploy the application from the dist directory."
echo ""
echo "To start the server manually:"
echo "cd dist && NODE_ENV=production node server-starter.js"