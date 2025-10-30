import { WardrobeItem, ClothingCategory, FormalityLevel, Season } from '../types'

// Mock AI service - replace with actual API integration
export const aiService = {
  async analyzeClothing(imageData: string): Promise<{
    category: ClothingCategory
    colors: string[]
    season: Season[]
    formality: FormalityLevel
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock analysis - in real implementation, this would call Clarifai or Google Vision API
    const mockAnalysis = {
      category: this.getRandomCategory(),
      colors: this.getRandomColors(),
      season: this.getRandomSeasons(),
      formality: this.getRandomFormality()
    }
    
    return mockAnalysis
  },

  getRandomCategory(): ClothingCategory {
    const categories: ClothingCategory[] = ['tops', 'bottoms', 'outerwear', 'shoes', 'accessories']
    return categories[Math.floor(Math.random() * categories.length)]
  },

  getRandomColors(): string[] {
    const colors = [
      'black', 'white', 'gray', 'navy', 'brown', 'beige', 'cream',
      'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange'
    ]
    const numColors = Math.floor(Math.random() * 3) + 1 // 1-3 colors
    return colors.sort(() => 0.5 - Math.random()).slice(0, numColors)
  },

  getRandomSeasons(): Season[] {
    const seasons: Season[] = ['spring', 'summer', 'fall', 'winter']
    const numSeasons = Math.floor(Math.random() * 2) + 1 // 1-2 seasons
    return seasons.sort(() => 0.5 - Math.random()).slice(0, numSeasons)
  },

  getRandomFormality(): FormalityLevel {
    const formality: FormalityLevel[] = ['casual', 'semi-formal', 'formal']
    return formality[Math.floor(Math.random() * formality.length)]
  },

  // Color harmony analysis
  areColorsHarmonious(colors1: string[], colors2: string[]): boolean {
    // Simple color harmony logic
    const neutralColors = ['black', 'white', 'gray', 'navy', 'brown', 'beige', 'cream']
    const hasNeutral = colors1.some(c => neutralColors.includes(c)) || 
                      colors2.some(c => neutralColors.includes(c))
    
    const hasCommonColor = colors1.some(c => colors2.includes(c))
    
    return hasNeutral || hasCommonColor
  },

  // Style consistency check
  isStyleConsistent(item1: WardrobeItem, item2: WardrobeItem): boolean {
    // Simple style consistency logic
    const formalItems = ['blazer', 'dress', 'suit', 'heels']
    const casualItems = ['jeans', 'sneakers', 't-shirt', 'hoodie']
    
    const item1Formal = item1.tags.some(tag => formalItems.some(f => tag.toLowerCase().includes(f)))
    const item2Formal = item2.tags.some(tag => formalItems.some(f => tag.toLowerCase().includes(f)))
    
    const item1Casual = item1.tags.some(tag => casualItems.some(c => tag.toLowerCase().includes(c)))
    const item2Casual = item2.tags.some(tag => casualItems.some(c => tag.toLowerCase().includes(c)))
    
    // Don't mix very formal with very casual
    if (item1Formal && item2Casual) return false
    if (item1Casual && item2Formal) return false
    
    return true
  },

  // Generate outfit suggestions
  generateOutfitSuggestions(
    items: WardrobeItem[],
    occasion: string,
    weather: any,
    userProfile: any
  ): WardrobeItem[][] {
    const suggestions: WardrobeItem[][] = []
    
    // Filter items by weather appropriateness
    const weatherSuitable = this.filterByWeather(items, weather)
    
    // Filter by occasion formality
    const occasionSuitable = this.filterByOccasion(weatherSuitable, occasion)
    
    // Apply user style preferences
    const styleMatched = this.filterByStyle(occasionSuitable, userProfile)
    
    // Generate combinations
    const tops = styleMatched.filter(item => item.category === 'tops')
    const bottoms = styleMatched.filter(item => item.category === 'bottoms')
    const shoes = styleMatched.filter(item => item.category === 'shoes')
    const outerwear = styleMatched.filter(item => item.category === 'outerwear')
    const accessories = styleMatched.filter(item => item.category === 'accessories')
    
    // Create outfit combinations
    for (let i = 0; i < Math.min(5, tops.length); i++) {
      for (let j = 0; j < Math.min(5, bottoms.length); j++) {
        const top = tops[i]
        const bottom = bottoms[j]
        
        // Check color harmony and style consistency
        if (this.areColorsHarmonious(top.colors, bottom.colors) && 
            this.isStyleConsistent(top, bottom)) {
          
          const outfit: WardrobeItem[] = [top, bottom]
          
          // Add shoes
          const suitableShoes = shoes.filter(shoe => 
            this.areColorsHarmonious(shoe.colors, top.colors) &&
            this.areColorsHarmonious(shoe.colors, bottom.colors)
          )
          if (suitableShoes.length > 0) {
            outfit.push(suitableShoes[0])
          }
          
          // Add outerwear if needed
          if (weather && weather.temperature < 15) {
            const suitableOuterwear = outerwear.filter(jacket =>
              this.areColorsHarmonious(jacket.colors, top.colors) &&
              this.areColorsHarmonious(jacket.colors, bottom.colors)
            )
            if (suitableOuterwear.length > 0) {
              outfit.push(suitableOuterwear[0])
            }
          }
          
          // Add accessory
          const suitableAccessories = accessories.filter(accessory =>
            this.areColorsHarmonious(accessory.colors, top.colors) &&
            this.areColorsHarmonious(accessory.colors, bottom.colors)
          )
          if (suitableAccessories.length > 0) {
            outfit.push(suitableAccessories[0])
          }
          
          suggestions.push(outfit)
        }
      }
    }
    
    return suggestions.slice(0, 10) // Return max 10 suggestions
  },

  filterByWeather(items: WardrobeItem[], weather: any): WardrobeItem[] {
    if (!weather) return items
    
    return items.filter(item => {
      const { temperature, condition } = weather
      
      // Temperature-based filtering
      if (temperature < 10) {
        return item.season.includes('winter') || item.season.includes('fall')
      } else if (temperature > 25) {
        return item.season.includes('summer') || item.season.includes('spring')
      }
      
      // Weather condition filtering
      if (condition === 'Rain') {
        return !item.tags.some(tag => 
          ['silk', 'suede', 'leather'].some(material => 
            tag.toLowerCase().includes(material)
          )
        )
      }
      
      return true
    })
  },

  filterByOccasion(items: WardrobeItem[], occasion: string): WardrobeItem[] {
    const occasionFormality: { [key: string]: FormalityLevel[] } = {
      'daily': ['casual', 'semi-formal'],
      'work': ['semi-formal', 'formal'],
      'school': ['casual', 'semi-formal'],
      'casual-outing': ['casual'],
      'date-night': ['semi-formal', 'formal'],
      'party': ['semi-formal', 'formal'],
      'formal-event': ['formal'],
      'interview': ['formal'],
      'funeral': ['formal'],
      'vacation': ['casual', 'semi-formal'],
      'sport': ['casual']
    }
    
    const allowedFormality = occasionFormality[occasion] || ['casual']
    
    return items.filter(item => allowedFormality.includes(item.formality))
  },

  filterByStyle(items: WardrobeItem[], userProfile: any): WardrobeItem[] {
    if (!userProfile) return items
    
    return items.filter(item => {
      // Filter by favorite colors
      const hasFavoriteColor = item.colors.some(color => 
        userProfile.favoriteColors.includes(color)
      )
      
      // Filter by avoided colors
      const hasAvoidedColor = item.colors.some(color => 
        userProfile.avoidColors.includes(color)
      )
      
      return hasFavoriteColor && !hasAvoidedColor
    })
  }
}
