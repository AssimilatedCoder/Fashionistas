// User Profile Types
export interface UserProfile {
  style: string[]
  favoriteColors: string[]
  avoidColors: string[]
  colorSpectrum: 'neutral' | 'colorful'
  comfortLevel: {
    heels: 'yes' | 'sometimes' | 'no'
    tightClothing: 'comfortable' | 'sometimes' | 'prefer-not'
    skirtsVsPants: 'skirts' | 'pants' | 'both'
    layers: 'prefer-layers' | 'prefer-simple'
  }
  bodyConfidence?: {
    accentuate: string[]
    comfortAreas: string[]
  }
  location: string
}

// Wardrobe Item Types
export type ClothingCategory = 'tops' | 'bottoms' | 'outerwear' | 'shoes' | 'accessories'
export type FormalityLevel = 'casual' | 'semi-formal' | 'formal'
export type Season = 'spring' | 'summer' | 'fall' | 'winter'
export type SeasonArray = Season[]

export interface WardrobeItem {
  id: string
  photoUrl: string
  category: ClothingCategory
  colors: string[]
  season: SeasonArray
  formality: FormalityLevel
  tags: string[]
  createdAt: string
  lastWorn?: string
}

// Outfit Types
export type Occasion = 
  | 'daily'
  | 'work'
  | 'school'
  | 'casual-outing'
  | 'date-night'
  | 'party'
  | 'formal-event'
  | 'interview'
  | 'funeral'
  | 'vacation'
  | 'sport'

export interface Outfit {
  id: string
  items: WardrobeItem[]
  occasion: Occasion
  weather: WeatherData
  matchScore: number
  createdAt: string
  worn?: boolean
  favorited?: boolean
}

// Weather Types
export interface WeatherData {
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  location: string
  icon: string
}

// Trend Types
export interface Trend {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  tags: string[]
  createdAt: string
  likes: number
  saved: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Storage Types
export interface StorageItem {
  key: string
  value: string
}

// UI State Types
export interface AppState {
  userProfile: UserProfile | null
  wardrobeItems: WardrobeItem[]
  currentOutfit: Outfit | null
  weather: WeatherData | null
  trends: Trend[]
  isLoading: boolean
  error: string | null
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  disabled?: boolean
  className?: string
}

// Filter Types
export interface WardrobeFilters {
  category?: ClothingCategory
  colors?: string[]
  season?: SeasonArray
  formality?: FormalityLevel
  search?: string
}

// Onboarding Types
export interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ComponentType<OnboardingStepProps>
}

export interface OnboardingStepProps {
  onNext: (data: any) => void
  onBack: () => void
  data: any
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'outfit'
  selected?: boolean
}

export interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  disabled?: boolean
  error?: string
  success?: boolean
  className?: string
}
