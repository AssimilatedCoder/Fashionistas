# Dressed MVP - Installation Guide

This guide will help you install and run the Dressed MVP application on your macOS development machine.

## 🚀 Quick Start (Recommended)

### Option 1: Automated Installation
Run the comprehensive installation script:

```bash
./install-dressed.sh
```

This script will:
- ✅ Check system requirements
- ✅ Install Homebrew (if needed)
- ✅ Install Node.js and npm
- ✅ Install all project dependencies
- ✅ Set up environment variables
- ✅ Create mock data for testing
- ✅ Start the development server

### Option 2: Simple Installation
If you encounter issues with the main script:

```bash
./install-simple.sh
```

This is a simpler version that assumes Node.js is already installed.

## 📋 Manual Installation

If you prefer to install manually or troubleshoot issues:

### Prerequisites
- macOS (tested on macOS 10.15+)
- Terminal access
- Internet connection

### Step 1: Install Node.js
```bash
# Using Homebrew (recommended)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node

# Or download from https://nodejs.org/
```

### Step 2: Install Dependencies
```bash
cd dressed
npm install
```

### Step 3: Environment Setup
```bash
# Copy environment template
cp env.example .env

# Create development environment
cat > .env.local << EOF
VITE_APP_NAME=Dressed
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
VITE_WEATHER_API_KEY=demo_key_for_testing
EOF
```

### Step 4: Start Development Server
```bash
npm run dev
```

## 🌐 Access the Application

Once the server is running:
- Open your browser
- Navigate to: `http://localhost:5173`
- Complete the onboarding process
- Start testing the features!

## 🧪 Testing Features

The MVP includes these features for testing:

### 1. Onboarding Flow
- Style preference questionnaire
- Color preferences setup
- Comfort level configuration
- Location setup

### 2. Digital Wardrobe
- Upload clothing items (with mock AI categorization)
- Filter by category, color, season
- Grid/list view options
- Item management

### 3. Outfit Generator
- Weather-based suggestions
- Occasion-specific outfits
- Swipe through alternatives
- Favorite outfits

### 4. Trends Feed
- Fashion inspiration
- Like and save trends
- "Try this trend" functionality

### 5. Profile Management
- View style preferences
- Edit profile settings
- View statistics

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for development:

```env
# App Configuration
VITE_APP_NAME=Dressed
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# Weather API (Optional - for real weather data)
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here

# AI Services (Optional - for production)
VITE_CLARIFAI_API_KEY=your_clarifai_api_key_here
VITE_GOOGLE_VISION_API_KEY=your_google_vision_api_key_here
```

### API Keys (Optional)

For full functionality, you can add these API keys:

#### Weather API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Add to `.env.local`:
   ```env
   VITE_WEATHER_API_KEY=your_actual_api_key_here
   ```

#### AI Services (Future)
- **Clarifai**: For clothing categorization
- **Google Cloud Vision**: For color detection

## 🐛 Troubleshooting

### Common Issues

#### Node.js Not Found
```bash
# Install Node.js via Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### Permission Denied
```bash
# Make scripts executable
chmod +x install-dressed.sh
chmod +x install-simple.sh
```

#### Port Already in Use
```bash
# Kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

#### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Reset Everything
```bash
# Remove all installed files
rm -rf dressed/node_modules
rm -rf dressed/.env.local
rm -rf dressed/dist

# Reinstall
cd dressed
npm install
```

## 📱 Mobile Testing

The app is designed mobile-first. To test on mobile:

1. Start the development server
2. Find your computer's IP address:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
3. Access from mobile: `http://YOUR_IP:5173`

## 🚀 Production Deployment

For production deployment:

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# Deploy the 'dist' folder to your hosting service
```

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Verify all prerequisites are installed
3. Check the console for error messages
4. Try the simple installation script
5. Create an issue in the repository

## 🎯 Next Steps

After successful installation:

1. **Complete Onboarding**: Set up your style profile
2. **Add Wardrobe Items**: Upload some clothing photos
3. **Generate Outfits**: Test the AI outfit suggestions
4. **Explore Trends**: Browse the fashion feed
5. **Customize Settings**: Adjust your preferences

---

**Happy Styling! 👗✨**
