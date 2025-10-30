# Dressed - AI-Powered Personal Styling App

A modern React application that helps women create perfect daily outfits from their own wardrobe using AI-powered suggestions based on weather, occasion, and personal style preferences.

## Features

- **Digital Wardrobe**: Upload and categorize clothing items with AI-powered recognition
- **Smart Outfit Generator**: Get personalized outfit suggestions based on weather, occasion, and style
- **Style Profile**: Comprehensive onboarding to understand personal preferences
- **Weather Integration**: Real-time weather data for appropriate outfit suggestions
- **Trend Feed**: Stay updated with the latest fashion trends
- **Mobile-First Design**: Fully responsive with touch-friendly interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context + useReducer
- **Build Tool**: Vite
- **Storage**: Artifacts Storage API (window.storage)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dressed
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

Edit `.env` and add your API keys:
- `VITE_WEATHER_API_KEY`: Get from [OpenWeatherMap](https://openweathermap.org/api)
- `VITE_CLARIFAI_API_KEY`: Get from [Clarifai](https://www.clarifai.com/) (optional)
- `VITE_GOOGLE_VISION_API_KEY`: Get from [Google Cloud Vision](https://cloud.google.com/vision) (optional)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, Input)
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # App header
│   └── BottomNavigation.tsx
├── contexts/           # React Context providers
│   └── AppContext.tsx  # Main app state management
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Wardrobe.tsx
│   ├── Trends.tsx
│   ├── Profile.tsx
│   ├── Onboarding.tsx
│   └── OutfitGenerator.tsx
├── services/           # External service integrations
│   ├── storage.ts      # Artifacts Storage API wrapper
│   ├── weather.ts      # Weather API service
│   └── ai.ts          # AI/ML service (mock implementation)
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── cn.ts          # Class name utility
└── App.tsx            # Main app component
```

## Key Features Implementation

### Storage API Integration

The app uses the Artifacts Storage API (`window.storage`) for data persistence:

```typescript
// Save user profile
await window.storage.set('user-profile', JSON.stringify(profile))

// Get wardrobe items
const result = await window.storage.get('wardrobe-items')
const items = result ? JSON.parse(result.value) : []
```

### AI-Powered Clothing Recognition

Currently uses mock data, but ready for integration with:
- Clarifai API for clothing categorization
- Google Cloud Vision API for color detection

### Weather Integration

Real-time weather data from OpenWeatherMap API:
- Automatic location detection
- Temperature-based outfit suggestions
- Weather condition filtering

### Responsive Design

Mobile-first approach with:
- Touch-friendly buttons (min 48px height)
- Swipe gestures for outfit browsing
- Optimized for portrait orientation
- Progressive enhancement for desktop

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Keys Setup

### Weather API (Required)

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add to `.env` file: `VITE_WEATHER_API_KEY=your_key_here`

### AI Services (Optional)

For production use, integrate with:

**Clarifai API:**
1. Sign up at [Clarifai](https://www.clarifai.com/)
2. Create a new application
3. Get your API key
4. Add to `.env` file: `VITE_CLARIFAI_API_KEY=your_key_here`

**Google Cloud Vision API:**
1. Set up Google Cloud project
2. Enable Vision API
3. Create service account and download key
4. Add to `.env` file: `VITE_GOOGLE_VISION_API_KEY=your_key_here`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@dressed.app or create an issue in the repository.

---

Built with ❤️ for fashion lovers everywhere! 👗✨
