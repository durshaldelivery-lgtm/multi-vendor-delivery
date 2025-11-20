'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Star, Clock, MapPin, X, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

interface Product {
  id: number
  name: string
  vendor: string
  vendorId: number
  price: number
  rating: number
  image: string
  category: string
  deliveryTime: string
  inStock: boolean
}

interface Vendor {
  id: number
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  image: string
  address: string
}

interface FilterState {
  searchQuery: string
  selectedCategory: string
  priceRange: [number, number]
  selectedRating: number
  selectedCuisine: string
  sortBy: 'price_low' | 'price_high' | 'rating' | 'delivery_time'
  inStockOnly: boolean
}

const categories = [
  'All', 'Fast Food', 'Pizza', 'Asian', 'Healthy', 'Desserts', 'Beverages', 'Mexican', 'Italian'
]

const cuisines = [
  'All', 'American', 'Italian', 'Japanese', 'Mexican', 'Chinese', 'Indian', 'Thai', 'Mediterranean'
]

const sortOptions = [
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'delivery_time', label: 'Fastest Delivery' }
]

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    priceRange: [0, 100],
    selectedRating: 0,
    selectedCuisine: 'All',
    sortBy: 'rating',
    inStockOnly: false
  })

  // Mock data
  const mockProducts: Product[] = [
    { id: 1, name: 'Classic Burger', vendor: 'Burger Palace', vendorId: 1, price: 12.99, rating: 4.8, image: '/api/placeholder/200/150', category: 'Fast Food', deliveryTime: '25-35 min', inStock: true },
    { id: 2, name: 'Cheese Pizza', vendor: 'Pizza Express', vendorId: 2, price: 14.99, rating: 4.6, image: '/api/placeholder/200/150', category: 'Pizza', deliveryTime: '30-40 min', inStock: true },
    { id: 3, name: 'California Roll', vendor: 'Sushi Master', vendorId: 3, price: 18.99, rating: 4.9, image: '/api/placeholder/200/150', category: 'Asian', deliveryTime: '35-45 min', inStock: true },
    { id: 4, name: 'Beef Tacos', vendor: 'Taco Fiesta', vendorId: 4, price: 10.99, rating: 4.7, image: '/api/placeholder/200/150', category: 'Mexican', deliveryTime: '20-30 min', inStock: true },
    { id: 5, name: 'Caesar Salad', vendor: 'Burger Palace', vendorId: 1, price: 8.99, rating: 4.5, image: '/api/placeholder/200/150', category: 'Healthy', deliveryTime: '25-35 min', inStock: true },
    { id: 6, name: 'Margherita Pizza', vendor: 'Pizza Express', vendorId: 2, price: 13.99, rating: 4.8, image: '/api/placeholder/200/150', category: 'Pizza', deliveryTime: '30-40 min', inStock: false },
    { id: 7, name: 'Pad Thai', vendor: 'Thai Kitchen', vendorId: 5, price: 16.99, rating: 4.6, image: '/api/placeholder/200/150', category: 'Asian', deliveryTime: '40-50 min', inStock: true },
    { id: 8, name: 'Chocolate Cake', vendor: 'Sweet Dreams', vendorId: 6, price: 7.99, rating: 4.9, image: '/api/placeholder/200/150', category: 'Desserts', deliveryTime: '25-35 min', inStock: true },
  ]

  const mockVendors: Vendor[] = [
    { id: 1, name: 'Burger Palace', cuisine: 'American', rating: 4.8, deliveryTime: '25-35 min', image: '/api/placeholder/200/150', address: '123 Main St, New York, NY' },
    { id: 2, name: 'Pizza Express', cuisine: 'Italian', rating: 4.6, deliveryTime: '30-40 min', image: '/api/placeholder/200/150', address: '456 Pizza Ave, New York, NY' },
    { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.9, deliveryTime: '35-45 min', image: '/api/placeholder/200/150', address: '789 Sushi Blvd, New York, NY' },
    { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.7, deliveryTime: '20-30 min', image: '/api/placeholder/200/150', address: '321 Taco Plaza, New York, NY' },
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts)
      setVendors(mockVendors)
      setLoading(false)
    }, 1000)
  }, [])

  const applyFilters = () => {
    let filtered = [...mockProducts]

    // Search filter
    if (filters.searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (filters.selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === filters.selectedCategory)
    }

    // Cuisine filter (based on vendor)
    if (filters.selectedCuisine !== 'All') {
      const vendor = mockVendors.find(v => v.cuisine === filters.selectedCuisine)
      if (vendor) {
        filtered = filtered.filter(product => product.vendorId === vendor.id)
      }
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    // Rating filter
    if (filters.selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.selectedRating)
    }

    // In stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Sort
    switch (filters.sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'delivery_time':
        filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0])
          const bTime = parseInt(b.deliveryTime.split('-')[0])
          return aTime - bTime
        })
        break
    }

    setProducts(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'All',
      priceRange: [0, 100],
      selectedRating: 0,
      selectedCuisine: 'All',
      sortBy: 'rating',
      inStockOnly: false
    })
  }

  const activeFiltersCount = [
    filters.searchQuery,
    filters.selectedCategory !== 'All',
    filters.selectedCuisine !== 'All',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100,
    filters.selectedRating > 0,
    filters.inStockOnly
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">QuickDeliver</h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for food, restaurants, or items..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <Button size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button size="sm">
                Sign In
              </Button>
              <Button size="sm">
                Cart
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-lg sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={filters.selectedCategory} onValueChange={(value) => setFilters({...filters, selectedCategory: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Cuisine</label>
                <Select value={filters.selectedCuisine} onValueChange={(value) => setFilters({...filters, selectedCuisine: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisines.map(cuisine => (
                      <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                <Select value={filters.selectedRating.toString()} onValueChange={(value) => setFilters({...filters, selectedRating: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All Ratings</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* In Stock Only */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="inStock"
                  checked={filters.inStockOnly}
                  onCheckedChange={(checked: boolean) => setFilters({...filters, inStockOnly: checked})}
                />
                <label htmlFor="inStock" className="text-sm font-medium">In Stock Only</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Browse Products</h2>
          <p className="text-gray-600">{products.length} products found</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.name}</h4>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{product.deliveryTime}</span>
                  </div>
                  <Button className="w-full" size="sm" disabled={!product.inStock}>
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}