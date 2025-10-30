# Dressed - AI-Powered Personal Styling App

## Project Overview

Build a responsive web application that helps women (16-35 years) create perfect daily outfits from their own wardrobe. The app eliminates the "nothing to wear" problem by providing smart outfit suggestions based on weather, occasion, personal style, and current fashion trends.

---

## Core Problem & Solution

**Problem:** Women waste 15-45 minutes daily finding the right outfit, leading to stress and frustration despite having full closets.

**Solution:** An AI-driven outfit assistant that creates personalized outfit suggestions in seconds, considering weather, occasion, personal style, and comfort preferences.

---

## Tech Stack Requirements

### Frontend

- **Framework:** React (latest version)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui where applicable
- **State Management:** React hooks (useState, useContext)
- **Icons:** Lucide React
- **Responsive:** Mobile-first design, fully responsive

### APIs & Integration

- **Image Recognition:** Clarifai API or Google Cloud Vision API (for clothing categorization and color detection)
- **Weather:** OpenWeatherMap API or WeatherAPI
- **Geolocation:** Browser Geolocation API

### Data Storage

- **Use the Artifacts Storage API:** `window.storage`
- **CRITICAL:** NO localStorage or sessionStorage - use only the provided storage API
- **Storage Structure:**

  ```javascript
  // User profile
  'user-profile': {
    style: ['minimalist', 'chic'],
    favoriteColors: ['black', 'beige', 'navy'],
    avoidColors: ['neon-green'],
    colorSpectrum: 'neutral', // or 'colorful'
    comfortLevel: {
      heels: 'sometimes',
      tightClothing: 'comfortable',
      skirtsVsPants: 'both',
      layers: 'prefer-layers'
    },
    location: 'Brussels, BE'
  }

  // Wardrobe items (one key per item)
  'wardrobe-item-{id}': {
    id: 'uuid',
    photoUrl: 'base64 or url',
    category: 'tops' | 'bottoms' | 'outerwear' | 'shoes' | 'accessories',
    colors: ['primary-color', 'secondary-color'],
    season: ['spring', 'summer', 'fall', 'winter'],
    formality: 'casual' | 'semi-formal' | 'formal',
    tags: ['favorite', 'new', 'brand-name']
  }

  // Outfit history
  'outfit-history-{date}': {
    date: 'YYYY-MM-DD',
    items: ['item-id-1', 'item-id-2', 'item-id-3'],
    occasion: 'work',
    liked: true
  }

  // Favorites
  'favorites-outfits': ['outfit-id-1', 'outfit-id-2']
  'favorites-trends': ['trend-id-1', 'trend-id-2']
  ```

---

## MVP Feature Set - Phase 1 (Priority A)

### 1. Digital Wardrobe

**Features:**

- Photo upload functionality (single item per photo)
- AI automatic categorization into:
  - Tops (shirts, blouses, sweaters)
  - Bottoms (pants, skirts, shorts)
  - Outerwear (jackets, coats)
  - Shoes
  - Accessories (bags, belts, scarves, hats)
- Automatic color detection
- Manual adjustment option if AI categorizes incorrectly
- Item detail capture:
  - Category
  - Colors (primary + secondary)
  - Season suitability
  - Formality level (casual - semi-formal - formal)
  - Optional tags (brand, favorites, new)

**UI Requirements:**

- Simple upload interface with camera/file picker
- Grid view of wardrobe items
- Filter by category, color, season
- Edit/delete item functionality
- Visual feedback during AI processing

### 2. Smart Outfit Generator

**Input Factors:**

- Current weather (temperature, precipitation, wind)
- Occasion selector (dropdown):
  - Daily/work/school
  - Casual outing
  - Date night
  - Party/birthday
  - Formal event
  - Job interview/business meeting
  - Funeral
  - Vacation/weekend trip
  - Sport/active
- Personal style profile (from onboarding)

**Output:**

- **Primary suggestion:** Most suitable complete outfit
  - Top + Bottom + Shoes + Outerwear (if needed) + Accessory option
- Visual presentation: Item photos displayed together
- Weather indicator: "Perfect for 15°C and cloudy"
- Match score: "95% match with your style"

