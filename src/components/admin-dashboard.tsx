'use client'

import { useState } from 'react'
import { 
  Users, 
  Store, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  PieChart, 
  Activity,
  Settings,
  Eye,
  Ban,
  UserCheck,
  FileText,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface AdminStats {
  totalUsers: number
  totalVendors: number
  totalOrders: number
  totalRevenue: number
  activeUsers: number
  pendingVendors: number
  todayOrders: number
  todayRevenue: number
}

interface User {
  id: number
  name: string
  email: string
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN'
  status: 'active' | 'suspended' | 'pending'
  createdAt: string
  lastLogin: string
}

interface Vendor {
  id: number
  storeName: string
  email: string
  rating: number
  totalOrders: number
  revenue: number
  status: 'active' | 'suspended' | 'pending'
  createdAt: string
}

interface Order {
  id: number
  orderNumber: string
  customerName: string
  vendorName: string
  totalAmount: number
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedTimeRange, setSelectedTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('today')

  // Mock data
  const stats: AdminStats = {
    totalUsers: 15420,
    totalVendors: 342,
    totalOrders: 8756,
    totalRevenue: 284750,
    activeUsers: 3240,
    pendingVendors: 18,
    todayOrders: 156,
    todayRevenue: 4280
  }

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CUSTOMER', status: 'active', createdAt: '2024-01-10', lastLogin: '2024-01-19 14:30' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'VENDOR', status: 'active', createdAt: '2024-01-08', lastLogin: '2024-01-19 09:15' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'CUSTOMER', status: 'suspended', createdAt: '2024-01-05', lastLogin: '2024-01-15 16:45' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'VENDOR', status: 'pending', createdAt: '2024-01-18', lastLogin: 'Never' },
  ]

  const mockVendors: Vendor[] = [
    { id: 1, storeName: 'Burger Palace', email: 'burger@palace.com', rating: 4.8, totalOrders: 1250, revenue: 15780, status: 'active', createdAt: '2024-01-02' },
    { id: 2, storeName: 'Pizza Express', email: 'pizza@express.com', rating: 4.6, totalOrders: 980, revenue: 12450, status: 'active', createdAt: '2024-01-05' },
    { id: 3, storeName: 'Sushi Master', email: 'sushi@master.com', rating: 4.9, totalOrders: 1560, revenue: 28900, status: 'active', createdAt: '2024-01-01' },
    { id: 4, storeName: 'Taco Fiesta', email: 'taco@fiesta.com', rating: 4.7, totalOrders: 340, revenue: 5680, status: 'suspended', createdAt: '2024-01-12' },
  ]

  const mockOrders: Order[] = [
    { id: 1, orderNumber: 'ORD001', customerName: 'John Doe', vendorName: 'Burger Palace', totalAmount: 45.99, status: 'delivered', createdAt: '2024-01-19 14:30' },
    { id: 2, orderNumber: 'ORD002', customerName: 'Jane Smith', vendorName: 'Pizza Express', totalAmount: 32.50, status: 'in_transit', createdAt: '2024-01-19 13:45' },
    { id: 3, orderNumber: 'ORD003', customerName: 'Bob Johnson', vendorName: 'Sushi Master', totalAmount: 67.25, status: 'pending', createdAt: '2024-01-19 12:15' },
    { id: 4, orderNumber: 'ORD004', customerName: 'Alice Brown', vendorName: 'Taco Fiesta', totalAmount: 28.99, status: 'cancelled', createdAt: '2024-01-19 11:30' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'in_transit': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'suspended': return Ban
      case 'pending': return Clock
      case 'delivered': return CheckCircle
      case 'in_transit': return Package
      case 'cancelled': return AlertTriangle
      default: return Clock
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800'
      case 'VENDOR': return 'bg-blue-100 text-blue-800'
      case 'CUSTOMER': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Platform Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                Logout
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
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVendors}</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Store className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+22% from last month</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">New user registration</span>
                      </div>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Store className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">New vendor application</span>
                      </div>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm">Large order placed</span>
                      </div>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <span className="text-sm font-medium text-green-600">124ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Status</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Uptime</span>
                      <span className="text-sm font-medium text-green-600">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="text-sm font-medium text-green-600">0.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">User</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Role</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Joined</th>
                        <th className="text-left p-2">Last Login</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => {
                        const StatusIcon = getStatusIcon(user.status)
                        return (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-2 text-sm">{user.email}</td>
                            <td className="p-2">
                              <Badge className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <Badge className={getStatusColor(user.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-2 text-sm">{user.createdAt}</td>
                            <td className="p-2 text-sm">{user.lastLogin}</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {user.status === 'active' ? (
                                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Store</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Orders</th>
                        <th className="text-left p-2">Revenue</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockVendors.map((vendor) => {
                        const StatusIcon = getStatusIcon(vendor.status)
                        return (
                          <tr key={vendor.id} className="border-b">
                            <td className="p-2 font-medium">{vendor.storeName}</td>
                            <td className="p-2 text-sm">{vendor.email}</td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span>{vendor.rating}</span>
                              </div>
                            </td>
                            <td className="p-2">{vendor.totalOrders}</td>
                            <td className="p-2">${vendor.revenue.toLocaleString()}</td>
                            <td className="p-2">
                              <Badge className={getStatusColor(vendor.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {vendor.status}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {vendor.status === 'pending' ? (
                                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Order #</th>
                        <th className="text-left p-2">Customer</th>
                        <th className="text-left p-2">Vendor</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status)
                        return (
                          <tr key={order.id} className="border-b">
                            <td className="p-2 font-medium">{order.orderNumber}</td>
                            <td className="p-2">{order.customerName}</td>
                            <td className="p-2">{order.vendorName}</td>
                            <td className="p-2 font-medium">${order.totalAmount}</td>
                            <td className="p-2">
                              <Badge className={getStatusColor(order.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {order.status}
                              </Badge>
                            </td>
                            <td className="p-2 text-sm">{order.createdAt}</td>
                            <td className="p-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Revenue Chart</p>
                      <p className="text-sm text-gray-500">Line chart showing revenue trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Order Categories</p>
                      <p className="text-sm text-gray-500">Pie chart showing order breakdown</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">User Activity</p>
                      <p className="text-sm text-gray-500">Active users over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Avg. Order Value</span>
                      <span className="font-medium">$32.50</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-medium">3.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Customer Satisfaction</span>
                      <span className="font-medium">4.6/5.0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Vendor Retention</span>
                      <span className="font-medium">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}