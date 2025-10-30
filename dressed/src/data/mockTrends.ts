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
