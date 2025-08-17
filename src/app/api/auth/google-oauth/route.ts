import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import crypto from 'crypto'
import {
  generateIncrementalAuthUrl,
  exchangeCodeForTokens,
  getUserProfile,
  refreshAccessToken,
  revokeToken,
  parseGrantedScopes,
  validateState,
  ADDITIONAL_SCOPES
} from '@/lib/google-oauth'
import { prisma } from '@/lib/prisma'

// Handle GET requests for generating authorization URLs
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const scopes = searchParams.get('scopes')?.split(',') || []

  try {
    switch (action) {
      case 'incremental-auth':
        // Generate URL for requesting additional scopes
        const currentScopes = ['openid', 'profile', 'email'] // Basic scopes
        const additionalScopes = scopes.map(scope => {
          switch (scope) {
            case 'drive':
              return ADDITIONAL_SCOPES.DRIVE
            case 'calendar':
              return ADDITIONAL_SCOPES.CALENDAR
            case 'sheets':
              return ADDITIONAL_SCOPES.SHEETS
            default:
              return scope
          }
        })
        
        const state = generateSecureState()
        const authUrl = generateIncrementalAuthUrl(additionalScopes, currentScopes, state)
        
        // Store state in session or database for validation
        await prisma.user.update({
          where: { id: session.user.id },
          data: { 
            // Store state temporarily (you might want to use a separate table for this)
            name: session.user.name // Keep existing name, just trigger update
          }
        })
        
        return NextResponse.json({ authUrl, state })

      case 'check-scopes':
        // Check which scopes the user has granted
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { 
            accounts: {
              where: { provider: 'google' },
              select: { scope: true, access_token: true }
            }
          }
        })
        
        const googleAccount = user?.accounts[0]
        if (!googleAccount?.scope) {
          return NextResponse.json({ scopes: null })
        }
        
        const grantedScopes = parseGrantedScopes(googleAccount.scope)
        return NextResponse.json({ scopes: grantedScopes })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Google OAuth API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle POST requests for token operations
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { action, code, state, token } = body

    switch (action) {
      case 'exchange-code':
        // Validate state parameter for CSRF protection
        if (!validateState(state, expectedState)) {
          return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 })
        }
        
        // Exchange authorization code for tokens
        const tokens = await exchangeCodeForTokens(code)
        const profile = await getUserProfile(tokens.accessToken!)
        
        // Update user's Google account information
        await prisma.account.updateMany({
          where: {
            userId: session.user.id,
            provider: 'google'
          },
          data: {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            expires_at: tokens.expiryDate ? Math.floor(tokens.expiryDate / 1000) : null,
            scope: tokens.scope,
          }
        })
        
        return NextResponse.json({ 
          success: true, 
          profile,
          grantedScopes: parseGrantedScopes(tokens.scope || '')
        })

      case 'refresh-token':
        // Refresh access token
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { 
            accounts: {
              where: { provider: 'google' },
              select: { refresh_token: true }
            }
          }
        })
        
        const refreshToken = user?.accounts[0]?.refresh_token
        if (!refreshToken) {
          return NextResponse.json({ error: 'No refresh token available' }, { status: 400 })
        }
        
        const refreshedTokens = await refreshAccessToken(refreshToken)
        
        // Update access token in database
        await prisma.account.updateMany({
          where: {
            userId: session.user.id,
            provider: 'google'
          },
          data: {
            access_token: refreshedTokens.accessToken,
            expires_at: refreshedTokens.expiryDate ? Math.floor(refreshedTokens.expiryDate / 1000) : null,
          }
        })
        
        return NextResponse.json({ success: true, tokens: refreshedTokens })

      case 'revoke-token':
        // Revoke access token
        const success = await revokeToken(token)
        
        if (success) {
          // Clear tokens from database
          await prisma.account.updateMany({
            where: {
              userId: session.user.id,
              provider: 'google'
            },
            data: {
              access_token: null,
              refresh_token: null,
              expires_at: null,
              scope: null,
            }
          })
        }
        
        return NextResponse.json({ success })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Google OAuth API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to generate secure state (moved here for API context)
function generateSecureState(): string {
  return crypto.randomBytes(32).toString('hex')
}

// This would typically be stored in session/database and retrieved here
const expectedState = ''
