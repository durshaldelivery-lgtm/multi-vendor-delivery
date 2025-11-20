'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageSquare, Filter, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Review {
  id: number
  productId: number
  productName: string
  vendorId: number
  vendorName: string
  userId: number
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

interface Product {
  id: number
  name: string
  vendor: string
  averageRating: number
  totalReviews: number
  price: number
  image: string
}

export default function ReviewSystem() {
  const [activeTab, setActiveTab] = useState<'products' | 'vendors'>('products')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [userReview, setUserReview] = useState({ rating: 5, comment: '' })
  const [filterRating, setFilterRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<'recent' | 'rating_high' | 'rating_low' | 'helpful'>('recent')

  // Mock data
  const mockReviews: Review[] = [
    {
      id: 1,
      productId: 1,
      productName: 'Classic Burger',
      vendorId: 1,
      vendorName: 'Burger Palace',
      userId: 1,
      userName: 'John Doe',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Absolutely amazing burger! Fresh ingredients, perfectly cooked, and great portion size. The special sauce is incredible!',
      createdAt: '2024-01-15',
      helpful: 24
    },
    {
      id: 2,
      productId: 1,
      productName: 'Classic Burger',
      vendorId: 1,
      vendorName: 'Burger Palace',
      userId: 2,
      userName: 'Jane Smith',
      rating: 4,
      comment: 'Really good burger, but could use more sauce. Delivery was fast and food was hot.',
      createdAt: '2024-01-14',
      helpful: 18
    },
    {
      id: 3,
      productId: 2,
      productName: 'Margherita Pizza',
      vendorId: 2,
      vendorName: 'Pizza Express',
      userId: 3,
      userName: 'Mike Johnson',
      rating: 5,
      comment: 'Best pizza in town! Crust is perfect, toppings are fresh, and cheese is amazing. Highly recommend!',
      createdAt: '2024-01-13',
      helpful: 32
    },
    {
      id: 4,
      productId: 2,
      productName: 'Margherita Pizza',
      vendorId: 2,
      vendorName: 'Pizza Express',
      userId: 4,
      userName: 'Sarah Wilson',
      rating: 3,
      comment: 'Pizza was okay, but took longer than expected to deliver. Could be hotter.',
      createdAt: '2024-01-12',
      helpful: 8
    }
  ]

  const mockProducts: Product[] = [
    { id: 1, name: 'Classic Burger', vendor: 'Burger Palace', averageRating: 4.7, totalReviews: 156, price: 12.99, image: '/api/placeholder/100/100' },
    { id: 2, name: 'Margherita Pizza', vendor: 'Pizza Express', averageRating: 4.2, totalReviews: 89, price: 14.99, image: '/api/placeholder/100/100' },
    { id: 3, name: 'California Roll', vendor: 'Sushi Master', averageRating: 4.9, totalReviews: 234, price: 18.99, image: '/api/placeholder/100/100' },
    { id: 4, name: 'Beef Tacos', vendor: 'Taco Fiesta', averageRating: 4.5, totalReviews: 67, price: 10.99, image: '/api/placeholder/100/100' },
  ]

  const mockVendors = [
    { id: 1, name: 'Burger Palace', averageRating: 4.6, totalReviews: 423, cuisine: 'American' },
    { id: 2, name: 'Pizza Express', averageRating: 4.3, totalReviews: 289, cuisine: 'Italian' },
    { id: 3, name: 'Sushi Master', averageRating: 4.8, totalReviews: 567, cuisine: 'Japanese' },
    { id: 4, name: 'Taco Fiesta', averageRating: 4.4, totalReviews: 198, cuisine: 'Mexican' },
  ]

  const renderStars = (rating: number, size = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = () => {
    if (!selectedProduct || !userReview.comment.trim()) return
    
    // In real app, this would call API
    alert(`Review submitted for ${selectedProduct.name}!`)
    setUserReview({ rating: 5, comment: '' })
  }

  const handleHelpful = (reviewId: number) => {
    // In real app, this would call API
    alert('Marked as helpful!')
  }

  const filteredReviews = mockReviews.filter(review => {
    if (filterRating > 0) return review.rating >= filterRating
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'rating_high':
        return b.rating - a.rating
      case 'rating_low':
        return a.rating - b.rating
      case 'helpful':
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">QuickDeliver</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button size="sm">Cart</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Product Reviews
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'vendors'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vendor Reviews
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {mockProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.vendor}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              {renderStars(product.averageRating)}
                              <span className="ml-2 text-sm text-gray-600">({product.totalReviews})</span>
                            </div>
                            <span className="font-bold text-primary">${product.price}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Reviews List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-4">
                    <Select value={filterRating.toString()} onValueChange={(value) => setFilterRating(parseInt(value))}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filter by rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="rating_high">Highest Rating</SelectItem>
                        <SelectItem value="rating_low">Lowest Rating</SelectItem>
                        <SelectItem value="helpful">Most Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarFallback>{review.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-medium">{review.userName}</span>
                                <span className="text-sm text-gray-600 ml-2">• {review.createdAt}</span>
                              </div>
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Reviewed {review.productName} at {review.vendorName}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleHelpful(review.id)}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div>
              {selectedProduct ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div>
                        <h4 className="font-semibold">{selectedProduct.name}</h4>
                        <p className="text-sm text-gray-600">{selectedProduct.vendor}</p>
                        <p className="font-bold text-primary">${selectedProduct.price}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Your Rating</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserReview({...userReview, rating: star})}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= userReview.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Your Review</label>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        value={userReview.comment}
                        onChange={(e) => setUserReview({...userReview, comment: e.target.value})}
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitReview}
                      className="w-full"
                      disabled={!userReview.comment.trim()}
                    >
                      Submit Review
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Product to Review</h3>
                    <p className="text-gray-600">Choose a product from the list to write a review</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVendors.map((vendor) => (
              <Card key={vendor.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                    <Badge variant="secondary">{vendor.cuisine}</Badge>
                  </div>
                  <div className="flex items-center mb-4">
                    {renderStars(vendor.averageRating)}
                    <span className="ml-2 text-gray-600">({vendor.totalReviews} reviews)</span>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                    <Button className="w-full">
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}