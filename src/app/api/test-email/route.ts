import { NextRequest, NextResponse } from 'next/server'
import { sendAdminNotificationEmail } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    // Test data for email notification
    const testOrderData = {
      customerName: "Test Customer",
      customerEmail: "test@example.com",
      customerPhone: "+1-555-123-4567",
      orderId: "TEST-" + Date.now(),
      total: 25.99,
      items: [
        { name: "Fresh Tomatoes", quantity: 2, price: 8.99 },
        { name: "Organic Lettuce", quantity: 1, price: 4.50 },
        { name: "Farm Carrots", quantity: 3, price: 4.17 }
      ]
    }

    await sendAdminNotificationEmail(testOrderData)

    return NextResponse.json({
      success: true,
      message: `Test admin notification sent to ${process.env.ADMIN_EMAIL}`,
      testOrder: testOrderData
    })

  } catch (error) {
    console.error('Error sending test notification:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send test notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
