'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2, Calendar } from 'lucide-react'
import { api, Booking, Service } from '@/lib/api'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  booking?: Booking | null
  mode: 'create' | 'edit'
}

interface FormData {
  serviceName: string
  name: string
  mobile: string
  address: string
  date: string
  message: string
  status: string
}

export default function BookingModal({ isOpen, onClose, onSuccess, booking, mode }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    name: '',
    mobile: '',
    address: '',
    date: '',
    message: '',
    status: 'pending'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchServices()
      
      if (mode === 'edit' && booking) {
        setFormData({
          serviceName: booking.serviceName,
          name: booking.name,
          mobile: booking.mobile,
          address: booking.address,
          date: new Date(booking.date).toISOString().split('T')[0],
          message: booking.message || '',
          status: booking.status
        })
      } else {
        setFormData({
          serviceName: '',
          name: '',
          mobile: '',
          address: '',
          date: '',
          message: '',
          status: 'pending'
        })
      }
      setError(null)
    }
  }, [isOpen, mode, booking])

  const fetchServices = async () => {
    try {
      const data = await api.getServices()
      setServices(data)
    } catch (err) {
      console.error('Failed to fetch services:', err)
    }
  }

  const getStatusOptions = () => [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  const validateForm = () => {
    if (!formData.serviceName.trim()) {
      setError('Service name is required')
      return false
    }
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return false
    }
    const mobileRegex = /^(?:\+971|00971|0)?(?:50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/
    if (!mobileRegex.test(formData.mobile.trim())) {
      setError('Please enter a valid UAE mobile number')
      return false
    }
    if (!formData.address.trim() || formData.address.trim().length < 10) {
      setError('Please enter a complete address')
      return false
    }
    if (!formData.date) {
      setError('Date is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError(null)

    try {
      if (mode === 'create') {
        await api.createBooking({
          serviceName: formData.serviceName,
          name: formData.name,
          mobile: formData.mobile,
          address: formData.address,
          date: formData.date,
          message: formData.message || undefined
        })
      } else if (booking) {
        // For edit mode, we need to update the booking status
        await api.updateBookingStatus(booking.id, formData.status)
        // Note: The backend doesn't have a full update endpoint, only status update
        // You might need to add a full update endpoint in the backend
      }
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Add New Booking' : 'Edit Booking'}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service *
              </label>
              {mode === 'create' ? (
                <select
                  value={formData.serviceName}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
                  required
                >
                  <option value="">Select Service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.serviceName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={loading || mode === 'edit'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                disabled={loading || mode === 'edit'}
                placeholder="+971 XX XXX XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  disabled={loading || mode === 'edit'}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              disabled={loading || mode === 'edit'}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
              required
            />
          </div>

          {mode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
                required
              >
                {getStatusOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              disabled={loading || mode === 'edit'}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {loading ? 'Saving...' : mode === 'create' ? 'Create Booking' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}