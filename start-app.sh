#!/bin/bash

# Dressed - Start App (Vite with fixed port)
# This script stops all previous processes and starts with Vite on port 3000

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Dressed - Starting App${NC}"
echo -e "${BLUE}========================${NC}"

# Kill all previous processes
echo -e "${BLUE}🧹 Stopping all previous processes...${NC}"
pkill -f "webpack" 2>/dev/null || true
pkill -f "node.*dev" 2>/dev/null || true
docker-compose down 2>/dev/null || true

echo -e "${GREEN}✅ All processes stopped${NC}"

# Check if we're in the right directory
if [ ! -d "dressed" ]; then
    echo -e "${RED}❌ Error: 'dressed' directory not found${NC}"
    echo -e "${YELLOW}Please run this script from the Fashionistas directory${NC}"
    exit 1
fi

cd dressed

# Start with Webpack on fixed port
echo -e "${BLUE}⚡ Starting Webpack development server on port 3000...${NC}"
npm run dev
