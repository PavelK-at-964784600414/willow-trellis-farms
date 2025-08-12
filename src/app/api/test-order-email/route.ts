// Debug endpoint to test order email notifications
// Add this to src/app/api/test-order-email/route.ts

import { NextResponse } from 'next/server'
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/notifications'

export async function GET() {
  try {
    // Test order data
    const testOrderData = {
      customerName: 'Test Customer',
      customerEmail: 'pavelklu88@gmail.com', // Send to admin email for testing
      customerPhone: '(613) 581-9303',
      orderId: 'TEST-' + Date.now(),
      total: 25.50,
      items: [
        { name: 'Fresh Tomatoes', quantity: 2, price: 8.99 },
        { name: 'Organic Carrots', quantity: 1, price: 7.52 }
      ]
    }

    console.log('🧪 Testing order emails with data:', testOrderData)

    // Test customer confirmation email
    const customerEmailResult = await sendOrderConfirmationEmail(testOrderData)
    console.log('✅ Customer email sent successfully')

    // Test admin notification email  
    const adminEmailResult = await sendAdminNotificationEmail(testOrderData)
    console.log('✅ Admin email sent successfully')

    return NextResponse.json({
      success: true,
      message: 'Order email test completed successfully',
      testData: testOrderData,
      results: {
        customerEmail: 'Sent successfully',
        adminEmail: 'Sent successfully'
      }
    })

  } catch (error) {
    console.error('❌ Order email test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
