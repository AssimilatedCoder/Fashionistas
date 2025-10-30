import React from 'react'
import { useApp } from '../contexts/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { User, Settings, Palette, Heart, Shirt, TrendingUp } from 'lucide-react'

const Profile: React.FC = () => {
  const { state } = useApp()
  const { userProfile, wardrobeItems, trends } = state

  if (!userProfile) {
    return (
      <div className="p-6">
        <Card className="text-center p-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-secondary-900">
              Profile Not Found
            </h2>
            <p className="text-secondary-600">
              Please complete the onboarding process first.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-semibold text-secondary-900">
              Your Style Profile
            </h1>
            <p className="text-secondary-600">
              {userProfile.location}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Style Preferences */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Style Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-secondary-700 mb-2">Style Vibe</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.style.map((style, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-secondary-700 mb-2">Favorite Colors</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.favoriteColors.map((color, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-secondary-700 mb-2">Color Spectrum</h3>
            <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
              {userProfile.colorSpectrum}
            </span>
          </div>
        </div>
      </Card>

      {/* Comfort Level */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">
          Comfort Preferences
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600">Heels</span>
            <span className="text-sm font-medium text-secondary-900 capitalize">
              {userProfile.comfortLevel.heels}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600">Tight Clothing</span>
            <span className="text-sm font-medium text-secondary-900 capitalize">
              {userProfile.comfortLevel.tightClothing}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600">Skirts vs Pants</span>
            <span className="text-sm font-medium text-secondary-900 capitalize">
              {userProfile.comfortLevel.skirtsVsPants}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600">Layers</span>
            <span className="text-sm font-medium text-secondary-900 capitalize">
              {userProfile.comfortLevel.layers}
            </span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shirt className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {wardrobeItems.length}
          </div>
          <div className="text-sm text-secondary-600">Wardrobe Items</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {trends.length}
          </div>
          <div className="text-sm text-secondary-600">Saved Trends</div>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full">
          Edit Profile
        </Button>
        <Button variant="secondary" className="w-full">
          Export Data
        </Button>
        <Button variant="ghost" className="w-full text-red-600 hover:text-red-700">
          Reset Profile
        </Button>
      </div>
    </div>
  )
}

export default Profile
