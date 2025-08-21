'use client'

import { useState } from 'react'
import { Database, Download, Upload, RefreshCw, AlertTriangle } from 'lucide-react'

export default function DataManagementPage() {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const handleSeedData = async (endpoint: string, name: string) => {
    setLoading(prev => ({ ...prev, [endpoint]: true }))
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seed/${endpoint}`, {
        method: 'POST',
      })
      if (response.ok) {
        alert(`${name} seeded successfully!`)
      } else {
        alert(`Failed to seed ${name}`)
      }
    } catch (error) {
      console.error(`Failed to seed ${name}:`, error)
      alert(`Failed to seed ${name}`)
    } finally {
      setLoading(prev => ({ ...prev, [endpoint]: false }))
    }
  }

  const seedOptions = [
    { endpoint: 'all', name: 'All Data', description: 'Seed all tables with comprehensive dummy data' },
    { endpoint: 'users', name: 'Users', description: 'Seed users table with admin and customer accounts' },
    { endpoint: 'categories', name: 'Categories', description: 'Seed categories and subcategories' },
    { endpoint: 'services', name: 'Services', description: 'Seed services across all categories' },
    { endpoint: 'bookings', name: 'Bookings', description: 'Seed booking data with various statuses' },
    { endpoint: 'reviews', name: 'Reviews', description: 'Seed customer reviews and ratings' },
    { endpoint: 'contacts', name: 'Contacts', description: 'Seed contact form submissions' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
        <p className="text-gray-600">Manage database seeding and data operations</p>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
          <div>
            <h3 className="text-yellow-800 font-medium">Important Notice</h3>
            <p className="text-yellow-700 text-sm mt-1">
              Seeding data will add new records to your database. Some operations may overwrite existing data. 
              Please use with caution in production environments.
            </p>
          </div>
        </div>
      </div>

      {/* Seed Data Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Database size={24} />
            Database Seeding
          </h2>
          <p className="text-gray-600 mt-1">Populate your database with sample data for testing and development</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seedOptions.map((option) => (
              <div key={option.endpoint} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{option.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                <button
                  onClick={() => handleSeedData(option.endpoint, option.name)}
                  disabled={loading[option.endpoint]}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading[option.endpoint] ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  {loading[option.endpoint] ? 'Seeding...' : 'Seed Data'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Export/Import Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Data Export & Import</h2>
          <p className="text-gray-600 mt-1">Export and import data for backup and migration purposes</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Export Data</h3>
              <p className="text-sm text-gray-600 mb-4">Download your database data as JSON files</p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export All Data
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Import Data</h3>
              <p className="text-sm text-gray-600 mb-4">Upload and import data from JSON files</p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <Upload size={16} />
                Import Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}