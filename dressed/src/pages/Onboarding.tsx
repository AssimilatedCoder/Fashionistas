import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { UserProfile } from '../types'
import { storageService } from '../services/storage'

const Onboarding: React.FC = () => {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    style: [],
    favoriteColors: [],
    avoidColors: [],
    colorSpectrum: 'neutral',
    comfortLevel: {
      heels: 'sometimes',
      tightClothing: 'comfortable',
      skirtsVsPants: 'both',
      layers: 'prefer-simple'
    },
    location: 'Brussels, BE'
  })

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Dressed!',
      description: 'Let\'s create your personal style profile to get the best outfit suggestions.',
      component: WelcomeStep
    },
    {
      id: 'style',
      title: 'What\'s your style vibe?',
      description: 'Choose all that apply to help us understand your fashion preferences.',
      component: StyleStep
    },
    {
      id: 'colors',
      title: 'Color preferences',
      description: 'Tell us about your favorite colors and what you like to avoid.',
      component: ColorsStep
    },
    {
      id: 'comfort',
      title: 'Comfort level',
      description: 'Help us understand your comfort preferences for better suggestions.',
      component: ComfortStep
    },
    {
      id: 'location',
      title: 'Your location',
      description: 'We\'ll use this to provide weather-appropriate outfit suggestions.',
      component: LocationStep
    }
  ]

  const handleNext = (stepData: any) => {
    setProfileData(prev => ({ ...prev, ...stepData }))
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Save profile to storage
      const profile = profileData as UserProfile
      await storageService.saveUserProfile(profile)

      dispatch({ type: 'SET_USER_PROFILE', payload: profile })
    } catch (error) {
      console.error('Error saving profile:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save profile' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
      // Navigate regardless so onboarding can complete in dev without storage
      navigate('/')
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-stoneGray mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-softTaupe rounded-full h-2">
            <div 
              className="bg-terracotta h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-6">
          <CurrentStepComponent
            onNext={handleNext}
            onBack={handleBack}
            data={profileData}
            isFirst={currentStep === 0}
            isLast={currentStep === steps.length - 1}
          />
        </Card>
      </div>
    </div>
  )
}

// Step Components
const WelcomeStep: React.FC<any> = ({ onNext, isFirst }) => (
    <div className="text-center space-y-6">
    <div className="w-20 h-20 bg-warmBeige rounded-full flex items-center justify-center mx-auto">
      <Sparkles className="w-10 h-10 text-terracotta" />
    </div>
    <div>
      <h2 className="text-2xl font-display font-semibold text-charcoal mb-2">
        Welcome to Dressed!
      </h2>
      <p className="text-stoneGray">
        Your personal AI styling assistant that helps you create perfect outfits from your own wardrobe.
      </p>
    </div>
    <Button onClick={() => onNext({})} className="w-full">
      Get Started
    </Button>
  </div>
)

