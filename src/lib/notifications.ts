import nodemailer from 'nodemailer'

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
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: data.customerEmail,
      subject: `🌾 Pickup Order Confirmed #${data.orderId} - Willow Trellis Farms`,
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
                <p style="margin: 5px 0;"><strong>📍 Location:</strong> 3013 Upper Otterson, Ottawa, ON</p>
                <p style="margin: 5px 0;"><strong>🕒 Hours:</strong> Tuesday-Sunday: 8AM-6PM</p>
                <p style="margin: 5px 0;"><strong>📞 Contact:</strong> (613) 581-9303</p>
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

            <!-- Changes & Cancellations Policy -->
            <div style="background-color: #fef2f2; border: 2px solid #fca5a5; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #dc2626; margin: 0 0 15px 0;">📝 Order Changes & Cancellations</h3>
              <div style="color: #dc2626; font-size: 14px; line-height: 1.6;">
                <p style="margin: 8px 0;"><strong>📞 Need to make changes?</strong></p>
                <ul style="margin: 8px 0; padding-left: 20px;">
                  <li><strong>Call us:</strong> (613) 581-9303</li>
                  <li><strong>Email:</strong> <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #dc2626;">${process.env.ADMIN_EMAIL}</a></li>
                  <li><strong>Reply</strong> to this email directly</li>
                </ul>
                <p style="margin: 12px 0 8px 0;"><strong>⏰ Change/Cancellation Policy:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Changes: Up to 2 hours before pickup</li>
                  <li>Cancellations: Up to 4 hours before pickup</li>
                  <li>Same-day changes may not always be possible</li>
                  <li>Full refunds available for timely cancellations</li>
                </ul>
                <p style="margin: 12px 0 0 0; font-weight: bold;">
                  💡 <em>We're flexible! Contact us and we'll do our best to accommodate your needs.</em>
                </p>
              </div>
            </div>

            <!-- Business Contact Information -->
            <div style="background-color: #e0f2fe; border: 2px solid #0284c7; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #0369a1; margin: 0 0 15px 0;">📞 Contact Willow Trellis Farms</h3>
              <div style="color: #0369a1; font-size: 14px;">
                <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #0369a1;">${process.env.ADMIN_EMAIL}</a></p>
                <p style="margin: 5px 0;"><strong>📱 Phone:</strong> (613) 581-9303</p>
                <p style="margin: 5px 0;"><strong>🌐 Website:</strong> <a href="${process.env.NEXTAUTH_URL}" style="color: #0369a1;">willow-trellis-farms.vercel.app</a></p>
                <p style="margin: 5px 0;"><strong>📍 Address:</strong> 3013 Upper Otterson, Ottawa, ON</p>
                <p style="margin: 15px 0 5px 0;"><strong>🕒 Business Hours:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Tuesday - Sunday: 8:00 AM - 6:00 PM</li>
                  <li>Monday: Closed (Field work day)</li>
                  <li>Phone support: 7:00 AM - 7:00 PM daily</li>
                </ul>
              </div>
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
          
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p style="margin: 0;">
              Order Reference: #${data.orderId} | Confirmation sent to: ${data.customerEmail}<br>
              Save this email for your records and bring it for easy pickup identification.
            </p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    // Email sent successfully (logging removed for production)
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    throw error
  }
}

export async function sendAdminNotificationEmail(orderData: OrderEmailData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: `🚨 NEW FARM ORDER #${orderData.orderId} - $${orderData.total.toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🚨 NEW FARM PICKUP ORDER</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Immediate Action Required</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px;">
            <div style="background-color: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #dc2626; margin: 0 0 10px 0; font-size: 20px;">⚡ URGENT: New Order Received</h2>
              <p style="color: #dc2626; margin: 0; font-weight: bold;">Order #${orderData.orderId} - Total: $${orderData.total.toFixed(2)}</p>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #16a34a; margin-bottom: 20px;">
              <h3 style="color: #16a34a; margin: 0 0 15px 0;">📋 Order Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Order ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${orderData.orderId}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Customer:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${orderData.customerName}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${orderData.customerPhone ? `<a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a>` : 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Order Time:</strong></td><td style="padding: 8px 0;">${new Date().toLocaleString()}</td></tr>
              </table>
            </div>

            <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
              <h3 style="color: #f59e0b; margin: 0 0 15px 0;">🛒 Items to Prepare</h3>
              <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px;">
                ${orderData.items.map(item => `
                  <div style="padding: 8px 0; border-bottom: 1px dashed #d97706; display: flex; justify-content: space-between;">
                    <span><strong>${item.name}</strong> x${item.quantity}</span>
                    <span style="color: #065f46; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                `).join('')}
                <div style="padding: 15px 0 5px 0; border-top: 2px solid #d97706; margin-top: 10px;">
                  <div style="display: flex; justify-content: space-between; font-size: 18px;">
                    <strong>TOTAL:</strong>
                    <strong style="color: #16a34a;">$${orderData.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div style="background-color: #ecfdf5; border: 2px solid #16a34a; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #065f46; margin: 0 0 15px 0;">✅ Next Steps</h3>
              <ol style="color: #065f46; text-align: left; margin: 0; padding-left: 20px;">
                <li style="margin: 8px 0;">Gather and prepare all items listed above</li>
                <li style="margin: 8px 0;">Package items for farm pickup</li>
                <li style="margin: 8px 0;">Notify customer when ready for pickup</li>
              </ol>
                </a>
              </div>
            </div>
          </div>
          
          <div style="background-color: #1f2937; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">
              🌾 Willow Trellis Farms - Admin Notification System<br>
              Keep farming fresh! 🚜
            </p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    // Admin notification sent successfully (logging removed for production)
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
              <p style="margin: 5px 0; color: #065f46;">📍 3013 Upper Otterson, Ottawa, ON</p>
              <p style="margin: 5px 0; color: #065f46;">🕒 Tuesday-Sunday: 8AM-6PM</p>
              <p style="margin: 5px 0; color: #065f46;">📞 (613) 581-9303</p>
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