**Interactions:**

- ✅ Accept → Save to "Worn Today"
- ➡️ Swipe for alternatives (generate 5-10 options)
- 🔄 Replace specific item (e.g., choose different pants)
- ❤️ Favorite for later

**Algorithm Logic:**

- Color harmony (complementary, analogous, monochrome)
- Style consistency (don't mix emo with preppy)
- Formality matching (occasion-appropriate)
- Weather suitability
- Season relevance
- Learn from user swipes (track likes/dislikes)

### 3. Personal Style Profile

**Onboarding Questionnaire (first use):**

**Style Preferences** (multiple choice):

- Minimalist & modern
- Bohemian/free-spirited
- Classic & chic
- Streetwear/urban
- Romantic & feminine
- Edgy/alternative/emo
- Sporty & casual

**Color Preferences:**

- Favorite colors (multi-select)
- Colors to avoid
- Neutral vs. colorful spectrum slider

**Comfort Level:**

- Heels: yes/sometimes/no
- Tight clothing: comfortable/sometimes/prefer not
- Skirt vs. pants preference
- Layered vs. simple

**Body Confidence (optional):**

- Body parts you like to accentuate
- Areas you want comfort around

**Profile Updates:**

- Editable in settings
- Machine learning from user feedback (swipes and acceptances)

### 4. Weather Integration

- Automatic location detection (browser geolocation)
- Real-time weather data (today + next 3 days)
- Smart outfit adjustments:
  - <10°C: Warm layers, coats, boots
  - 10-20°C: Transition items, light jacket optional
  - >20°C: Breathable fabrics, summer items
  - Rain: Raincoat suggestion, waterproof shoes
  - Wind: Avoid skirts/dresses suggestion

---

## MVP Feature Set - Phase 2 (Priority B)

### 5. Trend Feed

**Functionality:**

- Vertical scroll feed (Instagram-style)
- Daily updates (3-5 new posts per day)
- Content types:
  - Catwalk highlights (Fashion Weeks)
  - Street style inspiration
  - Seasonal trends ("5 must-haves for fall 2025")
  - Styling tips ("How to wear oversized blazers")
  - Color trends
  - Outfit formulas ("3 ways to style a white blouse")

**Interactions:**

- 📌 Save for later (separate tab)
- ❤️ Like (improves personalization)
- 💬 "Shop similar" (future feature)

**Integration with Outfit Generator:**

- Tag on outfit suggestion: "Trending Now! 🔥"
- "Try this trend" button → generates outfit with trend item from your closet
- Notification: "You have items for this trending look!"

**Content Management:**

- Manual upload system or API integration
- Image + short description + tags
- Scheduled posting (3-5 posts at 6:00 AM daily)

---

## User Flow - Happy Path

### First Use:

1. Welcome screen + app explanation (30 seconds)
2. Style profile questionnaire (2-3 minutes)
3. "Add your first items" tutorial
4. Upload 5-10 basic items
5. Generate first outfit → user is impressed ✨

### Daily Use:

1. Open app (morning)
2. Dashboard shows:
   - Today's weather
   - "Where are you going today?" dropdown
3. Select occasion → instant outfit suggestion
4. Swipe through alternatives or accept
5. Done! (total <2 minutes)

### Browse Inspiration:

1. Go to "Trends" tab
2. Scroll through feed
3. Save interesting looks
4. "Try this trend" → outfit from own closet

---

## Design System

### Color Palette

- **Primary:** Soft beige (#F5F1ED)
- **Secondary:** Charcoal (#2C2C2C)
- **Accent:** Gold (#D4AF37)
- **Background:** Off-white (#FAFAFA)
- **Text:** Dark gray (#333333)
- **Success:** Soft green (#A8D5BA)
- **Error:** Soft red (#E8B4B8)

### Typography

- **Headings:** Modern sans-serif (e.g., Inter, Poppins)
- **Body:** Clean, readable sans-serif
- **Sizes:** Large touch-friendly buttons (min 48px height)

### UI Principles

- Minimalist, uncluttered interface
- Soft, fashion-inspired colors
- Large, clear buttons (touch-friendly)
- Fast load times (<2 seconds)
- Smooth animations and transitions
- Swipe gestures for mobile

---

## Key Screens & Components

### 1. Home Screen / Dashboard

```
┌─────────────────────────────┐
│  ☁️ 15°C Brussels          │
│  Cloudy, light rain         │
├─────────────────────────────┤
│                             │
│  Where are you going?       │
│  [Dropdown: Daily/Work]  ▼  │
│                             │
│  [Generate Outfit ✨]       │
│                             │
├─────────────────────────────┤
│ 🏠 Home | 👔 Closet |       │
│ 📱 Trends | 👤 Profile      │
└─────────────────────────────┘
```

### 2. Outfit Generator Screen

```
┌─────────────────────────────┐
│  95% Match • Perfect for    │
│  15°C and cloudy ☁️         │
├─────────────────────────────┤
│                             │
│   [Top Photo]               │
│   [Bottom Photo]            │
│   [Shoes Photo]             │
│   [Accessory Photo]         │
│                             │
├─────────────────────────────┤
│ ✅ Wear  ➡️ Next  🔄 Change │
│          ❤️ Favorite        │
└─────────────────────────────┘
```

### 3. Wardrobe Grid

```
┌─────────────────────────────┐
│  My Closet                  │
│  [+ Add Item]               │
├─────────────────────────────┤
│  Filters: All ▼ | Color ▼   │
├─────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐         │
│  │ 👕 │ │ 👖 │ │ 👟 │        │
│  └───┘ └───┘ └───┘         │
│  ┌───┐ ┌───┐ ┌───┐         │
│  │ 🧥 │ │ 👗 │ │ 👜 │        │
│  └───┘ └───┘ └───┘         │
└─────────────────────────────┘
```

### 4. Trend Feed

```
┌─────────────────────────────┐
│  Fashion Trends             │
├─────────────────────────────┤
│  ┌─────────────────────┐   │
│  │  [Trend Image]      │   │
│  │  Fall's Hottest     │   │
│  │  Color: Burgundy    │   │
│  │  ❤️ 234  📌 Save    │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │  [Trend Image]      │   │
│  │  Oversized Blazers  │   │
│  │  ❤️ 456  📌 Save    │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

### 5. Style Profile Onboarding

```
┌─────────────────────────────┐
│  Let's get to know          │
│  your style! (1/4)          │
├─────────────────────────────┤
│                             │
│  What's your style vibe?    │
│                             │
│  ☐ Minimalist & Modern      │
│  ☐ Bohemian                 │
│  ☑ Classic & Chic           │
│  ☐ Streetwear               │
│  ☐ Romantic                 │
│  ☐ Edgy/Alternative         │
│  ☐ Sporty                   │
│                             │
│         [Next →]            │
└─────────────────────────────┘
```

---

## Technical Implementation Notes

### Image Upload & Processing

```javascript
// Handle image upload
const handleImageUpload = async (file) => {
  // Convert to base64 or upload to cloud
  const imageData = await convertToBase64(file);
  
  // Call AI API for categorization
  const analysis = await analyzeClothing(imageData);
  
  // Store item
  const item = {
    id: generateId(),
    photoUrl: imageData,
    category: analysis.category,
    colors: analysis.colors,
    season: analysis.season,
    formality: analysis.formality
  };
  
  await window.storage.set(`wardrobe-item-${item.id}`, JSON.stringify(item));
};
```

### Weather Fetching

```javascript
// Get weather data
const fetchWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`
  );
  return await response.json();
};
```

### Outfit Generation Logic

```javascript
// Generate outfit based on constraints
const generateOutfit = (items, weather, occasion, profile) => {
  // Filter items by weather appropriateness
  const weatherSuitable = filterByWeather(items, weather);
  
  // Filter by occasion formality
  const occasionSuitable = filterByOccasion(weatherSuitable, occasion);
  
  // Apply style profile preferences
  const styleMatched = filterByStyle(occasionSuitable, profile);
  
  // Create combinations with good color harmony
  const combinations = createColorHarmoniousCombinations(styleMatched);
  
  // Score and rank combinations
  const ranked = rankCombinations(combinations, profile);
  
  return ranked[0]; // Return best match
};
```

### Storage Error Handling

```javascript
// Always wrap storage operations in try-catch
const saveItem = async (key, value) => {
  try {
    const result = await window.storage.set(key, JSON.stringify(value));
    if (!result) {
      console.error('Storage operation failed');
      // Show user error message
    }
  } catch (error) {
    console.error('Storage error:', error);
    // Handle error gracefully
  }
};

// Check if key exists
const getItem = async (key) => {
  try {
    const result = await window.storage.get(key);
    return result ? JSON.parse(result.value) : null;
  } catch (error) {
    console.log('Key not found:', error);
    return null;
  }
};
```

---

## Development Priorities

### Sprint 1: Core Infrastructure (Week 1-2)

- [ ] Project setup (React + Tailwind)
- [ ] Storage API integration
- [ ] Basic routing (Home, Closet, Trends, Profile)
- [ ] Image upload component
- [ ] Weather API integration

### Sprint 2: Digital Wardrobe (Week 3-4)

- [ ] AI clothing categorization integration
- [ ] Wardrobe grid view
- [ ] Item detail view and editing
- [ ] Filter and search functionality

### Sprint 3: Outfit Generator (Week 5-6)

- [ ] Style profile onboarding flow
- [ ] Outfit generation algorithm
- [ ] Outfit display component
- [ ] Swipe functionality
- [ ] Weather-based filtering

### Sprint 4: Trends Feed (Week 7-8)

- [ ] Vertical scroll feed
- [ ] Content management system
- [ ] Like and save functionality
- [ ] "Try this trend" integration

### Sprint 5: Polish & Testing (Week 9-10)

- [ ] Responsive design refinement
- [ ] Performance optimization
- [ ] User testing and bug fixes
- [ ] Loading states and error handling
- [ ] Accessibility improvements

---

## Success Metrics

### Engagement Metrics

- Daily Active Users (DAU)
- Average session duration
- Outfits generated per week
- Wardrobe items uploaded per user

### Satisfaction Metrics

- Outfit acceptance rate (% of first suggestions accepted)
- Favorite rate
- Week 1 retention
- Month 1 retention

### Content Metrics

- Trend feed engagement (likes, saves)
- Average wardrobe size

---

## Future Enhancements (Post-MVP)

- **Outfit Planning:** Plan outfits for the week ahead
- **Social Features:** Share outfits with friends
- **E-commerce Integration:** "Shop the look" with affiliate links
- **AR Try-On:** Virtual try-on with camera
- **Packing Lists:** Travel packing assistant
- **Sustainability:** Track outfit reuse, carbon footprint
- **Premium Features:** Personal stylist consultation

---

## Important Constraints

1. **NO localStorage or sessionStorage** - Use only `window.storage` API
2. **Mobile-first** - Design for mobile, enhance for desktop
3. **Performance** - Keep load times under 2 seconds
4. **Accessibility** - WCAG 2.1 AA compliance
5. **Privacy** - User data is personal (shared: false by default)
6. **Error Handling** - Graceful degradation for API failures
7. **Progressive Enhancement** - Core functionality works without AI if APIs fail

---

## Getting Started

1. Set up React project with Vite or Create React App (name: "dressed")
2. Install dependencies: Tailwind CSS, Lucide React, shadcn/ui components
3. Configure API keys for weather and image recognition
4. Implement storage layer with window.storage API
5. Build onboarding flow first (style profile)
6. Implement wardrobe upload and display
7. Add outfit generator with basic algorithm
8. Integrate weather and refine algorithm
9. Add trend feed
10. Polish UI and test thoroughly

---

## Notes for Developer

- Focus on **user experience** - this app needs to feel fast, intuitive, and delightful
- **Visual appeal** is critical for fashion app - use high-quality images and smooth animations
- **Mobile gestures** (swipe) should feel native and responsive
- **Loading states** are crucial - always show feedback during AI processing
- **Empty states** need special attention (empty closet, no trends, etc.)
- **Error recovery** - guide users when things go wrong
- Test with **real photos** of clothing items to refine AI categorization
- Consider **image optimization** to keep app fast despite many photos

Good luck building Dressed! 🎨👗✨
