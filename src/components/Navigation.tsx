'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'

export function Navigation() {
  const { data: session } = useSession()
  const { state } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg border-b-4 border-gray-300" style={{backgroundColor: '#D9D7D3', color: '#000000'}}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Section - Responsive */}
          <div className="flex items-center min-w-0 flex-1">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="text-2xl sm:text-3xl">🌿</div>
              <div className="min-w-0">
                <div className="text-sm sm:text-xl font-rustic font-bold truncate" style={{color: '#000000'}}>
                  Willow Trellis Farms
                </div>
                <div className="text-xs text-gray-600 font-medium hidden sm:block">
                  Fresh • Local • Farm Pickup
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Items - Responsive */}
          <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-6">
            {/* Fresh Produce - Hidden on very small screens */}
            <Link
              href="/products"
              className="hover:text-gray-600 transition-colors font-medium hidden xs:block text-sm sm:text-base" 
              style={{color: '#000000'}}
            >
              <span className="hidden sm:inline">Fresh Produce</span>
              <span className="sm:hidden">Produce</span>
            </Link>

            {/* My Pickups - Only show when session exists */}
            {session && (
              <Link
                href="/orders"
                className="hover:text-gray-600 transition-colors font-medium hidden sm:block text-sm sm:text-base" 
                style={{color: '#000000'}}
              >
                <span className="hidden md:inline">My Pickups</span>
                <span className="md:hidden">Orders</span>
              </Link>
            )}

            {/* Cart - Always visible */}
            <Link
              href="/cart"
              className="relative hover:text-gray-600 transition-colors group" 
              style={{color: '#000000'}}
            >
              <div className="flex items-center space-x-1">
                <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm font-medium hidden md:block">Cart</span>
              </div>
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* User Section - Responsive */}
            {session ? (
              <div className="flex items-center space-x-1 sm:space-x-3">
                <Link 
                  href="/profile"
                  className="flex items-center space-x-1 sm:space-x-2 hover:text-gray-600 transition-colors" 
                  style={{color: '#000000'}}
                >
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium hidden lg:block">
                    {session.user?.name}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-gray-600"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-3">
                <Link
                  href="/auth/signin"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-gray-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-500 text-white hover:bg-green-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors font-semibold"
                >
                  <span className="hidden sm:inline">Join Farm</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
