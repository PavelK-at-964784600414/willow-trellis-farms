import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

// Dynamic Twilio import to avoid build issues when env vars are missing
const createTwilioClient = async () => {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilio = await import('twilio')
      return twilio.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    } catch (error) {
      console.warn('Twilio not available:', error)
      return null
    }
  }
  return null
}

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

// Create Twilio client with dynamic loading
const getTwilioClient = () => createTwilioClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      recipients, 
      subject, 
      message, 
      sendEmail, 
      sendSMS, 
      recipientType 
    } = body

    // Validate required fields
    if (!message || (!sendEmail && !sendSMS)) {
      return NextResponse.json(
        { error: 'Message and at least one notification method are required' },
        { status: 400 }
      )
    }

    if (sendEmail && !subject) {
      return NextResponse.json(
        { error: 'Subject is required for email notifications' },
        { status: 400 }
      )
    }

    let targetUsers = []

    // Get recipients based on type
    if (recipientType === 'all') {
      targetUsers = await prisma.user.findMany({
        select: { id: true, name: true, email: true, phone: true }
      })
    } else if (recipientType === 'customers') {
      // Get users who have placed orders
      targetUsers = await prisma.user.findMany({
        where: {
          orders: {
            some: {}
          }
        },
        select: { id: true, name: true, email: true, phone: true }
      })
    } else if (recipientType === 'selected' && recipients && recipients.length > 0) {
      targetUsers = await prisma.user.findMany({
        where: {
          id: { in: recipients }
        },
        select: { id: true, name: true, email: true, phone: true }
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid recipient selection' },
        { status: 400 }
      )
    }

    if (targetUsers.length === 0) {
      return NextResponse.json(
        { error: 'No recipients found' },
        { status: 400 }
      )
    }

    const results = {
      emailsSent: 0,
      smssSent: 0,
      errors: [] as string[]
    }

    // Send notifications to each user
    for (const user of targetUsers) {
      try {
        // Send Email
        if (sendEmail && user.email) {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px;">🌾 Willow Trellis Farms</h1>
                </div>
                <div style="background-color: #f9fafb; padding: 30px;">
                  <h2 style="color: #16a34a; margin-bottom: 20px;">Hello ${user.name || 'Valued Customer'}!</h2>
                  <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                  <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 8px;">
                    <h3 style="color: #065f46; margin: 0 0 10px 0;">Farm Pickup Information</h3>
                    <p style="margin: 5px 0; color: #065f46;">📍 3013 Upper Otterson, Ottawa, ON</p>
                    <p style="margin: 5px 0; color: #065f46;">🕒 Tuesday-Sunday: 8AM-6PM</p>
                    <p style="margin: 5px 0; color: #065f46;">📞 (613) 581-9303</p>
                  </div>
                  <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                    Thank you for supporting local farming! 🚜
                  </p>
                </div>
              </div>
            `
          })
          results.emailsSent++
        }

        // Send SMS
        if (sendSMS && user.phone) {
          const twilioClient = await getTwilioClient()
          if (twilioClient) {
            const smsMessage = `🌾 Willow Trellis Farms: ${message}\n\nFarm Pickup: 3013 Upper Otterson, Ottawa, ON\nHours: Tue-Sun 8AM-6PM\nCall: (613) 581-9303`

            await twilioClient.messages.create({
              body: smsMessage,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: user.phone
            })
            results.smssSent++
          } else {
            results.errors.push(`Twilio not configured, SMS not sent to ${user.name || user.email}`)
          }
        }
      } catch (error: unknown) {
        results.errors.push(`Failed to notify ${user.name || user.email}: ${error.message}`)
      }
    }

    // Log the notification in database (optional)
    try {
      await prisma.notification.create({
        data: {
          subject: subject || 'SMS Notification',
          message,
          recipientType,
          recipientCount: targetUsers.length,
          emailsSent: results.emailsSent,
          smssSent: results.smssSent,
          sentBy: session.user.id,
          sentAt: new Date()
        }
      })
    } catch (dbError) {
      // Log database error but don't fail the notification
      console.error('Failed to log notification:', dbError)
    }

    return NextResponse.json({
      message: 'Notifications sent successfully',
      results
    })

  } catch (error: unknown) {
    console.error('Notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all users for recipient selection
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            orders: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get notification history
    const notifications = await prisma.notification.findMany({
      include: {
        sentByUser: {
          select: { name: true, email: true }
        }
      },
      orderBy: {
        sentAt: 'desc'
      },
      take: 20
    })

    return NextResponse.json({
      users,
      notifications
    })

  } catch (error: unknown) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
