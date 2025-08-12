import { Metadata } from 'next'
import GoogleOAuthPanel from '@/components/GoogleOAuthPanel'

export const metadata: Metadata = {
  title: 'Google OAuth Demo - Willow Trellis Farms',
  description: 'Demonstration of Google OAuth 2.0 implementation following official documentation',
}

/**
 * Google OAuth Demo Page
 * Demonstrates the official Google OAuth 2.0 implementation
 * Following Google's web server flow documentation
 */
export default function GoogleOAuthDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-4">
            🌾 Google OAuth 2.0 Demo
          </h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Experience our official Google OAuth 2.0 implementation following Google's 
            web server flow documentation. This demo showcases incremental authorization, 
            token management, and farm-specific features.
          </p>
        </div>

        {/* Implementation Details */}
        <div className="mb-8 bg-white rounded-lg border border-green-200 p-6">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">
            📋 Implementation Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🔐 Security</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• PKCE (Proof Key for Code Exchange)</li>
                <li>• State parameter validation</li>
                <li>• Secure token storage</li>
                <li>• HTTPS-only cookies</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🔄 Token Management</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Automatic token refresh</li>
                <li>• Offline access support</li>
                <li>• Token revocation</li>
                <li>• Expiry handling</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">📈 Advanced Features</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Incremental authorization</li>
                <li>• Scope verification</li>
                <li>• Dynamic consent</li>
                <li>• Error handling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Farm Use Cases */}
        <div className="mb-8 bg-white rounded-lg border border-green-200 p-6">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">
            🚜 Farm Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-800 mb-3">Customer Features</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📸</span>
                  <span>Upload photos of your harvest to Google Drive</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📅</span>
                  <span>Sync pickup appointments with Google Calendar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📊</span>
                  <span>Access real-time produce inventory from Google Sheets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📧</span>
                  <span>Receive order confirmations via Gmail integration</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-800 mb-3">Farm Management</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🌱</span>
                  <span>Manage crop data and harvest schedules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📈</span>
                  <span>Track sales and customer preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🎯</span>
                  <span>Request only needed permissions when required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔒</span>
                  <span>Maintain user privacy with minimal scope requests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* OAuth Panel */}
        <GoogleOAuthPanel className="mb-8" />

        {/* Documentation Links */}
        <div className="bg-white rounded-lg border border-green-200 p-6">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">
            📚 Documentation & References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Google Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://developers.google.com/identity/protocols/oauth2/web-server"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    OAuth 2.0 Web Server Flow
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.google.com/identity/protocols/oauth2/web-server#incrementalAuth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Incremental Authorization
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.google.com/identity/protocols/oauth2/scopes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    OAuth 2.0 Scopes for Google APIs
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-800 mb-2">NextAuth.js Integration</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://next-auth.js.org/providers/google"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    NextAuth Google Provider
                  </a>
                </li>
                <li>
                  <a
                    href="https://next-auth.js.org/configuration/callbacks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Callbacks Configuration
                  </a>
                </li>
                <li>
                  <a
                    href="https://next-auth.js.org/getting-started/rest-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    REST API Reference
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-green-600">
          <p className="text-sm">
            Implementation follows{' '}
            <a
              href="https://developers.google.com/identity/protocols/oauth2/web-server#node.js"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Google's official OAuth 2.0 documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
