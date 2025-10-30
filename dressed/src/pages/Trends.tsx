import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import Card from '../components/ui/Card'
import { Heart, Bookmark, Share, Filter, Search } from 'lucide-react'
import { Trend } from '../types'

const Trends: React.FC = () => {
  const { state } = useApp()
  const { trends } = state
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [likedTrends, setLikedTrends] = useState<Set<string>>(new Set())
  const [savedTrends, setSavedTrends] = useState<Set<string>>(new Set())

  const categories = ['all', 'Color Trends', 'Styling Tips', 'Outfit Formulas', 'Seasonal']

  const filteredTrends = trends.filter(trend => {
    const matchesSearch = !searchQuery || 
      trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || trend.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleLike = (trendId: string) => {
    setLikedTrends(prev => {
      const newSet = new Set(prev)
      if (newSet.has(trendId)) {
        newSet.delete(trendId)
      } else {
        newSet.add(trendId)
      }
      return newSet
    })
  }

  const handleSave = (trendId: string) => {
    setSavedTrends(prev => {
      const newSet = new Set(prev)
      if (newSet.has(trendId)) {
        newSet.delete(trendId)
      } else {
        newSet.add(trendId)
      }
      return newSet
    })
  }

  const handleShare = (trend: Trend) => {
    if (navigator.share) {
      navigator.share({
        title: trend.title,
        text: trend.description,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${trend.title} - ${trend.description}`)
    }
  }

  return (
    <div className="min-h-screen bg-ivory pb-20">
      <div className="container py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal mb-2">
            Fashion Trends
          </h1>
          <p className="text-lg text-stoneGray">
            Discover the latest in fashion and styling inspiration
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stoneGray w-5 h-5" />
            <input
              type="text"
              placeholder="Search trends and styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`tag ${selectedCategory === category ? 'tag-active' : ''}`}
              >
                {category === 'all' ? 'All Trends' : category}
              </button>
            ))}
          </div>

          {/* Additional Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-stoneGray">
                {filteredTrends.length} trends found
              </span>
            </div>
            
            <button className="btn-tertiary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Sort & Filter
            </button>
          </div>
        </div>

        {/* Trends Grid */}
        {filteredTrends.length === 0 ? (
          <Card className="text-center p-12">
            <div className="w-20 h-20 bg-softTaupe rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              No trends found
            </h3>
            <p className="text-stoneGray mb-6">
              Try adjusting your search or filters to discover more trends
            </p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Show All Trends
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrends.map((trend) => (
              <Card key={trend.id} className="trend-card">
                <img
                  src={trend.imageUrl}
                  alt={trend.title}
                  className="trend-image"
                />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag tag-casual">
                      {trend.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(trend.id)}
                        className={`text-stoneGray hover:text-terracotta transition-colors ${
                          likedTrends.has(trend.id) ? 'text-terracotta' : ''
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${likedTrends.has(trend.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleSave(trend.id)}
                        className={`text-stoneGray hover:text-terracotta transition-colors ${
                          savedTrends.has(trend.id) ? 'text-terracotta' : ''
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${savedTrends.has(trend.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleShare(trend)}
                        className="text-stoneGray hover:text-terracotta transition-colors"
                      >
                        <Share className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="trend-title">
                    {trend.title}
                  </h3>
                  
                  <p className="trend-description">
                    {trend.description}
                  </p>
                  
                  <div className="trend-actions">
                    <div className="trend-likes">
                      <Heart className="w-4 h-4" />
                      <span>{trend.likes + (likedTrends.has(trend.id) ? 1 : 0)}</span>
                    </div>
                    
                    <button
                      onClick={() => handleSave(trend.id)}
                      className={`trend-save ${
                        savedTrends.has(trend.id) ? 'text-terracotta' : ''
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedTrends.has(trend.id) ? 'fill-current' : ''}`} />
                      <span className="ml-1">
                        {savedTrends.has(trend.id) ? 'Saved' : 'Save'}
                      </span>
                    </button>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {trend.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Trends