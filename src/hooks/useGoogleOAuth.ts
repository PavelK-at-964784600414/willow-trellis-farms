import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface GoogleOAuthScopes {
  profile: boolean
  email: boolean
  openid: boolean
  drive: boolean
  calendar: boolean
  sheets: boolean
  all: string[]
}

interface UseGoogleOAuthReturn {
  // State
  loading: boolean
  error: string | null
  grantedScopes: GoogleOAuthScopes | null
  
  // Actions
  requestAdditionalScopes: (scopes: string[]) => Promise<void>
  checkGrantedScopes: () => Promise<void>
  refreshToken: () => Promise<void>
  revokeAccess: () => Promise<void>
  
  // Utilities
  hasScope: (scope: keyof GoogleOAuthScopes) => boolean
  canAccessDrive: () => boolean
  canAccessCalendar: () => boolean
  canAccessSheets: () => boolean
}

/**
 * Custom hook for Google OAuth 2.0 operations following official documentation
 * Provides incremental authorization, scope checking, and token management
 */
export function useGoogleOAuth(): UseGoogleOAuthReturn {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [grantedScopes, setGrantedScopes] = useState<GoogleOAuthScopes | null>(null)

  /**
   * Request additional scopes using incremental authorization
   * Following Google's incremental authorization best practices
   */
  const requestAdditionalScopes = useCallback(async (scopes: string[]) => {
    if (!session?.user) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Step 1: Generate authorization URL for additional scopes
      const response = await fetch('/api/auth/google-oauth?action=incremental-auth&scopes=' + scopes.join(','))
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate authorization URL')
      }

      // Step 2: Redirect user to Google for consent
      window.location.href = data.authUrl

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [session])

  /**
   * Check which scopes have been granted by the user
   * Following Google's documentation for scope verification
   */
  const checkGrantedScopes = useCallback(async () => {
    if (!session?.user) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/google-oauth?action=check-scopes')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check scopes')
      }

      setGrantedScopes(data.scopes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [session])

  /**
   * Refresh the access token using the refresh token
   * Following Google's token refresh documentation
   */
  const refreshToken = useCallback(async () => {
    if (!session?.user) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/google-oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'refresh-token' })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh token')
      }

      // Optionally refresh granted scopes after token refresh
      await checkGrantedScopes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [session, checkGrantedScopes])

  /**
   * Revoke Google OAuth access
   * Following Google's token revocation documentation
   */
  const revokeAccess = useCallback(async () => {
    if (!session?.user) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/google-oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'revoke-token' })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to revoke access')
      }

      // Clear granted scopes after revocation
      setGrantedScopes(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [session])

  /**
   * Check if a specific scope has been granted
   */
  const hasScope = useCallback((scope: keyof GoogleOAuthScopes): boolean => {
    if (!grantedScopes || scope === 'all') return false
    return grantedScopes[scope] === true
  }, [grantedScopes])

  /**
   * Check if the user has granted Drive access
   * Useful for features like uploading farm photos
   */
  const canAccessDrive = useCallback((): boolean => {
    return hasScope('drive')
  }, [hasScope])

  /**
   * Check if the user has granted Calendar access
   * Useful for pickup scheduling features
   */
  const canAccessCalendar = useCallback((): boolean => {
    return hasScope('calendar')
  }, [hasScope])

  /**
   * Check if the user has granted Sheets access
   * Useful for product data management
   */
  const canAccessSheets = useCallback((): boolean => {
    return hasScope('sheets')
  }, [hasScope])

  return {
    // State
    loading,
    error,
    grantedScopes,
    
    // Actions
    requestAdditionalScopes,
    checkGrantedScopes,
    refreshToken,
    revokeAccess,
    
    // Utilities
    hasScope,
    canAccessDrive,
    canAccessCalendar,
    canAccessSheets,
  }
}

/**
 * Google OAuth scope constants for easy reference
 * Following Google's scope documentation
 */
export const GOOGLE_SCOPES = {
  PROFILE: 'profile',
  EMAIL: 'email',
  DRIVE: 'drive',
  CALENDAR: 'calendar',
  SHEETS: 'sheets',
} as const

/**
 * Helper function to get user-friendly scope descriptions
 */
export function getScopeDescription(scope: string): string {
  const descriptions: Record<string, string> = {
    profile: 'Access your basic profile information',
    email: 'View your email address',
    drive: 'Upload and manage farm photos in Google Drive',
    calendar: 'View your calendar for pickup scheduling',
    sheets: 'Access product data from Google Sheets',
  }
  
  return descriptions[scope] || scope
}
