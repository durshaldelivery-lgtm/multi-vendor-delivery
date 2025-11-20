'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, CreditCard, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CartItem {
  id: number
  name: string
  vendor: string
  price: number
  quantity: number
  image: string
}

interface OrderForm {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  notes: string
}

export default function OrderSystem() {
  const [currentView, setCurrentView] = useState<'cart' | 'checkout' | 'tracking'>('cart')
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Classic Burger', vendor: 'Burger Palace', price: 12.99, quantity: 2, image: '/api/placeholder/100/100' },
    { id: 2, name: 'Cheese Pizza', vendor: 'Pizza Express', price: 14.99, quantity: 1, image: '/api/placeholder/100/100' },
    { id: 3, name: 'Caesar Salad', vendor: 'Burger Palace', price: 8.99, quantity: 1, image: '/api/placeholder/100/100' },
  ])

  const [orderForm, setOrderForm] = useState<OrderForm>({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    notes: ''
  })

  const [placedOrder, setPlacedOrder] = useState<any>(null)

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateDeliveryFee = () => {
    return cartItems.length > 0 ? 3.99 : 0
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee()
  }

  const handlePlaceOrder = () => {
    const order = {
      id: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cartItems,
      customer: orderForm,
      subtotal: calculateSubtotal(),
      deliveryFee: calculateDeliveryFee(),
      total: calculateTotal(),
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toLocaleTimeString(),
      createdAt: new Date().toLocaleString()
    }
    setPlacedOrder(order)
    setCurrentView('tracking')
    setCartItems([])
  }

  if (currentView === 'tracking' && placedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2" />
                Order Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-gray-600">Order ID: {placedOrder.id}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Order Status</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <span>Order Confirmed</span>
                  </div>
                  <span className="text-sm text-gray-600">{placedOrder.createdAt}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                    <span>Preparing</span>
                  </div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
                    <span>Out for Delivery</span>
                  </div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
                    <span>Delivered</span>
                  </div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Delivery Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{placedOrder.customer.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Estimated delivery: {placedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Paid: ${placedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {placedOrder.items.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.vendor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentView('cart')}>
                  Back to Shopping
                </Button>
                <Button>
                  Track Live Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-6 w-6 mr-2" />
                Checkout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Delivery Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={orderForm.customerName}
                        onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={orderForm.customerPhone}
                        onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        value={orderForm.deliveryAddress}
                        onChange={(e) => setOrderForm({...orderForm, deliveryAddress: e.target.value})}
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Input
                        id="notes"
                        value={orderForm.notes}
                        onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                        placeholder="Special instructions..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${calculateDeliveryFee().toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={handlePlaceOrder}
                      disabled={!orderForm.customerName || !orderForm.customerPhone || !orderForm.deliveryAddress}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Place Order
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setCurrentView('cart')}>
                      Back to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2" />
                Shopping Cart ({cartItems.length} items)
              </div>
              {cartItems.length > 0 && (
                <Button onClick={() => setCurrentView('checkout')}>
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
                <Button onClick={() => window.history.back()}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center p-4 border rounded-lg">
                        <div className="w-20 h-20 bg-gray-200 rounded mr-4"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.vendor}</p>
                          <p className="font-medium text-primary">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>${calculateDeliveryFee().toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => setCurrentView('checkout')}
                      >
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}