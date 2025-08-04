import nodemailer from 'nodemailer'

// Dynamic Twilio import to avoid build issues when env vars are missing
const createTwilioClient = () => {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilio = require('twilio')
      return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    } catch (error) {
      console.warn('Twilio not available:', error)
      return null
    }
  }
  return null
}

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

// Twilio configuration with dynamic client creation
const getTwilioClient = () => createTwilioClient()

export interface OrderEmailData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  orderId: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  try {
    const itemsList = data.items
      .map(item => `${item.name} x${item.quantity} - $${item.price.toFixed(2)}`)
      .join('\n')

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: data.customerEmail,
      subject: `🌾 Pickup Order Confirmed - Willow Trellis Farms`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🌾 Willow Trellis Farms</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Farm Fresh • Pickup Order Confirmed</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px;">
            <h2 style="color: #16a34a; margin-bottom: 15px;">Hello ${data.customerName}!</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              🎉 Great news! Your farm pickup order is confirmed and we're already preparing your fresh produce.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #16a34a;">
              <h3 style="color: #16a34a; margin-top: 0;">📦 Your Farm Basket - Order #${data.orderId}</h3>
              <div style="font-family: monospace; background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
                ${data.items.map(item => 
                  `🥬 ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
                ).join('<br>')}
              </div>
              <div style="border-top: 1px solid #e5e7eb; margin-top: 15px; padding-top: 15px;">
                <strong style="font-size: 18px; color: #16a34a;">Total: $${data.total.toFixed(2)}</strong>
              </div>
            </div>

            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #065f46; margin: 0 0 15px 0;">🚜 Farm Pickup Information</h3>
              <div style="color: #065f46;">
                <p style="margin: 5px 0;"><strong>📍 Location:</strong> 1234 Willow Lane, Farmville Valley</p>
                <p style="margin: 5px 0;"><strong>🕒 Hours:</strong> Tuesday-Sunday: 8AM-6PM</p>
                <p style="margin: 5px 0;"><strong>📞 Contact:</strong> (555) 123-FARM</p>
                <p style="margin: 15px 0 5px 0;"><strong>⏰ Pickup Ready:</strong> Within 2-4 hours</p>
              </div>
            </div>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #92400e; margin: 0 0 10px 0;">🌱 What to Expect</h4>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Fresh produce harvested daily from our fields</li>
                <li>Meet our farmers and learn about sustainable growing</li>
                <li>See where your food grows in our beautiful farm setting</li>
                <li>No pickup fees - just fresh, local produce!</li>
              </ul>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              We'll send you another notification when your order is ready for pickup. 
              Thank you for supporting local farming and choosing fresh, sustainable produce! 🌾
            </p>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #16a34a; font-size: 16px; font-weight: bold;">
                Happy Farming! 🚜<br>
                The Willow Trellis Farms Team
              </p>
            </div>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('Order confirmation email sent successfully')
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    throw error
  }
}

export async function sendOrderNotificationSMS(customerPhone: string, orderId: string, total: number) {
  try {
    if (!customerPhone) return

    const message = `🌾 Willow Trellis Farms: Your pickup order #${orderId} for $${total.toFixed(2)} is confirmed! We'll text you when it's ready. Farm pickup: 1234 Willow Lane, Tue-Sun 8AM-6PM. Call (555) 123-FARM`

    // Send SMS
  if (customerPhone) {
    const twilioClient = getTwilioClient()
    if (twilioClient) {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: customerPhone
      })
    } else {
      console.warn('Twilio not configured, SMS not sent')
    }
  }

    console.log('Order notification SMS sent successfully')
  } catch (error) {
    console.error('Error sending SMS notification:', error)
    throw error
  }
}

export async function sendAdminNotificationEmail(orderData: OrderEmailData) {
  try {
    const itemsList = orderData.items
      .map(item => `${item.name} x${item.quantity} - $${item.price.toFixed(2)}`)
      .join('\n')

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // Send to admin email
      subject: `🌾 New Farm Pickup Order - ${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🌾 Willow Trellis Farms</h1>
            <p style="margin: 5px 0 0 0;">New Pickup Order Received</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px;">
            <h2 style="color: #16a34a;">New Farm Pickup Order</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a;">
              <p><strong>Order ID:</strong> ${orderData.orderId}</p>
              <p><strong>Customer:</strong> ${orderData.customerName}</p>
              <p><strong>Email:</strong> ${orderData.customerEmail}</p>
              <p><strong>Phone:</strong> ${orderData.customerPhone || 'Not provided'}</p>
              <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
              
              <h3>Items:</h3>
              <ul>
                ${orderData.items.map(item => `
                  <li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
                `).join('')}
              </ul>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #065f46; margin: 0;">
                <strong>🚜 Action Required:</strong> Please prepare this order for farm pickup and update the status in the admin panel.
              </p>
            </div>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('Admin notification email sent successfully')
  } catch (error) {
    console.error('Error sending admin notification email:', error)
    throw error
  }
}

export async function sendWelcomeNotification({ to, userName }: { to: string; userName?: string }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: '🌾 Welcome to Willow Trellis Farms!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🌾 Welcome to Willow Trellis Farms!</h1>
          </div>
          <div style="background-color: #f9fafb; padding: 30px;">
            <h2 style="color: #16a34a; margin-bottom: 20px;">Hello ${userName || 'Valued Customer'}! 🌱</h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a;">
              <p style="margin: 0 0 15px 0; color: #374151;">We're thrilled to have you join our farm community! Here's what you can expect:</p>
              <ul style="color: #374151; line-height: 1.6;">
                <li>🥬 Fresh, locally-grown produce picked just for you</li>
                <li>🚜 Easy farm pickup - no delivery fees!</li>
                <li>🌱 Meet the farmers who grow your food</li>
                <li>📍 Visit our farm stand and see where your food grows</li>
              </ul>
            </div>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.NEXTAUTH_URL}/products" 
                 style="background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                🛒 Start Shopping
              </a>
            </div>
            <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 8px;">
              <h3 style="color: #065f46; margin: 0 0 10px 0;">🚜 Farm Pickup Information</h3>
              <p style="margin: 5px 0; color: #065f46;">📍 1234 Willow Lane, Farmville Valley</p>
              <p style="margin: 5px 0; color: #065f46;">🕒 Tuesday-Sunday: 8AM-6PM</p>
              <p style="margin: 5px 0; color: #065f46;">📞 (555) 123-FARM</p>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px; text-align: center;">
              Your first order is just a click away. Browse our seasonal selection and taste the difference that fresh, local farming makes! 🌱
            </p>
          </div>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              Happy farming,<br>
              <strong>The Willow Trellis Team</strong>
            </p>
          </div>
        </div>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Welcome notification error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
