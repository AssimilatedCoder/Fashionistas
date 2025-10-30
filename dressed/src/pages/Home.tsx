import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { Sparkles, Cloud, MapPin, ChevronDown } from 'lucide-react'
import { Occasion } from '../types'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useApp()
  const { weather, userProfile } = state
  
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('daily')

  const occasions: { value: Occasion; label: string }[] = [
    { value: 'daily', label: 'Daily/Work/School' },
    { value: 'casual-outing', label: 'Casual Outing' },
    { value: 'date-night', label: 'Date Night' },
    { value: 'party', label: 'Party/Birthday' },
    { value: 'formal-event', label: 'Formal Event' },
    { value: 'interview', label: 'Job Interview' },
    { value: 'funeral', label: 'Funeral' },
    { value: 'vacation', label: 'Vacation/Weekend' },
    { value: 'sport', label: 'Sport/Active' },
  ]

  const handleGenerateOutfit = () => {
    navigate('/outfit-generator', { 
      state: { occasion: selectedOccasion } 
    })
  }

  const handleGenerateWeatherOutfit = () => {
    // Always generate with today's weather impact (occasion defaults to daily)
    navigate('/outfit-generator', { state: { occasion: 'daily' as Occasion } })
  }

  // Mock recent outfits data
  const recentOutfits = [
    { name: 'Casual Friday Look', date: 'Yesterday' },
    { name: 'Date Night Outfit', date: '2 days ago' },
    { name: 'Work Meeting Style', date: '3 days ago' },
  ]

  // Show onboarding if no user profile
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-ivory pb-20">
        <div className="container py-6">
          <Card className="text-center p-8">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-terracotta" />
              </div>
              <h2 className="text-3xl font-display font-semibold text-charcoal">
                Welcome to Dressed!
              </h2>
              <p className="text-lg text-stoneGray font-body">
                Let's get to know your style and set up your digital wardrobe.
              </p>
              <Button 
                onClick={() => navigate('/onboarding')}
                className="w-full"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory pb-20">
      <div className="container py-6">
        {/* Weather Card */}
        {weather && (
          <Card className="mb-6 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="w-6 h-6 text-terracotta" />
                <div>
                  <p className="text-lg font-semibold text-charcoal">
                    {weather.temperature}°C
                  </p>
                  <p className="text-sm text-stoneGray">{weather.condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="weather-info">
                  <MapPin className="w-3 h-3" />
                  <span>{weather.location}</span>
                </div>
                <Button size="sm" variant="secondary" onClick={handleGenerateWeatherOutfit}>
                  Generate for today
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal mb-3">
            Good morning! 👋
          </h1>
          <p className="text-lg text-stoneGray font-body">
            Ready to find your perfect outfit for today?
          </p>
        </div>

        {/* Occasion Selection */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            What's the occasion?
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {occasions.map((occasion) => (
              <button
                key={occasion.value}
                onClick={() => setSelectedOccasion(occasion.value)}
                className={`onboarding-option ${
                  selectedOccasion === occasion.value ? 'onboarding-option-selected' : ''
                }`}
              >
                {occasion.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Generate Outfit Button */}
        <Button
          onClick={handleGenerateOutfit}
          className="w-full mb-8"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate My Outfit
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card 
            className="p-6 cursor-pointer"
            onClick={() => navigate('/wardrobe')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">👕</span>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">My Wardrobe</h3>
              <p className="text-sm text-stoneGray">Manage clothes</p>
            </div>
          </Card>
          
          <Card 
            className="p-6 cursor-pointer"
            onClick={() => navigate('/trends')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">Trends</h3>
              <p className="text-sm text-stoneGray">Fashion inspiration</p>
            </div>
          </Card>
        </div>

        {/* Recent Outfits */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-charcoal">Recent Outfits</h3>
            <button className="text-sm text-terracotta hover:text-burntSienna font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOutfits.map((outfit, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-warmBeige/50 transition-colors">
                <div className="w-14 h-14 bg-softTaupe rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-charcoal">{outfit.name}</p>
                  <p className="text-sm text-stoneGray">{outfit.date}</p>
                </div>
                <ChevronDown className="w-5 h-5 text-stoneGray" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home