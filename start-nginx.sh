#!/bin/bash

# Dressed - Start with NGINX (Production-like)
# This script stops all previous processes and starts with NGINX

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Dressed - Starting with NGINX${NC}"
echo -e "${BLUE}================================${NC}"

# Kill all previous processes
echo -e "${BLUE}🧹 Stopping all previous processes...${NC}"
pkill -f "vite" 2>/dev/null || true
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

# Build the app
echo -e "${BLUE}📦 Building the app...${NC}"
npx vite build

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found!${NC}"
    echo -e "${YELLOW}Installing Docker...${NC}"
    
    if command -v brew &> /dev/null; then
        brew install --cask docker
        echo -e "${YELLOW}Please start Docker Desktop and run this script again${NC}"
    else
        echo -e "${YELLOW}Please install Docker Desktop from: https://www.docker.com/products/docker-desktop${NC}"
    fi
    exit 1
fi

# Start with Docker
echo -e "${BLUE}🐳 Starting NGINX container...${NC}"
cd ..
docker-compose up --build -d

echo ""
echo -e "${GREEN}🎉 Dressed app is running!${NC}"
echo -e "${GREEN}=========================${NC}"
echo ""
echo -e "${BLUE}🌐 Open your browser:${NC}"
echo -e "${YELLOW}  http://localhost:80${NC}"
echo ""
echo -e "${BLUE}📱 On your phone:${NC}"
echo -e "${YELLOW}  http://[YOUR_IP]:80${NC}"
echo ""
echo -e "${BLUE}🛠️  Management commands:${NC}"
echo -e "${YELLOW}  Stop: docker-compose down${NC}"
echo -e "${YELLOW}  Logs: docker-compose logs -f${NC}"
echo -e "${YELLOW}  Restart: docker-compose restart${NC}"
echo ""
