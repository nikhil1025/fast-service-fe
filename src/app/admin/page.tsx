'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  DollarSign,
  Package,
  Activity
} from 'lucide-react'
import { api } from '@/lib/api'

interface DashboardStats {
  bookings: {
    total: number
    pending: number
    completed: number
  }
  contacts: {
    total: number
    unread: number
    read: number
  }
  users: {
    total: number
    active: number
  }
  services: {
    total: number
    active: number
  }
}

interface RecentActivity {
  recentBookings: any[]
  recentContacts: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<RecentActivity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          api.getDashboardStats(),
          api.getDashboardActivity()
        ])
        setStats(statsData)
        setActivity(activityData)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to Fast Services admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.bookings.total || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">
              {stats?.bookings.completed || 0} completed
            </span>
            <span className="text-gray-500 ml-2">
              • {stats?.bookings.pending || 0} pending
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.users.total || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">
              {stats?.users.active || 0} active
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Services</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.services.total || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">
              {stats?.services.active || 0} active
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.contacts.total || 0}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 font-medium">
              {stats?.contacts.unread || 0} unread
            </span>
            <span className="text-gray-500 ml-2">
              • {stats?.contacts.read || 0} read
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          </div>
          <div className="p-6">
            {activity?.recentBookings.length ? (
              <div className="space-y-4">
                {activity.recentBookings.slice(0, 5).map((booking, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{booking.serviceName}</p>
                      <p className="text-sm text-gray-600">{booking.name}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent bookings</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
          </div>
          <div className="p-6">
            {activity?.recentContacts.length ? (
              <div className="space-y-4">
                {activity.recentContacts.slice(0, 5).map((contact, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.subject}</p>
                    </div>
                    <div className="ml-4">
                      {!contact.isRead && (
                        <span className="inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent messages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}