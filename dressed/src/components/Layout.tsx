import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import Header from './Header'

const Layout: React.FC = () => {
  const location = useLocation()
  const isOnboarding = location.pathname === '/onboarding'

  if (isOnboarding) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}

export default Layout