const StyleStep: React.FC<any> = ({ onNext, onBack, data, isFirst }) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(data.style || [])

  const styleOptions = [
    'Minimalist & Modern',
    'Bohemian/Free-spirited',
    'Classic & Chic',
    'Streetwear/Urban',
    'Romantic & Feminine',
    'Edgy/Alternative',
    'Sporty & Casual'
  ]

  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  const handleNext = () => {
    onNext({ style: selectedStyles })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-2">
          What's your style vibe?
        </h2>
        <p className="text-stoneGray">
          Choose all that apply to help us understand your fashion preferences.
        </p>
      </div>

      <div className="space-y-3">
        {styleOptions.map((style) => (
          <button
            key={style}
            onClick={() => handleStyleToggle(style)}
            type="button"
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors cursor-pointer select-none ${
              selectedStyles.includes(style)
                ? 'border-terracotta bg-warmBeige text-charcoal'
                : 'border-softTaupe hover:border-stoneGray'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="flex space-x-3">
        {!isFirst && (
          <Button variant="secondary" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button 
          onClick={handleNext} 
          className="flex-1"
          disabled={selectedStyles.length === 0}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

const ColorsStep: React.FC<any> = ({ onNext, onBack, data, isFirst }) => {
  const [favoriteColors, setFavoriteColors] = useState<string[]>(data.favoriteColors || [])
  const [avoidColors, setAvoidColors] = useState<string[]>(data.avoidColors || [])
  const [colorSpectrum, setColorSpectrum] = useState<'neutral' | 'colorful'>(data.colorSpectrum || 'neutral')

  const colorOptions = [
    'Black', 'White', 'Gray', 'Navy', 'Brown', 'Beige', 'Cream',
    'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange'
  ]

  const toggleFavoriteColor = (color: string) => {
    setFavoriteColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color)
      } else {
        return [...prev, color]
      }
    })
  }

  const toggleAvoidColor = (color: string) => {
    setAvoidColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color)
      } else {
        return [...prev, color]
      }
    })
  }

  const handleNext = () => {
    onNext({ 
      favoriteColors, 
      avoidColors, 
      colorSpectrum 
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-2">
          Color preferences
        </h2>
        <p className="text-stoneGray">
          Tell us about your favorite colors and what you like to avoid.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-charcoal mb-3">Favorite Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => {
            const isSelected = favoriteColors.includes(color)
            return (
              <button
                key={color}
                onClick={() => toggleFavoriteColor(color)}
                type="button"
                className={`p-3 text-xs font-medium rounded-xl border-2 transition-all duration-200 cursor-pointer select-none hover:scale-105 ${
                  isSelected
                    ? 'border-terracotta bg-terracotta text-ivory shadow-terracotta'
                    : 'border-softTaupe bg-ivory text-charcoal hover:border-terracotta/50 hover:bg-warmBeige'
                }`}
              >
                {color}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-charcoal mb-3">Colors to Avoid</h3>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => {
            const isSelected = avoidColors.includes(color)
            return (
              <button
                key={color}
                onClick={() => toggleAvoidColor(color)}
                type="button"
                className={`p-3 text-xs font-medium rounded-xl border-2 transition-all duration-200 cursor-pointer select-none hover:scale-105 ${
                  isSelected
                    ? 'border-error bg-error text-ivory shadow-strong'
                    : 'border-softTaupe bg-ivory text-charcoal hover:border-error/50 hover:bg-error/5'
                }`}
              >
                {color}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-charcoal mb-3">Color Spectrum</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="colorSpectrum"
              value="neutral"
              checked={colorSpectrum === 'neutral'}
              onChange={(e) => setColorSpectrum(e.target.value as 'neutral' | 'colorful')}
              className="text-primary-600"
            />
            <span className="text-sm text-secondary-700">Neutral (blacks, whites, grays, beiges)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="colorSpectrum"
              value="colorful"
              checked={colorSpectrum === 'colorful'}
              onChange={(e) => setColorSpectrum(e.target.value as 'neutral' | 'colorful')}
              className="text-primary-600"
            />
            <span className="text-sm text-secondary-700">Colorful (bright, vibrant colors)</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-3">
        {!isFirst && (
          <Button variant="secondary" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button onClick={handleNext} className="flex-1">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

const ComfortStep: React.FC<any> = ({ onNext, onBack, data, isFirst }) => {
  const [comfortLevel, setComfortLevel] = useState(data.comfortLevel || {
    heels: 'sometimes',
    tightClothing: 'comfortable',
    skirtsVsPants: 'both',
    layers: 'prefer-simple'
  })

  const handleNext = () => {
    onNext({ comfortLevel })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-heading font-semibold text-secondary-900 mb-2">
          Comfort level
        </h2>
        <p className="text-secondary-600">
          Help us understand your comfort preferences for better suggestions.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-secondary-700 mb-2 block">Heels</label>
          <div className="space-y-2">
            {['yes', 'sometimes', 'no'].map((option) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="heels"
                  value={option}
                  checked={comfortLevel.heels === option}
                  onChange={(e) => setComfortLevel(prev => ({ ...prev, heels: e.target.value as any }))}
                  className="text-primary-600"
                />
                <span className="text-sm text-secondary-700 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-secondary-700 mb-2 block">Tight Clothing</label>
          <div className="space-y-2">
            {['comfortable', 'sometimes', 'prefer-not'].map((option) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="tightClothing"
                  value={option}
                  checked={comfortLevel.tightClothing === option}
                  onChange={(e) => setComfortLevel(prev => ({ ...prev, tightClothing: e.target.value as any }))}
                  className="text-primary-600"
                />
                <span className="text-sm text-secondary-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-secondary-700 mb-2 block">Skirts vs Pants</label>
          <div className="space-y-2">
            {['skirts', 'pants', 'both'].map((option) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="skirtsVsPants"
                  value={option}
                  checked={comfortLevel.skirtsVsPants === option}
                  onChange={(e) => setComfortLevel(prev => ({ ...prev, skirtsVsPants: e.target.value as any }))}
                  className="text-primary-600"
                />
                <span className="text-sm text-secondary-700 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-secondary-700 mb-2 block">Layers</label>
          <div className="space-y-2">
            {['prefer-layers', 'prefer-simple'].map((option) => (
              <label key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="layers"
                  value={option}
                  checked={comfortLevel.layers === option}
                  onChange={(e) => setComfortLevel(prev => ({ ...prev, layers: e.target.value as any }))}
                  className="text-primary-600"
                />
                <span className="text-sm text-secondary-700 capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        {!isFirst && (
          <Button variant="secondary" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button onClick={handleNext} className="flex-1">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

const LocationStep: React.FC<any> = ({ onNext, onBack, data, isFirst }) => {
  const [location, setLocation] = useState(data.location || '')

  const handleNext = () => {
    onNext({ location })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-heading font-semibold text-secondary-900 mb-2">
          Your location
        </h2>
        <p className="text-secondary-600">
          We'll use this to provide weather-appropriate outfit suggestions.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-secondary-700 mb-2 block">
          City, Country
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Brussels, Belgium"
          className="w-full p-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex space-x-3">
        {!isFirst && (
          <Button variant="secondary" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button 
          onClick={handleNext} 
          className="flex-1"
          disabled={!location.trim()}
        >
          Complete Setup
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
