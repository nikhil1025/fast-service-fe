'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Search, Filter, Star, Grid, List, ChevronDown } from 'lucide-react'
import { api, Category, Service } from '@/lib/api'
import BookingModal from '@/components/BookingModal'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<string>('name')

  useEffect(() => {
    const fetchCategoryAndServices = async () => {
      try {
        setLoading(true)
        const [categoryData, servicesData] = await Promise.all([
          api.getCategoryBySlug(params.slug),
          api.getServicesByCategory(params.slug)
        ])
        setCategory(categoryData)
        setServices(servicesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndServices()
  }, [params.slug])

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsModalOpen(true)
  }

  // Filter and sort services
  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'rating':
          return b.rating - a.rating
        case 'price':
          const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0
          const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0
          return priceA - priceB
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
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

  if (error || !category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 text-lg">{category.description}</p>
          )}
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* View Mode */}
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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredServices.length} services in {category.name}
          </p>
        </div>

        {/* Services Grid/List */}
        {filteredServices.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {filteredServices.map((service) => (
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600">No services are available in this category at the moment.</p>
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  )
}