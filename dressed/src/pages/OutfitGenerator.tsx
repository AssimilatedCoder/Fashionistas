import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Heart, RefreshCw, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Occasion, Outfit, WardrobeItem } from '../types'
import { aiService } from '../services/ai'
import { weatherService } from '../services/weather'

const OutfitGenerator: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const { wardrobeItems, weather, userProfile } = state
  
  const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null)
  const [outfitSuggestions, setOutfitSuggestions] = useState<WardrobeItem[][]>([])
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const occasion = location.state?.occasion as Occasion || 'daily'

  useEffect(() => {
    generateOutfitSuggestions()
  }, [occasion, wardrobeItems, weather, userProfile])

  const generateOutfitSuggestions = async () => {
    if (wardrobeItems.length === 0 || !userProfile) {
      return
    }

    setIsGenerating(true)
    
    try {
      // Generate outfit suggestions using AI service
      const suggestions = aiService.generateOutfitSuggestions(
        wardrobeItems,
        occasion,
        weather,
        userProfile
      )

      setOutfitSuggestions(suggestions)
      setCurrentSuggestionIndex(0)
      
      if (suggestions.length > 0) {
        const outfit: Outfit = {
          id: `outfit-${Date.now()}`,
          items: suggestions[0],
          occasion,
          weather: weather || {
            temperature: 20,
            condition: 'Clear',
            description: 'clear sky',
            humidity: 50,
            windSpeed: 5,
            location: 'Unknown',
            icon: '01d'
          },
          matchScore: Math.floor(Math.random() * 20) + 80, // 80-100%
          createdAt: new Date().toISOString(),
          worn: false,
          favorited: false
        }
        
        setCurrentOutfit(outfit)
        dispatch({ type: 'SET_CURRENT_OUTFIT', payload: outfit })
      }
    } catch (error) {
      console.error('Error generating outfit suggestions:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNextSuggestion = () => {
    if (currentSuggestionIndex < outfitSuggestions.length - 1) {
      const newIndex = currentSuggestionIndex + 1
      setCurrentSuggestionIndex(newIndex)
      
      if (outfitSuggestions[newIndex]) {
        const outfit: Outfit = {
          id: `outfit-${Date.now()}`,
          items: outfitSuggestions[newIndex],
          occasion,
          weather: weather || currentOutfit?.weather,
          matchScore: Math.floor(Math.random() * 20) + 80,
          createdAt: new Date().toISOString(),
          worn: false,
          favorited: false
        }
        
        setCurrentOutfit(outfit)
        dispatch({ type: 'SET_CURRENT_OUTFIT', payload: outfit })
      }
    }
  }

  const handlePreviousSuggestion = () => {
    if (currentSuggestionIndex > 0) {
      const newIndex = currentSuggestionIndex - 1
      setCurrentSuggestionIndex(newIndex)
      
      if (outfitSuggestions[newIndex]) {
        const outfit: Outfit = {
          id: `outfit-${Date.now()}`,
          items: outfitSuggestions[newIndex],
          occasion,
          weather: weather || currentOutfit?.weather,
          matchScore: Math.floor(Math.random() * 20) + 80,
          createdAt: new Date().toISOString(),
          worn: false,
          favorited: false
        }
        
        setCurrentOutfit(outfit)
        dispatch({ type: 'SET_CURRENT_OUTFIT', payload: outfit })
      }
    }
  }

  const handleWearOutfit = async () => {
    if (!currentOutfit) return

    try {
      // Mark outfit as worn
      const wornOutfit = { ...currentOutfit, worn: true }
      
      // Save to outfit history
      await window.storage.set(
        `outfit-history-${new Date().toISOString().split('T')[0]}`,
        JSON.stringify(wornOutfit)
      )
      
      // Update last worn date for items
      const updatedItems = wardrobeItems.map(item => {
        if (currentOutfit.items.some(outfitItem => outfitItem.id === item.id)) {
          return { ...item, lastWorn: new Date().toISOString() }
        }
        return item
      })
      
      await window.storage.set('wardrobe-items', JSON.stringify(updatedItems))
      dispatch({ type: 'SET_WARDROBE_ITEMS', payload: updatedItems })
      
      // Navigate back to home
      navigate('/')
    } catch (error) {
      console.error('Error saving worn outfit:', error)
    }
  }

  const handleFavorite = async () => {
    if (!currentOutfit) return

    try {
      const newFavoriteStatus = !isFavorited
      setIsFavorited(newFavoriteStatus)
      
      if (newFavoriteStatus) {
        await window.storage.set(
          'favorites-outfits',
          JSON.stringify([...state.trends, currentOutfit.id])
        )
      } else {
        const favorites = await window.storage.get('favorites-outfits')
        const favoriteList = favorites ? JSON.parse(favorites.value) : []
        const updatedFavorites = favoriteList.filter((id: string) => id !== currentOutfit.id)
        await window.storage.set('favorites-outfits', JSON.stringify(updatedFavorites))
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (wardrobeItems.length === 0) {
    return (
      <div className="p-6">
        <Card className="text-center p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-semibold text-secondary-900">
              No Items in Your Closet
            </h2>
            <p className="text-secondary-600">
              Add some items to your wardrobe first to generate outfit suggestions.
            </p>
            <Button onClick={() => navigate('/wardrobe')} className="w-full">
              Go to Wardrobe
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="p-6">
        <Card className="text-center p-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-secondary-900">
              Generating Outfit...
            </h2>
            <p className="text-secondary-600">
              Our AI is creating the perfect outfit for you.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  if (!currentOutfit || outfitSuggestions.length === 0) {
    return (
      <div className="p-6">
        <Card className="text-center p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-semibold text-secondary-900">
              No Outfit Suggestions
            </h2>
            <p className="text-secondary-600">
              We couldn't find suitable combinations for your current occasion.
            </p>
            <Button onClick={generateOutfitSuggestions} className="w-full">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-secondary-600">
          {currentSuggestionIndex + 1} of {outfitSuggestions.length}
        </div>
      </div>

      {/* Outfit Display */}
      <Card className="p-6">
        {/* Match Score & Weather */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-600">
                {currentOutfit.matchScore}%
              </span>
            </div>
            <span className="text-sm text-secondary-600">Match</span>
          </div>
          
          {currentOutfit.weather && (
            <div className="text-sm text-secondary-600">
              Perfect for {currentOutfit.weather.temperature}°C and {currentOutfit.weather.description}
            </div>
          )}
        </div>

        {/* Outfit Items */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentOutfit.items.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
                <img
                  src={item.photoUrl}
                  alt={item.category}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-secondary-900 capitalize">
                  {item.category}
                </div>
                <div className="text-xs text-secondary-600">
                  {item.colors.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousSuggestion}
            disabled={currentSuggestionIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextSuggestion}
            disabled={currentSuggestionIndex === outfitSuggestions.length - 1}
            className="flex-1"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Bottom Actions */}
      <div className="flex space-x-3">
        <Button
          variant="secondary"
          onClick={handleFavorite}
          className={`flex-1 ${
            isFavorited ? 'bg-red-50 text-red-600 border-red-200' : ''
          }`}
        >
          <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
          {isFavorited ? 'Favorited' : 'Favorite'}
        </Button>
        
        <Button
          onClick={handleWearOutfit}
          className="flex-1 flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Wear This Outfit</span>
        </Button>
      </div>

      {/* Regenerate Button */}
      <Button
        variant="ghost"
        onClick={generateOutfitSuggestions}
        className="w-full"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate New Suggestions
      </Button>
    </div>
  )
}

export default OutfitGenerator
