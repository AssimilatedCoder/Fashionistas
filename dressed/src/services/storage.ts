import { UserProfile, WardrobeItem, Outfit, Trend, WeatherData } from '../types'

// Storage service using window.storage API
export const storageService = {
  // User Profile
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const result = await window.storage.get('user-profile')
      return result ? JSON.parse(result.value) : null
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<boolean> {
    try {
      const result = await window.storage.set('user-profile', JSON.stringify(profile))
      return result
    } catch (error) {
      console.error('Error saving user profile:', error)
      return false
    }
  },

  // Wardrobe Items
  async getWardrobeItems(): Promise<WardrobeItem[]> {
    try {
      const result = await window.storage.get('wardrobe-items')
      return result ? JSON.parse(result.value) : []
    } catch (error) {
      console.error('Error getting wardrobe items:', error)
      return []
    }
  },

  async saveWardrobeItems(items: WardrobeItem[]): Promise<boolean> {
    try {
      const result = await window.storage.set('wardrobe-items', JSON.stringify(items))
      return result
    } catch (error) {
      console.error('Error saving wardrobe items:', error)
      return false
    }
  },

  async addWardrobeItem(item: WardrobeItem): Promise<boolean> {
    try {
      const items = await this.getWardrobeItems()
      const updatedItems = [...items, item]
      return await this.saveWardrobeItems(updatedItems)
    } catch (error) {
      console.error('Error adding wardrobe item:', error)
      return false
    }
  },

  async updateWardrobeItem(item: WardrobeItem): Promise<boolean> {
    try {
      const items = await this.getWardrobeItems()
      const updatedItems = items.map(i => i.id === item.id ? item : i)
      return await this.saveWardrobeItems(updatedItems)
    } catch (error) {
      console.error('Error updating wardrobe item:', error)
      return false
    }
  },

  async deleteWardrobeItem(itemId: string): Promise<boolean> {
    try {
      const items = await this.getWardrobeItems()
      const updatedItems = items.filter(i => i.id !== itemId)
      return await this.saveWardrobeItems(updatedItems)
    } catch (error) {
      console.error('Error deleting wardrobe item:', error)
      return false
    }
  },

  // Outfit History
  async getOutfitHistory(): Promise<Outfit[]> {
    try {
      const result = await window.storage.get('outfit-history')
      return result ? JSON.parse(result.value) : []
    } catch (error) {
      console.error('Error getting outfit history:', error)
      return []
    }
  },

  async saveOutfitHistory(outfits: Outfit[]): Promise<boolean> {
    try {
      const result = await window.storage.set('outfit-history', JSON.stringify(outfits))
      return result
    } catch (error) {
      console.error('Error saving outfit history:', error)
      return false
    }
  },

  async addOutfitToHistory(outfit: Outfit): Promise<boolean> {
    try {
      const history = await this.getOutfitHistory()
      const updatedHistory = [...history, outfit]
      return await this.saveOutfitHistory(updatedHistory)
    } catch (error) {
      console.error('Error adding outfit to history:', error)
      return false
    }
  },

  // Favorites
  async getFavoriteOutfits(): Promise<string[]> {
    try {
      const result = await window.storage.get('favorites-outfits')
      return result ? JSON.parse(result.value) : []
    } catch (error) {
      console.error('Error getting favorite outfits:', error)
      return []
    }
  },

  async addFavoriteOutfit(outfitId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavoriteOutfits()
      if (!favorites.includes(outfitId)) {
        const updatedFavorites = [...favorites, outfitId]
        const result = await window.storage.set('favorites-outfits', JSON.stringify(updatedFavorites))
        return result
      }
      return true
    } catch (error) {
      console.error('Error adding favorite outfit:', error)
      return false
    }
  },

  async removeFavoriteOutfit(outfitId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavoriteOutfits()
      const updatedFavorites = favorites.filter(id => id !== outfitId)
      const result = await window.storage.set('favorites-outfits', JSON.stringify(updatedFavorites))
      return result
    } catch (error) {
      console.error('Error removing favorite outfit:', error)
      return false
    }
  },

  // Trends
  async getTrends(): Promise<Trend[]> {
    try {
      const result = await window.storage.get('trends')
      return result ? JSON.parse(result.value) : []
    } catch (error) {
      console.error('Error getting trends:', error)
      return []
    }
  },

  async saveTrends(trends: Trend[]): Promise<boolean> {
    try {
      const result = await window.storage.set('trends', JSON.stringify(trends))
      return result
    } catch (error) {
      console.error('Error saving trends:', error)
      return false
    }
  },

  // Weather
  async getWeather(): Promise<WeatherData | null> {
    try {
      const result = await window.storage.get('weather')
      return result ? JSON.parse(result.value) : null
    } catch (error) {
      console.error('Error getting weather:', error)
      return null
    }
  },

  async saveWeather(weather: WeatherData): Promise<boolean> {
    try {
      const result = await window.storage.set('weather', JSON.stringify(weather))
      return result
    } catch (error) {
      console.error('Error saving weather:', error)
      return false
    }
  },

  // Utility methods
  async clearAllData(): Promise<boolean> {
    try {
      const keys = [
        'user-profile',
        'wardrobe-items',
        'outfit-history',
        'favorites-outfits',
        'trends',
        'weather'
      ]
      
      for (const key of keys) {
        await window.storage.delete(key)
      }
      return true
    } catch (error) {
      console.error('Error clearing all data:', error)
      return false
    }
  },

  async exportData(): Promise<string> {
    try {
      const data = {
        userProfile: await this.getUserProfile(),
        wardrobeItems: await this.getWardrobeItems(),
        outfitHistory: await this.getOutfitHistory(),
        favoriteOutfits: await this.getFavoriteOutfits(),
        trends: await this.getTrends(),
        weather: await this.getWeather()
      }
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('Error exporting data:', error)
      return ''
    }
  }
}

// Mock data loading for development
export const loadMockData = async () => {
  try {
    // Load mock trends
    const { mockTrends } = await import('../data/mockTrends')
    await storageService.saveTrends(mockTrends)
    
    // Load mock wardrobe items
    const { mockWardrobeItems } = await import('../data/mockTrends')
    // Cast to mutable array to match WardrobeItem type
    await storageService.saveWardrobeItems(mockWardrobeItems.map(item => ({
      ...item,
      season: [...item.season] as ('spring' | 'summer' | 'fall' | 'winter')[]
    })))
    
    console.log('Mock data loaded successfully')
  } catch (error) {
    console.error('Error loading mock data:', error)
  }
}
