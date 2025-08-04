'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { 
  EnvelopeIcon, 
  DevicePhoneMobileIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  createdAt: string
  _count: {
    orders: number
  }
}

interface NotificationHistory {
  id: string
  subject?: string
  message: string
  recipientType: string
  recipientCount: number
  emailsSent: number
  smssSent: number
  sentAt: string
  sentByUser: {
    name: string
    email: string
  }
}

export default function AdminNotifications() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [users, setUsers] = useState<User[]>([])
  const [notifications, setNotifications] = useState<NotificationHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    recipientType: 'all',
    selectedUsers: [] as string[],
    subject: '',
    message: '',
    sendEmail: true,
    sendSMS: false
  })

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    if (session.user.role !== 'ADMIN') {
      router.push('/')
      return
    }
    fetchData()
  }, [session])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/notifications')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setUsers(data.users)
      setNotifications(data.notifications)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUserSelection = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send notifications')
      }

      setSuccess(`Notifications sent successfully! ${data.results.emailsSent} emails, ${data.results.smssSent} SMS messages sent.`)
      
      // Reset form
      setFormData({
        recipientType: 'all',
        selectedUsers: [],
        subject: '',
        message: '',
        sendEmail: true,
        sendSMS: false
      })
      
      // Refresh data
      fetchData()

    } catch (error: any) {
      setError(error.message)
    } finally {
      setSending(false)
    }
  }

  const getFilteredUsers = () => {
    switch (formData.recipientType) {
      case 'customers':
        return users.filter(user => user._count.orders > 0)
      case 'all':
      default:
        return users
    }
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-farm-cream-50">
        <Navigation />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-farm-cream-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-rustic font-bold text-farm-green-800 mb-8">
          📢 Farm Notifications
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notification Form */}
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-farm-green-200">
            <h2 className="text-xl font-rustic font-semibold text-farm-green-800 mb-6">
              📨 Send Farm Update
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

              {/* Recipient Type */}
              <div>
                <label className="block text-sm font-medium text-farm-green-700 mb-2">
                  <UserGroupIcon className="inline h-4 w-4 mr-1" />
                  Send To
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="all"
                      checked={formData.recipientType === 'all'}
                      onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                      className="mr-2 text-farm-green-600"
                    />
                    All Users ({users.length})
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="customers"
                      checked={formData.recipientType === 'customers'}
                      onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                      className="mr-2 text-farm-green-600"
                    />
                    Customers Only ({users.filter(u => u._count.orders > 0).length})
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="selected"
                      checked={formData.recipientType === 'selected'}
                      onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                      className="mr-2 text-farm-green-600"
                    />
                    Selected Users ({formData.selectedUsers.length})
                  </label>
                </div>
              </div>

              {/* User Selection */}
              {formData.recipientType === 'selected' && (
                <div className="max-h-40 overflow-y-auto border border-farm-green-200 rounded-lg p-3">
                  <div className="space-y-2">
                    {getFilteredUsers().map(user => (
                      <label key={user.id} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                          className="mr-2 text-farm-green-600"
                        />
                        {user.name || user.email} 
                        {user._count.orders > 0 && (
                          <span className="text-farm-sage-600 ml-2">({user._count.orders} orders)</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Notification Methods */}
              <div>
                <label className="block text-sm font-medium text-farm-green-700 mb-2">
                  Notification Methods
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sendEmail}
                      onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                      className="mr-2 text-farm-green-600"
                    />
                    <EnvelopeIcon className="h-4 w-4 mr-1" />
                    Send Email
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sendSMS}
                      onChange={(e) => setFormData({ ...formData, sendSMS: e.target.checked })}
                      className="mr-2 text-farm-green-600"
                    />
                    <DevicePhoneMobileIcon className="h-4 w-4 mr-1" />
                    Send SMS
                  </label>
                </div>
              </div>

              {/* Email Subject */}
              {formData.sendEmail && (
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-farm-green-700">
                    Email Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required={formData.sendEmail}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-farm-green-300 rounded-md focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                    placeholder="🌾 Fresh update from Willow Trellis Farms!"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-farm-green-700">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-farm-green-300 rounded-md focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                  placeholder="Share seasonal updates, harvest news, special offers, or farm events..."
                />
              </div>

              <button
                type="submit"
                disabled={sending || (!formData.sendEmail && !formData.sendSMS)}
                className="w-full bg-farm-green-600 text-white py-3 px-4 rounded-lg hover:bg-farm-green-700 transition-colors font-semibold disabled:opacity-50 shadow-lg"
              >
                {sending ? (
                  <>
                    <ClockIcon className="inline h-4 w-4 mr-2 animate-spin" />
                    Sending Notifications...
                  </>
                ) : (
                  <>📤 Send Farm Update</>
                )}
              </button>
            </form>
          </div>

          {/* Notification History */}
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-farm-green-200">
            <h2 className="text-xl font-rustic font-semibold text-farm-green-800 mb-6">
              📋 Notification History
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-farm-sage-600 text-center py-8">
                  No notifications sent yet
                </p>
              ) : (
                notifications.map(notification => (
                  <div key={notification.id} className="border border-farm-sage-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-farm-green-800">
                        {notification.subject || 'SMS Notification'}
                      </h3>
                      <span className="text-xs text-farm-sage-600">
                        {new Date(notification.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-farm-sage-700 mb-3">
                      {notification.message.substring(0, 100)}
                      {notification.message.length > 100 && '...'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-farm-sage-600">
                      <span>
                        To: {notification.recipientType} ({notification.recipientCount} users)
                      </span>
                      <div className="flex items-center space-x-3">
                        {notification.emailsSent > 0 && (
                          <span className="flex items-center">
                            <EnvelopeIcon className="h-3 w-3 mr-1" />
                            {notification.emailsSent}
                          </span>
                        )}
                        {notification.smssSent > 0 && (
                          <span className="flex items-center">
                            <DevicePhoneMobileIcon className="h-3 w-3 mr-1" />
                            {notification.smssSent}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-farm-sage-500 mt-1">
                      By: {notification.sentByUser.name}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-farm-green-200 text-center">
            <UserGroupIcon className="h-8 w-8 text-farm-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-farm-green-800">Total Users</h3>
            <p className="text-2xl font-bold text-farm-green-600">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-farm-green-200 text-center">
            <EnvelopeIcon className="h-8 w-8 text-farm-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-farm-green-800">Customers</h3>
            <p className="text-2xl font-bold text-farm-green-600">
              {users.filter(u => u._count.orders > 0).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-farm-green-200 text-center">
            <DevicePhoneMobileIcon className="h-8 w-8 text-farm-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-farm-green-800">SMS-Enabled</h3>
            <p className="text-2xl font-bold text-farm-green-600">
              {users.filter(u => u.phone).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
