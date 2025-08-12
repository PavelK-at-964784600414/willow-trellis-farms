// Email debugging utility for Vercel
// Add this to src/app/api/test-email-debug/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST ? '✅ Set' : '❌ Missing',
      EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT ? '✅ Set' : '❌ Missing',
      EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER ? '✅ Set' : '❌ Missing',
      EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD ? '✅ Set' : '❌ Missing',
      EMAIL_FROM: process.env.EMAIL_FROM ? '✅ Set' : '❌ Missing',
      ADMIN_EMAIL: process.env.ADMIN_EMAIL ? '✅ Set' : '❌ Missing',
    }

    // Test email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Verify connection
    await transporter.verify()

    // Send test email
    const testEmail = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: '🧪 Vercel Email Test - Willow Trellis Farms',
      html: `
        <h2>✅ Email Configuration Working!</h2>
        <p>This test email was sent successfully from Vercel production.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> Production (Vercel)</p>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Email test completed successfully',
      environmentVariables: envCheck,
      emailSent: true,
      messageId: testEmail.messageId
    })

  } catch (error) {
    console.error('Email test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environmentVariables: {
        EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST ? '✅ Set' : '❌ Missing',
        EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT ? '✅ Set' : '❌ Missing', 
        EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER ? '✅ Set' : '❌ Missing',
        EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD ? '✅ Set' : '❌ Missing',
        EMAIL_FROM: process.env.EMAIL_FROM ? '✅ Set' : '❌ Missing',
        ADMIN_EMAIL: process.env.ADMIN_EMAIL ? '✅ Set' : '❌ Missing',
      }
    }, { status: 500 })
  }
}
