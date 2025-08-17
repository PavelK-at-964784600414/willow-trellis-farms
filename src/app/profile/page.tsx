'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { 
  EnvelopeIcon, 
  DevicePhoneMobileIcon, 
  UserIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
  const { data: session, update } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emailNotifications: true,
    smsNotifications: false,
    farmUpdates: true,
    orderNotifications: true,
    promotionalEmails: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    
    const fetchUserProfile = async () => {
      if (!session) return
      
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setFormData({
            name: data.user?.name || '',
            email: data.user?.email || '',
            phone: data.user?.phone || '',
            emailNotifications: true,
            smsNotifications: false,
            farmUpdates: true,
            orderNotifications: true,
            promotionalEmails: false
          })
        } else {
          // Fallback to session data
          setFormData({
            name: session.user?.name || '',
            email: session.user?.email || '',
            phone: '',
            emailNotifications: true,
            smsNotifications: false,
            farmUpdates: true,
            orderNotifications: true,
            promotionalEmails: false
          })
        }
      } catch (_err) {
        // Fallback to session data
        setFormData({
          name: session.user?.name || '',
          email: session.user?.email || '',
          phone: '',
          emailNotifications: true,
          smsNotifications: false,
          farmUpdates: true,
          orderNotifications: true,
          promotionalEmails: false
        })
      }
    }
    
    // Fetch current user data from API
    fetchUserProfile()
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess('Profile updated successfully!')
      
      // Update the session
      await update({
        name: formData.name,
        phone: formData.phone
      })

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-farm-cream-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-rustic font-bold text-farm-green-800 mb-8">
          👤 Your Farm Profile
        </h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-farm-green-200">
          <h2 className="text-xl font-rustic font-semibold text-farm-green-800 mb-6">
            📝 Profile Information
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
                <XCircleIcon className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                {success}
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-farm-green-700 flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Basic Information
              </h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-farm-green-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-farm-green-300 rounded-md focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-farm-green-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  disabled
                  value={formData.email}
                  className="mt-1 block w-full px-3 py-2 border border-farm-sage-300 rounded-md bg-farm-sage-50 text-farm-sage-600"
                />
                <p className="text-xs text-farm-sage-600 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-farm-green-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-farm-green-300 rounded-md focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                  placeholder="+1 (555) 123-4567"
                />
                <p className="text-xs text-farm-sage-600 mt-1">
                  Required for SMS notifications about your orders
                </p>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="border-t border-farm-green-200 pt-6">
              <h3 className="text-lg font-medium text-farm-green-700 mb-4">
                📢 Notification Preferences
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="emailNotifications"
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                    className="mt-1 mr-3 text-farm-green-600 border-farm-green-300 focus:ring-farm-green-500"
                  />
                  <div>
                    <label htmlFor="emailNotifications" className="font-medium text-farm-green-700 flex items-center">
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      Email Notifications
                    </label>
                    <p className="text-sm text-farm-sage-600">
                      Receive order confirmations, pickup reminders, and farm updates via email
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="smsNotifications"
                    type="checkbox"
                    checked={formData.smsNotifications}
                    onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                    disabled={!formData.phone}
                    className="mt-1 mr-3 text-farm-green-600 border-farm-green-300 focus:ring-farm-green-500 disabled:opacity-50"
                  />
                  <div>
                    <label htmlFor="smsNotifications" className="font-medium text-farm-green-700 flex items-center">
                      <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                      SMS Notifications
                    </label>
                    <p className="text-sm text-farm-sage-600">
                      Get instant text messages when your order is ready for pickup
                      {!formData.phone && (
                        <span className="text-farm-brown-600 font-medium"> (Phone number required)</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="border-t border-farm-green-200 pt-6 bg-farm-sage-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-farm-green-700 mb-3">
                🚜 Farm Pickup Information
              </h3>
              <div className="text-sm text-farm-sage-700 space-y-1">
                <p><strong>📍 Location:</strong> 3013 Upper Otterson, Ottawa, ON</p>
                <p><strong>🕒 Hours:</strong> Tuesday-Sunday: 8AM-6PM</p>
                <p><strong>📞 Phone:</strong> (613) 581-9303</p>
                <p><strong>🌾 What to expect:</strong> Meet our farmers, see where your food grows, and enjoy the farm experience!</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-farm-green-600 text-white py-3 px-4 rounded-lg hover:bg-farm-green-700 transition-colors font-semibold disabled:opacity-50 shadow-lg"
            >
              {loading ? 'Updating Profile...' : '💾 Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
