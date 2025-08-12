'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Suspense } from 'react'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your order. We&apos;ll start preparing your fresh produce right away.
        </p>
        
        {orderId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-semibold text-green-700">{orderId}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You&apos;ll receive a confirmation email shortly</li>
              <li>• We&apos;ll send you SMS updates on your order status</li>
              <li>• Your fresh produce will be ready for pickup within 24 hours</li>
              <li>• Track your order in the &quot;My Orders&quot; section</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link
            href="/orders"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition-colors mr-4"
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            className="inline-block border border-green-600 text-green-600 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-green-600 hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <Suspense fallback={
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
          </div>
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </div>
  )
}
