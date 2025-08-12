import { google } from 'googleapis'

// Google OAuth2 configuration according to official documentation
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // NextAuth.js uses this specific callback URL format
  process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google` : 'http://localhost:3000/api/auth/callback/google'
)

// Scopes that your application is requesting permission to access
// Following Google's recommendation for incremental authorization
const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'openid', // For OpenID Connect
]

// Additional scopes for farm-specific features (can be requested incrementally)
const ADDITIONAL_SCOPES = {
  DRIVE: 'https://www.googleapis.com/auth/drive.file', // For uploading farm photos
  CALENDAR: 'https://www.googleapis.com/auth/calendar.readonly', // For pickup scheduling
  SHEETS: 'https://www.googleapis.com/auth/spreadsheets.readonly', // For product data
}

/**
 * Generate an authorization URL for Google OAuth 2.0
 * Following official documentation: Step 1 & 2
 */
export function generateAuthUrl(state?: string) {
  // Set authorization parameters according to Google's documentation
  const authUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    
    // Scopes that identify the resources that your application could access
    scope: SCOPES,
    
    // Enable incremental authorization - recommended best practice
    include_granted_scopes: true,
    
    // State parameter for CSRF protection
    state: state || generateSecureState(),
    
    // Prompt for consent to ensure we get refresh token
    prompt: 'consent',
    
    // Response type for web server applications
    response_type: 'code',
  })

  return authUrl
}

/**
 * Exchange authorization code for access token
 * Following official documentation: Step 5
 */
export async function exchangeCodeForTokens(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    
    // Set credentials for the client
    oauth2Client.setCredentials(tokens)
    
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: tokens.expiry_date,
      scope: tokens.scope,
      tokenType: tokens.token_type,
      idToken: tokens.id_token,
    }
  } catch (error) {
    console.error('Error exchanging code for tokens:', error)
    throw new Error('Failed to exchange authorization code for tokens')
  }
}

/**
 * Get user profile information using access token
 * Following official documentation: Call Google APIs
 */
export async function getUserProfile(accessToken: string) {
  try {
    // Create a new client instance with the access token
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
    
    // Set the access token
    oauth2Client.setCredentials({ access_token: accessToken })
    
    // Get user profile information
    const { data } = await oauth2.userinfo.get()
    
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
      verified_email: data.verified_email,
      locale: data.locale,
    }
  } catch (error) {
    console.error('Error getting user profile:', error)
    throw new Error('Failed to get user profile')
  }
}

/**
 * Refresh access token using refresh token
 * Following official documentation: Refreshing an access token
 */
export async function refreshAccessToken(refreshToken: string) {
  try {
    oauth2Client.setCredentials({ refresh_token: refreshToken })
    
    const { credentials } = await oauth2Client.refreshAccessToken()
    
    return {
      accessToken: credentials.access_token,
      expiryDate: credentials.expiry_date,
      scope: credentials.scope,
      tokenType: credentials.token_type,
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw new Error('Failed to refresh access token')
  }
}

/**
 * Revoke access token
 * Following official documentation: Token revocation
 */
export async function revokeToken(token: string) {
  try {
    await oauth2Client.revokeToken(token)
    return true
  } catch (error) {
    console.error('Error revoking token:', error)
    throw new Error('Failed to revoke token')
  }
}

/**
 * Request additional scopes using incremental authorization
 * Following official documentation: Incremental authorization
 */
export function generateIncrementalAuthUrl(additionalScopes: string[], currentScopes: string[], state?: string) {
  // Combine current scopes with additional ones
  const allScopes = [...new Set([...currentScopes, ...additionalScopes])]
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: allScopes,
    include_granted_scopes: true, // Key for incremental authorization
    state: state || generateSecureState(),
    prompt: 'consent',
    response_type: 'code',
  })

  return authUrl
}

/**
 * Check which scopes were granted by the user
 * Following official documentation: Step 6
 */
export function parseGrantedScopes(scopeString: string) {
  if (!scopeString) return []
  
  const scopes = scopeString.split(' ')
  
  return {
    profile: scopes.includes('https://www.googleapis.com/auth/userinfo.profile'),
    email: scopes.includes('https://www.googleapis.com/auth/userinfo.email'),
    openid: scopes.includes('openid'),
    drive: scopes.includes(ADDITIONAL_SCOPES.DRIVE),
    calendar: scopes.includes(ADDITIONAL_SCOPES.CALENDAR),
    sheets: scopes.includes(ADDITIONAL_SCOPES.SHEETS),
    all: scopes,
  }
}

/**
 * Generate secure state parameter for CSRF protection
 * Following official documentation security recommendations
 */
function generateSecureState(): string {
  // Generate cryptographically secure random string
  const array = new Uint8Array(32)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array)
  } else {
    // Node.js environment
    const crypto = require('crypto')
    return crypto.randomBytes(32).toString('hex')
  }
  
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate state parameter to prevent CSRF attacks
 * Following official documentation security recommendations
 */
export function validateState(receivedState: string, expectedState: string): boolean {
  return receivedState === expectedState
}

// Export additional scopes for use in other parts of the application
export { ADDITIONAL_SCOPES, SCOPES }

// Export configured client for advanced use cases
export { oauth2Client }
