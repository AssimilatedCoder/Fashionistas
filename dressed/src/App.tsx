import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import Trends from './pages/Trends'
import Profile from './pages/Profile'
import Onboarding from './pages/Onboarding'
import OutfitGenerator from './pages/OutfitGenerator'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="wardrobe" element={<Wardrobe />} />
              <Route path="trends" element={<Trends />} />
              <Route path="profile" element={<Profile />} />
              <Route path="outfit-generator" element={<OutfitGenerator />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
