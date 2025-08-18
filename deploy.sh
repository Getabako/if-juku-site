#!/bin/bash

echo "Starting deployment..."

# Create a temporary build if main build doesn't exist
if [ ! -f "build/index.html" ]; then
  echo "Creating emergency build..."
  # Copy from root if it exists
  if [ -f "index.html" ]; then
    cp index.html build/
    cp -r static build/ 2>/dev/null || true
    cp asset-manifest.json build/ 2>/dev/null || true
  fi
fi

# Deploy using gh-pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d build --message "Deploy with message background fix"

echo "Deployment complete!"