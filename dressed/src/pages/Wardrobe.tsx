import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { Plus, Filter, Search, Grid, List, Camera } from 'lucide-react'
import { WardrobeItem, ClothingCategory, WardrobeFilters } from '../types'

const Wardrobe: React.FC = () => {
  const { state } = useApp()
  const { wardrobeItems } = state
  
  const [filters, setFilters] = useState<WardrobeFilters>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const categories: ClothingCategory[] = ['tops', 'bottoms', 'outerwear', 'shoes', 'accessories']

  const filteredItems = wardrobeItems.filter(item => {
    // Search filter
    if (searchQuery && !item.tags.some(tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false
    }
    
    // Category filter
    if (filters.category && item.category !== filters.category) {
      return false
    }
    
    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      if (!filters.colors.some(color => item.colors.includes(color))) {
        return false
      }
    }
    
    // Season filter
    if (filters.season && filters.season.length > 0) {
      if (!filters.season.some(season => item.season.includes(season as any))) {
        return false
      }
    }
    
    // Formality filter
    if (filters.formality && item.formality !== filters.formality) {
      return false
    }
    
    return true
  })

  const handleAddItem = () => {
    // TODO: Implement add item functionality
    console.log('Add new item')
  }

  const handleItemClick = (item: WardrobeItem) => {
    // TODO: Implement item detail view
    console.log('View item:', item)
  }

  return (
    <div className="min-h-screen bg-ivory pb-20">
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal mb-2">
              My Wardrobe
            </h1>
            <p className="text-stoneGray">
              {filteredItems.length} items in your collection
            </p>
          </div>
          <Button
            onClick={handleAddItem}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stoneGray w-5 h-5" />
            <input
              type="text"
              placeholder="Search your wardrobe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilters({})}
              className={`tag ${Object.keys(filters).length === 0 ? 'tag-active' : ''}`}
            >
              All Items
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilters({ ...filters, category })}
                className={`tag ${filters.category === category ? 'tag-active' : ''}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-icon ${viewMode === 'grid' ? 'bg-terracotta text-ivory' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn-icon ${viewMode === 'list' ? 'bg-terracotta text-ivory' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button className="btn-tertiary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Wardrobe Grid/List */}
        {filteredItems.length === 0 ? (
          <Card className="text-center p-12">
            <div className="w-20 h-20 bg-softTaupe rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👕</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              {searchQuery || Object.keys(filters).length > 0 ? 'No items found' : 'Your wardrobe is empty'}
            </h3>
            <p className="text-stoneGray mb-6">
              {searchQuery || Object.keys(filters).length > 0 
                ? 'Try adjusting your search or filters'
                : 'Start building your digital wardrobe by adding your first item'
              }
            </p>
            <Button onClick={handleAddItem} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 'grid-responsive' : 'space-y-4'}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="wardrobe-item"
                onClick={() => handleItemClick(item)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <img
                      src={item.photoUrl}
                      alt={item.tags.join(', ')}
                      className="wardrobe-photo"
                    />
                    <div className="wardrobe-info">
                      <h3 className="wardrobe-title">
                        {item.tags.slice(0, 2).join(' ')}
                      </h3>
                      <div className="wardrobe-tags">
                        {item.category} • {item.colors[0]} • {item.formality}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-4 p-4">
                    <img
                      src={item.photoUrl}
                      alt={item.tags.join(', ')}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-charcoal mb-1">
                        {item.tags.slice(0, 2).join(' ')}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-stoneGray">
                        <span className="tag">{item.category}</span>
                        <span className="tag">{item.colors[0]}</span>
                        <span className="tag">{item.formality}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-stoneGray">
                        {item.season.join(', ')}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wardrobe