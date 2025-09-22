#!/bin/bash
# Custom Domain Connection Tester
# Usage: bash test-custom-domain.sh [domain]

# Default domain to test if none provided
DOMAIN=${1:-"aitravelglobe.com"}
echo "Testing connectivity to $DOMAIN..."

# Test basic HTTP connection
echo -e "\n=== HTTP Basic Connection Test ==="
curl -I -s "https://$DOMAIN" | head -n 20

# Test special diagnostic endpoint
echo -e "\n=== Testing Diagnostic Endpoint ==="
if curl -s "https://$DOMAIN/aitravelglobe-status" > /dev/null; then
  echo "✓ Diagnostic endpoint is responding!"
  curl -s "https://$DOMAIN/aitravelglobe-status" | jq || echo "JSON parsing failed, but received response"
else
  echo "✗ Could not connect to diagnostic endpoint"
  echo "Trying with plain HTTP instead of HTTPS..."
  curl -s "http://$DOMAIN/aitravelglobe-status" | jq || echo "HTTP connection failed too"
fi

# Test the API health endpoint
echo -e "\n=== Testing API Health Endpoint ==="
if curl -s "https://$DOMAIN/api/health" > /dev/null; then
  echo "✓ API health endpoint is responding!"
  curl -s "https://$DOMAIN/api/health" | jq || echo "JSON parsing failed, but received response"
else
  echo "✗ Could not connect to API health endpoint"
fi

# Test WebSocket connection
echo -e "\n=== Testing Socket.IO Endpoint ==="
curl -I -s "https://$DOMAIN/socket.io/" | head -n 20

# Test deployment diagnostics endpoint
echo -e "\n=== Testing Deployment Diagnostics Endpoint ==="
if curl -s "https://$DOMAIN/api/deployment-diagnostics" > /dev/null; then
  echo "✓ Deployment diagnostics endpoint is responding!"
  curl -s "https://$DOMAIN/api/deployment-diagnostics" | jq || echo "JSON parsing failed, but received response"
else
  echo "✗ Could not connect to deployment diagnostics endpoint"
fi

echo -e "\n=== DNS Information ==="
dig +short $DOMAIN
echo ""
dig +short CNAME $DOMAIN
echo ""

echo -e "\n=== Testing connectivity to Replit directly ==="
# Use the Replit URL instead
REPLIT_URL=$(echo $DOMAIN | sed 's/\./-/g')
REPLIT_URL="$REPLIT_URL.replit.app"
echo "Testing $REPLIT_URL..."
curl -I -s "https://$REPLIT_URL" | head -n 20

echo -e "\nTests completed. If you're getting 502 errors but some endpoints work, check:"
echo "1. Replit's SSL certificate configuration"
echo "2. Your DNS records (should point to Replit's infrastructure)"
echo "3. The Replit deployment logs for server startup errors"
echo "4. Try clearing browser cache or using incognito mode"