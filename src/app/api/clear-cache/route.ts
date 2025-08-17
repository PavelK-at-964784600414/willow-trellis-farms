import { NextResponse } from 'next/server'
import { clearProductCache, clearSeedsCache } from '@/lib/google-sheets'

// This is a test endpoint for clearing cache - remove in production
export async function POST() {
  try {
    // Clear the Google Sheets cache to force fresh data on next fetch
    clearProductCache()
    clearSeedsCache()
    
    console.log('🔄 Product and seeds cache cleared - next fetch will get fresh data from Google Sheets')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product and seeds cache cleared - next fetch will be fresh from Google Sheets',
      timestamp: new Date().toISOString(),
      note: 'Visit /products page or call /api/products to trigger fresh sync'
    })

  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}

// Also support GET requests for easier testing
export async function GET() {
  return POST()
}
