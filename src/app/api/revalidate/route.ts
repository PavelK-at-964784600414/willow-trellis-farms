import { NextRequest, NextResponse } from 'next/server'
import { clearProductCache } from '@/lib/google-sheets'

export async function POST() {
  try {
    // Clear the product cache
    clearProductCache()
    
    return NextResponse.json({ 
      message: 'Product cache cleared successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error clearing product cache:', error)
    return NextResponse.json(
      { error: 'Failed to clear product cache' },
      { status: 500 }
    )
  }
}
