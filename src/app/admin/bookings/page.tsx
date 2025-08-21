'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, Phone, MapPin, Clock, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { api, Booking } from '@/lib/api'
import BookingModal from '@/components/admin/modals/BookingModal'
import BookingDetailModal from '@/components/admin/modals/BookingDetailModal'
import DeleteConfirmModal from '@/components/admin/modals/DeleteConfirmModal'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const data = await api.getAllBookings()
      setBookings(data)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBooking = () => {
    setSelectedBooking(null)
    setModalMode('create')
    setShowBookingModal(true)
  }

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setModalMode('edit')
    setShowBookingModal(true)
  }

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowDetailModal(true)
  }

  const handleDeleteBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!selectedBooking) return
    
    try {
      await api.deleteBooking(selectedBooking.id)
      await fetchBookings()
    } catch (error) {
      console.error('Failed to delete booking:', error)
      alert('Failed to delete booking')
    }
  }

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await api.updateBookingStatus(id, status)
      await fetchBookings() // Refresh the list
    } catch (error) {
      console.error('Failed to update booking status:', error)
      alert('Failed to update booking status')
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.mobile.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusOptions = () => [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Total: {bookings.length}</span>
          <button 
            onClick={handleAddBooking}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            Add Booking
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="divide-y divide-gray-200">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>{booking.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="truncate">{booking.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="font-medium text-gray-900">Customer: {booking.name}</p>
                    {booking.user && (
                      <p className="text-sm text-gray-600">Account: {booking.user.email}</p>
                    )}
                    {booking.message && (
                      <p className="text-sm text-gray-600 mt-1">Message: {booking.message}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      {getStatusOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <button 
                    onClick={() => handleViewBooking(booking)}
                    className="text-gray-600 hover:text-primary"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEditBooking(booking)}
                    className="text-gray-600 hover:text-primary"
                    title="Edit Booking"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteBooking(booking)}
                    className="text-gray-600 hover:text-red-600"
                    title="Delete Booking"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSuccess={fetchBookings}
        booking={selectedBooking}
        mode={modalMode}
      />

      {/* Booking Detail Modal */}
      <BookingDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        booking={selectedBooking}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Booking"
        message="Are you sure you want to delete this booking?"
        itemName={selectedBooking?.serviceName}
      />
    </div>
  )
}