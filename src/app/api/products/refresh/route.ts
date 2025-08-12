import { NextRequest, NextResponse } from 'next/server'
import { clearProductCache } from '@/lib/google-sheets'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST() {
  try {
    // Check if user is authenticated and has admin access
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Clear the Google Sheets cache to force fresh data on next fetch
    clearProductCache()
    
    // Also trigger a fresh fetch by calling the products API
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'GET',
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to refresh products')
    }
    
    const products = await response.json()

    return NextResponse.json({ 
      success: true, 
      message: 'Product cache cleared and data refreshed from Google Sheets',
      productCount: products.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error clearing product cache:', error)
    return NextResponse.json(
      { error: 'Failed to clear cache and refresh products' },
      { status: 500 }
    )
  }
}
