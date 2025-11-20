'use client'

import { useState } from 'react'
import { Truck, MapPin, Clock, CheckCircle, Package, Navigation, Phone, User, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DeliveryOrder {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress: string
  vendorName: string
  vendorAddress: string
  items: { name: string; quantity: number }[]
  totalAmount: number
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered'
  deliveryPerson?: string
  estimatedTime: string
  actualTime?: string
  createdAt: string
}

export default function DeliveryManagement() {
  const [activeTab, setActiveTab] = useState('available')
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null)

  const availableOrders: DeliveryOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD001',
      customerName: 'John Doe',
      customerPhone: '+1 555-0123',
      customerAddress: '123 Main St, New York, NY 10001',
      vendorName: 'Burger Palace',
      vendorAddress: '456 Food Ave, New York, NY 10002',
      items: [
        { name: 'Classic Burger', quantity: 2 },
        { name: 'French Fries', quantity: 1 }
      ],
      totalAmount: 32.99,
      status: 'pending',
      estimatedTime: '30-40 min',
      createdAt: '2024-01-15 12:30 PM'
    },
    {
      id: '2',
      orderNumber: 'ORD002',
      customerName: 'Jane Smith',
      customerPhone: '+1 555-0124',
      customerAddress: '789 Oak St, Brooklyn, NY 11201',
      vendorName: 'Pizza Express',
      vendorAddress: '321 Pizza Way, Brooklyn, NY 11202',
      items: [
        { name: 'Margherita Pizza', quantity: 1 },
        { name: 'Garlic Bread', quantity: 2 }
      ],
      totalAmount: 28.50,
      status: 'pending',
      estimatedTime: '25-35 min',
      createdAt: '2024-01-15 12:45 PM'
    }
  ]

  const activeDeliveries: DeliveryOrder[] = [
    {
      id: '3',
      orderNumber: 'ORD003',
      customerName: 'Bob Johnson',
      customerPhone: '+1 555-0125',
      customerAddress: '321 Elm St, Queens, NY 11375',
      vendorName: 'Sushi Master',
      vendorAddress: '654 Sushi Blvd, Queens, NY 11376',
      items: [
        { name: 'California Roll', quantity: 2 },
        { name: 'Miso Soup', quantity: 1 }
      ],
      totalAmount: 45.99,
      status: 'in_transit',
      deliveryPerson: 'Mike Wilson',
      estimatedTime: '15-20 min',
      createdAt: '2024-01-15 11:30 AM'
    },
    {
      id: '4',
      orderNumber: 'ORD004',
      customerName: 'Alice Brown',
      customerPhone: '+1 555-0126',
      customerAddress: '987 Pine St, Manhattan, NY 10027',
      vendorName: 'Taco Fiesta',
      vendorAddress: '147 Taco Plaza, Manhattan, NY 10028',
      items: [
        { name: 'Beef Tacos', quantity: 3 },
        { name: 'Nachos', quantity: 1 }
      ],
      totalAmount: 38.75,
      status: 'picked_up',
      deliveryPerson: 'Sarah Davis',
      estimatedTime: '10-15 min',
      createdAt: '2024-01-15 12:00 PM'
    }
  ]

  const completedDeliveries: DeliveryOrder[] = [
    {
      id: '5',
      orderNumber: 'ORD005',
      customerName: 'Charlie Wilson',
      customerPhone: '+1 555-0127',
      customerAddress: '555 Maple Dr, Bronx, NY 10451',
      vendorName: 'Burger Palace',
      vendorAddress: '456 Food Ave, New York, NY 10002',
      items: [
        { name: 'Cheeseburger', quantity: 1 },
        { name: 'Onion Rings', quantity: 1 }
      ],
      totalAmount: 18.99,
      status: 'delivered',
      deliveryPerson: 'Tom Anderson',
      estimatedTime: '35-45 min',
      actualTime: '32 min',
      createdAt: '2024-01-15 10:30 AM'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'assigned': return 'bg-blue-100 text-blue-800'
      case 'picked_up': return 'bg-purple-100 text-purple-800'
      case 'in_transit': return 'bg-orange-100 text-orange-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock
      case 'assigned': return User
      case 'picked_up': return Package
      case 'in_transit': return Truck
      case 'delivered': return CheckCircle
      default: return Clock
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Assignment'
      case 'assigned': return 'Delivery Person Assigned'
      case 'picked_up': return 'Order Picked Up'
      case 'in_transit': return 'In Transit'
      case 'delivered': return 'Delivered'
      default: return 'Unknown'
    }
  }

  const handleAcceptOrder = (order: DeliveryOrder) => {
    // In a real app, this would update the order status in the database
    alert(`Order ${order.orderNumber} assigned to you!`)
  }

  const handleUpdateStatus = (order: DeliveryOrder, newStatus: string) => {
    // In a real app, this would update the order status in the database
    alert(`Order ${order.orderNumber} status updated to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold">Delivery Management</h1>
                <p className="text-sm text-gray-600">Track and manage deliveries</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Live Map
              </Button>
              <Button size="sm">
                <Package className="h-4 w-4 mr-2" />
                New Delivery
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">{availableOrders.length}</p>
                  <p className="text-sm text-blue-600">Ready for pickup</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{activeDeliveries.length}</p>
                  <p className="text-sm text-orange-600">On the way</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900">{completedDeliveries.length}</p>
                  <p className="text-sm text-green-600">Successfully delivered</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                  <p className="text-2xl font-bold text-gray-900">28 min</p>
                  <p className="text-sm text-purple-600">Within target</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">Available Orders</TabsTrigger>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableOrders.map((order) => (
                <Card key={order.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                        <p className="text-sm text-gray-600">{order.vendorName} → {order.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Pickup</Label>
                          <div className="flex items-start mt-1">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                            <span className="text-sm">{order.vendorAddress}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Delivery</Label>
                          <div className="flex items-start mt-1">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                            <span className="text-sm">{order.customerAddress}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Order Items</Label>
                        <div className="mt-1 space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <span className="text-lg font-bold text-primary">${order.totalAmount}</span>
                          <span className="text-sm text-gray-600 ml-2">{order.estimatedTime}</span>
                        </div>
                        <Button onClick={() => handleAcceptOrder(order)}>
                          Accept Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeDeliveries.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                        <p className="text-sm text-gray-600">Delivery by: {order.deliveryPerson}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{order.customerPhone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{order.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Truck className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium">Delivery Progress</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ 
                              width: order.status === 'picked_up' ? '50%' : order.status === 'in_transit' ? '75%' : '25%' 
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(order, 'picked_up')}
                        >
                          Mark Picked Up
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(order, 'in_transit')}
                        >
                          In Transit
                        </Button>
                        <Button 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(order, 'delivered')}
                        >
                          Delivered
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Order ID</th>
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Delivery Person</th>
                    <th className="text-left p-2">Total</th>
                    <th className="text-left p-2">Est. Time</th>
                    <th className="text-left p-2">Actual Time</th>
                    <th className="text-left p-2">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {completedDeliveries.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-2 font-medium">{order.orderNumber}</td>
                      <td className="p-2">{order.customerName}</td>
                      <td className="p-2">{order.deliveryPerson}</td>
                      <td className="p-2">${order.totalAmount}</td>
                      <td className="p-2">{order.estimatedTime}</td>
                      <td className="p-2">{order.actualTime}</td>
                      <td className="p-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Delivered
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Live Delivery Map</h3>
                    <p className="text-gray-600 mb-4">Real-time tracking of all active deliveries</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">Available Orders</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-sm">Active Deliveries</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}