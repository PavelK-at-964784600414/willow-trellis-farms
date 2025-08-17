'use client'

import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useGoogleOAuth, GOOGLE_SCOPES, getScopeDescription } from '@/hooks/useGoogleOAuth'

interface GoogleOAuthPanelProps {
  className?: string
}

/**
 * Google OAuth Panel Component
 * Demonstrates official Google OAuth 2.0 implementation with farm-themed UI
 * Following Google's UX guidelines and best practices
 */
export function GoogleOAuthPanel({ className = '' }: GoogleOAuthPanelProps) {
  const { data: session, status } = useSession()
  const {
    loading,
    error,
    grantedScopes,
    requestAdditionalScopes,
    checkGrantedScopes,
    refreshToken,
    revokeAccess,
    hasScope: _hasScope,
    canAccessDrive,
    canAccessCalendar,
    canAccessSheets,
  } = useGoogleOAuth()

  // Load granted scopes when component mounts and user is authenticated
  useEffect(() => {
    if (session?.user) {
      checkGrantedScopes()
    }
  }, [session, checkGrantedScopes])

  if (status === 'loading') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-green-800">Loading authentication...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">
            🌾 Connect with Google
          </h3>
          <p className="text-amber-800 mb-6">
            Sign in with Google to access farm features and sync your data
          </p>
          <button
            onClick={() => signIn('google')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  const handleRequestScopes = async (scopes: string[]) => {
    try {
      await requestAdditionalScopes(scopes)
    } catch (err) {
      console.error('Failed to request additional scopes:', err)
    }
  }

  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
      {/* User Info Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-green-300"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-green-900">
              Welcome, {session.user?.name || 'Farmer'}! 🚜
            </h3>
            <p className="text-green-700">
              {session.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">❌ {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-800">Processing...</span>
          </div>
        </div>
      )}

      {/* Granted Scopes Display */}
      {grantedScopes && (
        <div className="mb-6">
          <h4 className="text-md font-semibold text-green-900 mb-3">
            🔑 Your Google Permissions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(grantedScopes).map(([scope, granted]) => {
              if (scope === 'all') return null
              return (
                <div
                  key={scope}
                  className={`p-3 rounded-lg border ${
                    granted
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{scope}</span>
                    <span className="text-sm">
                      {granted ? '✅ Granted' : '❌ Not granted'}
                    </span>
                  </div>
                  <p className="text-xs mt-1">
                    {getScopeDescription(scope)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Farm Features Section */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-green-900 mb-3">
          🌱 Farm Features
        </h4>
        <div className="space-y-3">
          {/* Drive Access for Farm Photos */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
            <div>
              <h5 className="font-medium text-green-900">📸 Farm Photo Gallery</h5>
              <p className="text-sm text-green-700">Upload and share farm photos</p>
            </div>
            {canAccessDrive() ? (
              <span className="text-green-600 font-medium">✅ Available</span>
            ) : (
              <button
                onClick={() => handleRequestScopes([GOOGLE_SCOPES.DRIVE])}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded transition-colors"
                disabled={loading}
              >
                Enable
              </button>
            )}
          </div>

          {/* Calendar Access for Pickup Scheduling */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
            <div>
              <h5 className="font-medium text-green-900">📅 Pickup Calendar</h5>
              <p className="text-sm text-green-700">Sync pickup times with your calendar</p>
            </div>
            {canAccessCalendar() ? (
              <span className="text-green-600 font-medium">✅ Available</span>
            ) : (
              <button
                onClick={() => handleRequestScopes([GOOGLE_SCOPES.CALENDAR])}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded transition-colors"
                disabled={loading}
              >
                Enable
              </button>
            )}
          </div>

          {/* Sheets Access for Product Data */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
            <div>
              <h5 className="font-medium text-green-900">📊 Product Data</h5>
              <p className="text-sm text-green-700">Access fresh produce inventory</p>
            </div>
            {canAccessSheets() ? (
              <span className="text-green-600 font-medium">✅ Available</span>
            ) : (
              <button
                onClick={() => handleRequestScopes([GOOGLE_SCOPES.SHEETS])}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded transition-colors"
                disabled={loading}
              >
                Enable
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={checkGrantedScopes}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          🔄 Refresh Permissions
        </button>
        
        <button
          onClick={refreshToken}
          className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          🔑 Refresh Token
        </button>
        
        <button
          onClick={revokeAccess}
          className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          🚫 Revoke Access
        </button>
        
        <button
          onClick={() => signOut()}
          className="bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors"
        >
          👋 Sign Out
        </button>
      </div>

      {/* Developer Info */}
      <div className="mt-6 pt-4 border-t border-green-200">
        <details className="text-sm text-green-700">
          <summary className="cursor-pointer font-medium mb-2">
            🔧 Developer Information
          </summary>
          <div className="bg-white p-3 rounded border border-green-200 font-mono text-xs">
            <p><strong>Implementation:</strong> Official Google OAuth 2.0 Web Server Flow</p>
            <p><strong>Features:</strong> Incremental authorization, token refresh, scope verification</p>
            <p><strong>Security:</strong> PKCE, state validation, secure token storage</p>
            <p><strong>Documentation:</strong> <a 
              href="https://developers.google.com/identity/protocols/oauth2/web-server" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google OAuth 2.0 Docs
            </a></p>
          </div>
        </details>
      </div>
    </div>
  )
}

export default GoogleOAuthPanel
