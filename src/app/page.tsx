'use client'

import { useState } from 'react'
import { Search, ShoppingCart, Star, MapPin, Clock, Truck, Utensils, Package, ArrowRight, Pizza, Salad, IceCream, Coffee, Store, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import VendorDashboard from '@/components/vendor-dashboard'
import OrderSystem from '@/components/order-system'
import AuthSystem from '@/components/auth-system'
import React from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentView, setCurrentView] = useState<'customer' | 'vendor' | 'cart' | 'auth'>('customer')
  const [user, setUser] = useState<any>(null)

  // Check if user is logged in on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    setCurrentView('customer')
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setCurrentView('customer')
  }

  // If auth view is selected, show auth system
  if (currentView === 'auth') {
    return <AuthSystem onAuthSuccess={handleAuthSuccess} onBack={() => setCurrentView('customer')} />
  }

  // Mock data for demonstration
  const featuredVendors = [
    { id: 1, name: 'Burger Palace', cuisine: 'American', rating: 4.8, deliveryTime: '25-35 min', image: '/api/placeholder/200/150' },
    { id: 2, name: 'Pizza Express', cuisine: 'Italian', rating: 4.6, deliveryTime: '30-40 min', image: '/api/placeholder/200/150' },
    { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.9, deliveryTime: '35-45 min', image: '/api/placeholder/200/150' },
    { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.7, deliveryTime: '20-30 min', image: '/api/placeholder/200/150' },
  ]

  const categories = [
    { id: 1, name: 'Fast Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
    { id: 2, name: 'Pizza', icon: Pizza, color: 'bg-red-100 text-red-600' },
    { id: 3, name: 'Asian', icon: Utensils, color: 'bg-green-100 text-green-600' },
    { id: 4, name: 'Healthy', icon: Salad, color: 'bg-blue-100 text-blue-600' },
    { id: 5, name: 'Desserts', icon: IceCream, color: 'bg-pink-100 text-pink-600' },
    { id: 6, name: 'Beverages', icon: Coffee, color: 'bg-purple-100 text-purple-600' },
  ]

  const popularProducts = [
    { id: 1, name: 'Classic Burger', vendor: 'Burger Palace', price: 12.99, rating: 4.8, image: '/api/placeholder/150/150' },
    { id: 2, name: 'Margherita Pizza', vendor: 'Pizza Express', price: 14.99, rating: 4.6, image: '/api/placeholder/150/150' },
    { id: 3, name: 'California Roll', vendor: 'Sushi Master', price: 18.99, rating: 4.9, image: '/api/placeholder/150/150' },
    { id: 4, name: 'Beef Tacos', vendor: 'Taco Fiesta', price: 10.99, rating: 4.7, image: '/api/placeholder/150/150' },
  ]

  // If vendor view is selected, show vendor dashboard
  if (currentView === 'vendor') {
    return <VendorDashboard onBackToCustomer={() => setCurrentView('customer')} />
  }

  // If cart view is selected, show order system
  if (currentView === 'cart') {
    return <OrderSystem />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView('vendor')}>
                <Store className="h-4 w-4 mr-2" />
                Vendor Portal
              </Button>
              {user ? (
                <>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setCurrentView('auth')}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
              <Button size="sm" onClick={() => setCurrentView('cart')}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Food Delivery at Your Doorstep
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Order from your favorite local restaurants and get it delivered fast
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8">Shop by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${category.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <p className="font-medium">{category.name}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Featured Restaurants</h3>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVendors.map((vendor) => (
              <Card key={vendor.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{vendor.name}</h4>
                    <Badge variant="secondary">{vendor.cuisine}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{vendor.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Popular Items</h3>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">How It Works</h3>
            <p className="text-lg text-primary-foreground/80">
              Get your favorite food delivered in 4 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">1. Find Food</h4>
              <p className="text-sm text-primary-foreground/80">Search for restaurants and dishes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">2. Place Order</h4>
              <p className="text-sm text-primary-foreground/80">Add items to cart and checkout</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">3. Track Delivery</h4>
              <p className="text-sm text-primary-foreground/80">Follow your order in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">4. Enjoy</h4>
              <p className="text-sm text-primary-foreground/80">Receive your food at your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">QuickDeliver</h3>
              <p className="text-gray-400">Your favorite food, delivered fast.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Order Food</li>
                <li>Track Orders</li>
                <li>Payment Methods</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Partner With Us</li>
                <li>Restaurant Dashboard</li>
                <li>Delivery Partners</li>
                <li>Marketing Tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuickDeliver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}