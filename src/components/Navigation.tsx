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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-3xl">🌿</div>
              <div>
                <div className="text-xl font-rustic font-bold" style={{color: '#000000'}}>
                  Willow Trellis Farms
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  Fresh • Local • Farm Pickup
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/products"
              className="hover:text-gray-600 transition-colors font-medium" style={{color: '#000000'}}
            >
              Fresh Produce
            </Link>

            {session && (
              <Link
                href="/orders"
                className="hover:text-gray-600 transition-colors font-medium" style={{color: '#000000'}}
              >
                My Pickups
              </Link>
            )}

            <Link
              href="/cart"
              className="relative hover:text-gray-600 transition-colors group" style={{color: '#000000'}}
            >
              <div className="flex items-center space-x-1">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="text-sm font-medium hidden sm:block">Cart</span>
              </div>
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/profile"
                  className="flex items-center space-x-2 hover:text-gray-600 transition-colors" style={{color: '#000000'}}
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:block">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-x-3">
                <Link
                  href="/auth/signin"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors font-semibold"
                >
                  Join Farm
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
