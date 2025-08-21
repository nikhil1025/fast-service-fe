'use client'

import { X, Calendar, Phone, MapPin, Clock, User, Mail, MessageSquare, Tag } from 'lucide-react'
import { Booking } from '@/lib/api'

interface BookingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
}

export default function BookingDetailModal({ isOpen, onClose, booking }: BookingDetailModalProps) {
  if (!isOpen || !booking) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Service & Status */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.serviceName}</h3>
              <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
            </div>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(booking.status)}`}>
              {booking.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User size={18} />
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{booking.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Mobile</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Phone size={16} />
                  {booking.mobile}
                </p>
              </div>
              {booking.user && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Account Email</label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Mail size={16} />
                    {booking.user.email}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag size={18} />
              Service Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Service Date</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Booking Created</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Clock size={16} />
                  {new Date(booking.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Booking Updated</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Clock size={16} />
                  {new Date(booking.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Service Address</label>
              <p className="text-gray-900 flex items-start gap-2 mt-1">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                {booking.address}
              </p>
            </div>
          </div>

          {/* Message */}
          {booking.message && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare size={18} />
                Customer Message
              </h4>
              <p className="text-gray-900 whitespace-pre-wrap">{booking.message}</p>
            </div>
          )}

          {/* Service Information */}
          {booking.service && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Service Information</h4>
              <div className="flex items-start gap-4">
                <img 
                  src={booking.service.image} 
                  alt={booking.service.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h5 className="font-medium text-gray-900">{booking.service.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{booking.service.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-primary font-medium">{booking.service.price}</span>
                    <span className="text-gray-600">{booking.service.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Booking created on {new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
              {booking.updatedAt !== booking.createdAt && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Last updated on {new Date(booking.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}