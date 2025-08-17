'use client'

import { useEffect } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getBackgroundStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#16a34a' } // farm-green-600
      case 'error':
        return { backgroundColor: '#dc2626' } // red-600  
      default:
        return { backgroundColor: '#a67c52' } // farm-brown-600
    }
  }

  return (
    <div className="transform transition-all duration-300 ease-in-out">
      <div 
        style={getBackgroundStyle()}
        className="text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 max-w-sm border-2 border-white backdrop-blur-sm"
      >
        <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-white" />
        <span className="font-medium text-sm text-white">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors text-white"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
