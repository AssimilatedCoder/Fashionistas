#!/bin/bash

# Dressed MVP - The Only Installer You Need
# This script just works - no bullshit

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🚀 Dressed MVP - Installer${NC}"
echo -e "${PURPLE}===========================${NC}"

# Check if we're in the right directory
if [ ! -d "dressed" ]; then
    echo -e "${RED}❌ Error: 'dressed' directory not found${NC}"
    echo -e "${YELLOW}Please run this script from the Fashionistas directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found dressed directory${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found!${NC}"
    echo -e "${YELLOW}Installing Node.js...${NC}"
    
    # Detect architecture
    ARCH=$(uname -m)
    if [[ "$ARCH" == "arm64" ]]; then
        NODE_URL="https://nodejs.org/dist/v20.10.0/node-v20.10.0-darwin-arm64.tar.gz"
        NODE_DIR="node-v20.10.0-darwin-arm64"
    else
        NODE_URL="https://nodejs.org/dist/v20.10.0/node-v20.10.0-darwin-x64.tar.gz"
        NODE_DIR="node-v20.10.0-darwin-x64"
    fi
    
    echo -e "${BLUE}Downloading Node.js for $ARCH...${NC}"
    curl -o node.tar.gz "$NODE_URL"
    
    echo -e "${BLUE}Extracting Node.js...${NC}"
    tar -xzf node.tar.gz
    
    echo -e "${BLUE}Installing Node.js...${NC}"
    # Install Node.js in user directory (no sudo needed)
    mkdir -p ~/nodejs
    cp -r $NODE_DIR/* ~/nodejs/
    
    # Add to PATH for current session
    export PATH="$HOME/nodejs/bin:$PATH"
    
    # Add to PATH permanently
    if ! grep -q 'export PATH="$HOME/nodejs/bin:$PATH"' ~/.zshrc; then
        echo 'export PATH="$HOME/nodejs/bin:$PATH"' >> ~/.zshrc
    fi
    
    # Clean up
    rm -rf node.tar.gz $NODE_DIR
    
    # Verify installation
    if command -v node &> /dev/null; then
        echo -e "${GREEN}✅ Node.js installed successfully: $(node --version)${NC}"
    else
        echo -e "${RED}❌ Node.js installation failed${NC}"
        echo -e "${YELLOW}Please restart your terminal and run this script again${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
fi

# Go to dressed directory
cd dressed

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Set up environment
echo -e "${BLUE}⚙️  Setting up environment...${NC}"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp env.example .env
    echo -e "${GREEN}✅ Environment file created${NC}"
fi

# Create .env.local for development (idempotent)
cat > .env.local << 'EOF'
REACT_APP_NAME=Dressed
REACT_APP_VERSION=1.0.0
REACT_APP_ENV=development
REACT_APP_WEATHER_API_KEY=demo_key_for_testing
EOF

echo -e "${GREEN}✅ Development environment configured${NC}"

# Create mock data directory
mkdir -p src/data

# Create mock data (idempotent overwrite)
cat > src/data/mockTrends.ts << 'EOF'
import { Trend } from '../types'

export const mockTrends: Trend[] = [
  {
    id: 'trend-1',
    title: "Fall's Hottest Color: Burgundy",
    description: "Deep burgundy is taking over this season. Perfect for creating sophisticated looks.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop",
    category: "Color Trends",
    tags: ["burgundy", "fall", "sophisticated", "color"],
    createdAt: new Date().toISOString(),
    likes: 234,
    saved: false
  },
  {
    id: 'trend-2',
    title: "Oversized Blazers",
    description: "How to style oversized blazers for any occasion. The perfect layering piece.",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "Styling Tips",
    tags: ["blazers", "oversized", "layering", "professional"],
    createdAt: new Date().toISOString(),
    likes: 456,
    saved: false
  },
  {
    id: 'trend-3',
    title: "3 Ways to Style a White Blouse",
    description: "Transform your basic white blouse with these simple styling tricks.",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "Outfit Formulas",
    tags: ["white blouse", "styling", "versatile", "basic"],
    createdAt: new Date().toISOString(),
    likes: 189,
    saved: false
  }
]

export const mockWardrobeItems = [
  {
    id: 'item-1',
    photoUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop',
    category: 'tops' as const,
    colors: ['white', 'cream'],
    season: ['spring', 'summer'] as const,
    formality: 'semi-formal' as const,
    tags: ['blouse', 'work', 'favorite'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'item-2',
    photoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
    category: 'bottoms' as const,
    colors: ['black', 'navy'],
    season: ['fall', 'winter'] as const,
    formality: 'casual' as const,
    tags: ['jeans', 'denim', 'comfortable'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'item-3',
    photoUrl: 'https://images.unsplash.com/photo-1542295669297-4c352b042659?w=300&h=300&fit=crop',
    category: 'shoes' as const,
    colors: ['black', 'brown'],
    season: ['spring', 'fall'] as const,
    formality: 'semi-formal' as const,
    tags: ['boots', 'leather', 'versatile'],
    createdAt: new Date().toISOString()
  }
]
EOF

echo -e "${GREEN}✅ Mock data created${NC}"

# Do NOT modify source files for mock data here; code is already in repo
echo -e "${GREEN}✅ Mock data prepared${NC}"

echo ""
echo -e "${PURPLE}🎉 INSTALLATION COMPLETE!${NC}"
echo -e "${PURPLE}========================${NC}"
echo ""
echo -e "${GREEN}Your Dressed MVP is ready!${NC}"
echo ""
echo -e "${BLUE}Serving via NGINX container:${NC}"
echo -e "${YELLOW}  http://localhost:80${NC}"
echo ""
echo -e "${BLUE}Features ready to test:${NC}"
echo -e "${YELLOW}• Onboarding flow with style preferences${NC}"
echo -e "${YELLOW}• Digital wardrobe with mock items${NC}"
echo -e "${YELLOW}• Outfit generator with AI suggestions${NC}"
echo -e "${YELLOW}• Trends feed with fashion inspiration${NC}"
echo -e "${YELLOW}• Profile management${NC}"
echo ""
echo -e "${BLUE}For real weather data:${NC}"
echo -e "${YELLOW}• Get free API key from: https://openweathermap.org/api${NC}"
echo -e "${YELLOW}• Add to .env.local file${NC}"
echo ""

# Kill any existing processes
echo -e "${BLUE}🧹 Cleaning up previous processes...${NC}"
pkill -f "webpack" 2>/dev/null || true
pkill -f "node.*dev" 2>/dev/null || true
docker-compose down 2>/dev/null || true

echo -e "${GREEN}✅ Previous processes stopped${NC}"

echo -e "${BLUE}🚀 Building and starting with NGINX...${NC}"

# Build the app
echo -e "${BLUE}Building app...${NC}"
npm run build

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found!${NC}"
    echo -e "${YELLOW}Please install Docker Desktop from: https://www.docker.com/products/docker-desktop${NC}"
    echo -e "${YELLOW}Then run: docker-compose up${NC}"
    exit 1
fi

# Start with Docker (no-cache build, force recreate)
echo -e "${BLUE}Starting NGINX container (no-cache build)...${NC}"
docker-compose build --no-cache --pull
docker-compose up -d --force-recreate

echo -e "${GREEN}🎉 App is running on http://localhost:80${NC}"
echo -e "${BLUE}To stop: docker-compose down${NC}"
echo -e "${BLUE}To view logs: docker-compose logs -f${NC}"