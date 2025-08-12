'use client'

import { Navigation } from '@/components/Navigation'
import { useCart } from '@/contexts/CartContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Cart() {
  const { state, updateQuantity, removeItem } = useCart()
  const { data: session } = useSession()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-farm-cream-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-farm-green-800 mb-4">Your Cart</h1>
            <p className="text-lg text-farm-brown-600 mb-8">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-farm-green-600 text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-farm-green-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-farm-cream-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
                        <div className="bg-farm-cream-100 rounded-lg shadow-md border border-farm-brown-200">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center p-6 border-b border-farm-brown-200 last:border-b-0">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="80px"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-farm-green-800">
                      {item.name}
                    </h3>
                    <p className="text-farm-green-600 font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-farm-cream-100 rounded text-farm-brown-600"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    
                    <span className="w-12 text-center font-medium text-farm-green-800">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-farm-cream-100 rounded text-farm-brown-600"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="ml-4 text-lg font-semibold text-farm-green-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-farm-cream-100 rounded-lg shadow-md border border-farm-brown-200 p-6">
              <h2 className="text-xl font-semibold text-farm-green-800 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-2 mb-4 text-farm-brown-700">
                <div className="flex justify-between">
                  <span>Items ({state.itemCount})</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="border-t border-farm-brown-200 pt-2">
                  <div className="flex justify-between font-semibold text-lg text-farm-green-800">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {session ? (
                <Link
                  href="/checkout"
                  className="w-full bg-farm-green-600 text-white py-3 px-4 rounded-md hover:bg-farm-green-700 transition-colors text-center block font-semibold"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-farm-brown-600 text-center">
                    Please sign in to checkout
                  </p>
                  <Link
                    href="/auth/signin"
                    className="w-full bg-farm-green-600 text-white py-3 px-4 rounded-md hover:bg-farm-green-700 transition-colors text-center block font-semibold"
                  >
                    Sign In
                  </Link>
                </div>
              )}
              
              <div className="mt-4">
                <Link
                  href="/products"
                  className="w-full border border-farm-green-600 text-farm-green-600 py-3 px-4 rounded-md hover:bg-farm-green-50 transition-colors text-center block font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
