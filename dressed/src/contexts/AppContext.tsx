import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { AppState, UserProfile, WardrobeItem, Outfit, WeatherData, Trend } from '../types'
import { storageService, loadMockData } from '../services/storage'

// Initial state
const initialState: AppState = {
  userProfile: null,
  wardrobeItems: [],
  currentOutfit: null,
  weather: null,
  trends: [],
  isLoading: false,
  error: null,
}

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_PROFILE'; payload: UserProfile | null }
  | { type: 'ADD_WARDROBE_ITEM'; payload: WardrobeItem }
  | { type: 'UPDATE_WARDROBE_ITEM'; payload: WardrobeItem }
  | { type: 'DELETE_WARDROBE_ITEM'; payload: string }
  | { type: 'SET_WARDROBE_ITEMS'; payload: WardrobeItem[] }
  | { type: 'SET_CURRENT_OUTFIT'; payload: Outfit | null }
  | { type: 'SET_WEATHER'; payload: WeatherData | null }
  | { type: 'SET_TRENDS'; payload: Trend[] }
  | { type: 'ADD_FAVORITE_OUTFIT'; payload: string }
  | { type: 'REMOVE_FAVORITE_OUTFIT'; payload: string }

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload }
    case 'ADD_WARDROBE_ITEM':
      return { ...state, wardrobeItems: [...state.wardrobeItems, action.payload] }
    case 'UPDATE_WARDROBE_ITEM':
      return {
        ...state,
        wardrobeItems: state.wardrobeItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    case 'DELETE_WARDROBE_ITEM':
      return {
        ...state,
        wardrobeItems: state.wardrobeItems.filter(item => item.id !== action.payload)
      }
    case 'SET_WARDROBE_ITEMS':
      return { ...state, wardrobeItems: action.payload }
    case 'SET_CURRENT_OUTFIT':
      return { ...state, currentOutfit: action.payload }
    case 'SET_WEATHER':
      return { ...state, weather: action.payload }
    case 'SET_TRENDS':
      return { ...state, trends: action.payload }
    case 'ADD_FAVORITE_OUTFIT':
      return {
        ...state,
        currentOutfit: state.currentOutfit
          ? { ...state.currentOutfit, favorited: true }
          : null
      }
    case 'REMOVE_FAVORITE_OUTFIT':
      return {
        ...state,
        currentOutfit: state.currentOutfit
          ? { ...state.currentOutfit, favorited: false }
          : null
      }
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load initial data from storage
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })

        // Load user profile
        const profile = await storageService.getUserProfile()
        if (profile) {
          dispatch({ type: 'SET_USER_PROFILE', payload: profile })
        }

        // Load wardrobe items
        const items = await storageService.getWardrobeItems()
        dispatch({ type: 'SET_WARDROBE_ITEMS', payload: items })

        // Load trends (mock data for now)
        const trends = await storageService.getTrends()
        dispatch({ type: 'SET_TRENDS', payload: trends })

      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load app data' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadInitialData()
        // Load mock data in development
        if (process.env.NODE_ENV === 'development') {
          loadMockData()
        }  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
