import React from 'react'
import { useApp } from '../contexts/AppContext'
import { Cloud, MapPin, Search, Bell, User } from 'lucide-react'

const Header: React.FC = () => {
  const { state } = useApp()
  const { weather } = state

  return (
    <header className="nav-top">
      <div className="container">
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-display font-semibold text-charcoal">
              Dressed
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {weather && (
              <div className="weather-info">
                <Cloud className="w-4 h-4" />
                <span>{weather.temperature}°C</span>
                <MapPin className="w-3 h-3" />
                <span>{weather.location}</span>
              </div>
            )}
            
            <button className="btn-icon">
              <Search className="h-5 w-5" />
            </button>
            <button className="btn-icon">
              <Bell className="h-5 w-5" />
            </button>
            <button className="btn-icon">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
