import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmationEmail } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerEmail, customerName, orderId, items, total } = body

    // Validate required fields
    if (!customerEmail || !customerName || !orderId || !items || !total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send test customer confirmation email
    await sendOrderConfirmationEmail({
      customerEmail,
      customerName,
      orderId,
      items,
      total
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Customer confirmation email sent successfully with business policies',
      recipient: customerEmail,
      orderId
    })

  } catch (error) {
    console.error('Test customer email error:', error)
    return NextResponse.json(
      { error: 'Failed to send test customer email' },
      { status: 500 }
    )
  }
}
