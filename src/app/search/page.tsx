'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Star, Grid, List } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import BookingModal from '@/components/BookingModal'
import Link from 'next/link'

function SearchPageInner() {
  const searchParams = useSearchParams()
  const { results, loading, error, search } = useSearch()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  // Search filters state
  const [filters, setFilters] = useState({
    query: searchParams.get('query') || '',
    category: searchParams.get('category') || '',
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sortBy: searchParams.get('sortBy') || 'relevance',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: 12,
  })

  useEffect(() => {
    // Perform search when component mounts or filters change
    search(filters)
  }, [filters, search])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsModalOpen(true)
  }

  if (loading && !results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        {/* ... skeleton loading markup ... */}
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {filters.query ? `Search Results for "${filters.query}"` : 'All Services'}
          </h1>
          {results && (
            <p className="text-gray-600">
              Found {results.pagination.total} services
              {filters.query && ` matching "${filters.query}"`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h3>

              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.query}
                    onChange={(e) => handleFilterChange('query', e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => handleFilterChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Price (AED)
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Enter max price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popularity">Most Popular</option>
                  <option value="price">Price</option>
                  <option value="newest">Newest</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
              
              {results && (
                <p className="text-sm text-gray-600">
                  Showing {((results.pagination.page - 1) * results.pagination.limit) + 1}-
                  {Math.min(results.pagination.page * results.pagination.limit, results.pagination.total)} of {results.pagination.total} results
                </p>
              )}
            </div>

            {/* Services Grid/List */}
            {results && results.services.length > 0 ? (
              <>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                  {results.services.map((service) => (
                    <div key={service.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                      <Link href={`/services/${service.id}`} className={`block ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                        <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className={`w-full h-full object-cover ${viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'}`}
                          />
                        </div>
                      </Link>
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <Link href={`/services/${service.id}`}>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center text-yellow-400">
                              <Star size={16} fill="currentColor" />
                              <span className="ml-1 text-gray-800 font-medium">{service.rating}</span>
                            </div>
                            <span className="text-gray-500">({service.reviewCount} reviews)</span>
                          </div>
                          <div className="text-lg font-bold text-primary mb-4">
                            {service.price}
                          </div>
                        </Link>
                        <button 
                          onClick={() => handleBookNow(service.title)}
                          className="w-full bg-primary text-white py-2.5 rounded-md hover:bg-primary/90 transition duration-200"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {results.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(results.pagination.page - 1)}
                      disabled={!results.pagination.hasPrev}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {[...Array(results.pagination.totalPages)].map((_, i) => {
                      const page = i + 1
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-md ${
                            page === results.pagination.page
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                    
                    <button
                      onClick={() => handlePageChange(results.pagination.page + 1)}
                      disabled={!results.pagination.hasNext}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse our categories.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageInner />
    </Suspense>
  )
}
