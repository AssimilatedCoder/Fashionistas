import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Shirt, TrendingUp, User } from 'lucide-react'
import { cn } from '../utils/cn'

const BottomNavigation: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/wardrobe', icon: Shirt, label: 'Closet' },
    { path: '/trends', icon: TrendingUp, label: 'Trends' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="nav-bottom">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
