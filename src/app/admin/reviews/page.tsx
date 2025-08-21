'use client'

import { useState, useEffect } from 'react'
import { Search, Star, Trash2, Eye } from 'lucide-react'
import { api, Review } from '@/lib/api'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRating, setFilterRating] = useState<string>('all')
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const data = await api.getReviews()
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return
    
    try {
      setActionLoading(prev => ({ ...prev, [id]: true }))
      await api.deleteReview(id)
      await fetchReviews() // Refresh the list
    } catch (error) {
      console.error('Failed to delete review:', error)
      alert('Failed to delete review')
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.service.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating
    return matchesSearch && matchesRating
  })

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    ))
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total: {reviews.length}</span>
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
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.rating}/5
                    </span>
                  </div>
                  
                  <p className="text-gray-900 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>By: {review.user.name}</span>
                    <span>•</span>
                    <span>Service: {review.service.title}</span>
                    <span>•</span>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <button className="text-gray-600 hover:text-primary">
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={actionLoading[review.id]}
                    className="text-gray-600 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  )
}