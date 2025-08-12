'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { format } from 'date-fns'

interface Order {
  id: string
  status: string
  total: number
  customerName: string
  customerEmail: string
  customerPhone?: string
  deliveryAddress?: string
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: {
      name: string
      imageUrl: string
    }
  }>
}

export default function Orders() {
  const { data: session } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchOrders()
  }, [session])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      const data = await response.json()
      setOrders(data)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      PROCESSING: 'bg-purple-100 text-purple-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
        {status.toLowerCase()}
      </span>
    )
  }

  if (!session) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-light-text mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-light-text mb-4">You haven't placed any orders yet.</p>
            <Link
              href="/products"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-light-text">
                      Order #{order.id.slice(-8)}
                    </h3>
                    <p className="text-sm text-light-text">
                      Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                    {getStatusBadge(order.status)}
                    <span className="text-lg font-semibold text-light-text">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-light-text mb-2">Items:</h4>
                  <div className="space-y-2 text-light-text">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span>
                          {item.product.name} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {order.deliveryAddress && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-light-text mb-1">Delivery Address:</h4>
                    <p className="text-sm text-light-text">{order.deliveryAddress}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
