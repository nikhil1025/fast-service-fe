'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { Star, Clock, CheckCircle, CalendarCheck } from 'lucide-react'
import BookingModal from '@/components/BookingModal'
import { useService } from '@/hooks/useServices'

interface ServicePageProps {
  params: {
    serviceId: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { service, loading, error } = useService(params.serviceId)

  if (loading) {
    return (
      <div className="pt-8 pb-16">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 mb-8"></div>
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="h-8 bg-gray-200 rounded mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-6 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    notFound()
  }

  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${service.image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
        </div>
        <div className="container-custom relative h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" />
                <span className="font-semibold">{service.rating}</span>
                <span className="text-white/80">({service.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{service.duration}</span>
              </div>
            </div>
            <p className="text-lg text-white/90">{service.description}</p>
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Service Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-1" size={20} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Info */}
            {service.category && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Category</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{service.category.icon || '🏠'}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{service.category.name}</h3>
                    {service.category.description && (
                      <p className="text-gray-600">{service.category.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {service.reviews && service.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
                <div className="space-y-4">
                  {service.reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 font-bold">{review.user.name}</span>
                          <Star className="text-yellow-400" fill="currentColor" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-3xl font-bold text-gray-800 mb-4">
                {service.price}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 mb-6"
              >
                <CalendarCheck size={20} />
                Book Now
              </button>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} className="text-primary" />
                  <span>{service.duration} (estimated)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle size={20} className="text-primary" />
                  <span>100% Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.title}
      />
    </div>
  )
}

