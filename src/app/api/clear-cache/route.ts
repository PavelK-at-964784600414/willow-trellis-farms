import { NextRequest, NextResponse } from 'next/server'
import { clearProductCache } from '@/lib/google-sheets'

// This is a test endpoint for clearing cache - remove in production
export async function POST() {
  try {
    // Clear the Google Sheets cache to force fresh data on next fetch
    clearProductCache()
    
    console.log('🔄 Product cache cleared - next product fetch will get fresh data from Google Sheets')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product cache cleared - next fetch will be fresh from Google Sheets',
      timestamp: new Date().toISOString(),
      note: 'Visit /products page or call /api/products to trigger fresh sync'
    })

  } catch (error) {
    console.error('Error clearing product cache:', error)
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}
