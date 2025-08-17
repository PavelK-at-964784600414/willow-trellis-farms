'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'

export default function Checkout() {
  const { data: session } = useSession()
  const { state, clearCart } = useCart()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    customerName: session?.user?.name || '',
    customerEmail: session?.user?.email || '',
    customerPhone: '',
    pickupNotes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!session) {
    if (typeof window !== 'undefined') {
      router.push('/auth/signin')
    }
    return null
  }

  if (state.items.length === 0) {
    if (typeof window !== 'undefined') {
      router.push('/cart')
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const orderData = {
        items: state.items,
        ...formData
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/order-success?orderId=${data.orderId}`)

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#D9D7D3'}}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <h1 className="text-3xl font-rustic font-bold mb-8" style={{color: '#000000'}}>🛒 Checkout - Farm Pickup</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
              <h2 className="text-xl font-rustic font-semibold mb-6" style={{color: '#000000'}}>
                📋 Pickup Information
              </h2>
              
              {/* Pickup Info Banner */}
              <div className="bg-gray-50 border-l-4 border-gray-300 p-4 mb-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🚜</span>
                  <div>
                    <h3 className="font-semibold" style={{color: '#000000'}}>Farm Pickup Location</h3>
                    <p className="text-sm mt-1" style={{color: '#000000'}}>
                      📍 3013 Upper Otterson, Ottawa, ON<br/>
                      🕒 Tuesday-Sunday: 8AM-6PM<br/>
                      📞 (613) 581-9303
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium" style={{color: '#000000'}}>
                    Full Name
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    style={{color: '#000000'}}
                  />
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium" style={{color: '#000000'}}>
                    Email Address
                  </label>
                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    style={{color: '#000000'}}
                  />
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium" style={{color: '#000000'}}>
                    Phone Number
                  </label>
                  <input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    style={{color: '#000000'}}
                    placeholder="+1 (555) 123-4567"
                  />
                  <p className="text-xs mt-1" style={{color: '#000000'}}>We&apos;ll call you if there are any questions about your order</p>
                </div>

                <div>
                  <label htmlFor="pickupNotes" className="block text-sm font-medium" style={{color: '#000000'}}>
                    Pickup Notes (Optional)
                  </label>
                  <textarea
                    id="pickupNotes"
                    name="pickupNotes"
                    rows={3}
                    value={formData.pickupNotes}
                    onChange={(e) => setFormData({ ...formData, pickupNotes: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    style={{color: '#000000'}}
                    placeholder="Any special requests or preferred pickup time..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 shadow-lg"
                >
                  {loading ? 'Placing Order...' : `🌾 Confirm Pickup Order - $${state.total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
              <h2 className="text-xl font-rustic font-semibold mb-6" style={{color: '#000000'}}>
                🧺 Your Farm Basket
              </h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium" style={{color: '#000000'}}>{item.name}</h3>
                      <p className="text-sm" style={{color: '#000000'}}>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold" style={{color: '#000000'}}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between" style={{color: '#000000'}}>
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{color: '#000000'}}>
                  <span>Pickup Fee</span>
                  <span className="text-green-600 font-medium">Free!</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2" style={{color: '#000000'}}>
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 text-sm bg-gray-50 p-4 rounded-lg" style={{color: '#000000'}}>
                <h4 className="font-semibold mb-2" style={{color: '#000000'}}>🌾 Pickup Details:</h4>
                <ul className="space-y-1">
                  <li>• Fresh produce ready within 2-4 hours</li>
                  <li>• Free farm pickup (no delivery fees!)</li>
                  <li>• Visit our farm stand and see where your food grows</li>
                  <li>• Meet the farmers who grew your produce</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
