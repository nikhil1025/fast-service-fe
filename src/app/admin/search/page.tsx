'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react'

interface SearchTerm {
  id: string
  term: string
  count: number
  lastSearched: string
}

export default function SearchPage() {
  const [searchTerms, setSearchTerms] = useState<SearchTerm[]>([])
  const [popularSearches, setPopularSearches] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [newPopularSearch, setNewPopularSearch] = useState('')

  useEffect(() => {
    fetchSearchData()
  }, [])

  const fetchSearchData = async () => {
    try {
      setLoading(true)
      // This would be actual API calls
      // const [termsData, popularData] = await Promise.all([
      //   api.getSearchTerms(),
      //   api.getPopularSearches()
      // ])
      
      // For now, using dummy data
      const dummyTerms: SearchTerm[] = [
        {
          id: '1',
          term: 'AC Cleaning',
          count: 245,
          lastSearched: new Date().toISOString(),
        },
        {
          id: '2',
          term: 'Deep Cleaning',
          count: 189,
          lastSearched: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          term: 'Home Moving',
          count: 156,
          lastSearched: new Date(Date.now() - 172800000).toISOString(),
        },
      ]

      const dummyPopular = [
        'AC Cleaning',
        'Deep Cleaning',
        'Sofa Cleaning',
        'Home Moving',
        'Pest Control',
        'Painting Services',
        'Plumbing',
        'Electrical Work'
      ]

      setSearchTerms(dummyTerms)
      setPopularSearches(dummyPopular)
    } catch (error) {
      console.error('Failed to fetch search data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addPopularSearch = () => {
    if (newPopularSearch.trim() && !popularSearches.includes(newPopularSearch.trim())) {
      setPopularSearches(prev => [...prev, newPopularSearch.trim()])
      setNewPopularSearch('')
    }
  }

  const removePopularSearch = (term: string) => {
    setPopularSearches(prev => prev.filter(t => t !== term))
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Analytics</h1>
        <p className="text-gray-600">Monitor search trends and manage popular searches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Terms Analytics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp size={24} />
              Top Search Terms
            </h2>
            <p className="text-gray-600 text-sm mt-1">Most searched terms by users</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {searchTerms.map((term, index) => (
                <div key={term.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{term.term}</h3>
                      <p className="text-sm text-gray-600">
                        Last searched: {new Date(term.lastSearched).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{term.count}</p>
                    <p className="text-xs text-gray-500">searches</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Searches Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Search size={24} />
              Popular Searches
            </h2>
            <p className="text-gray-600 text-sm mt-1">Manage featured search terms</p>
          </div>
          <div className="p-6">
            {/* Add New Popular Search */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPopularSearch}
                  onChange={(e) => setNewPopularSearch(e.target.value)}
                  placeholder="Add new popular search..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && addPopularSearch()}
                />
                <button
                  onClick={addPopularSearch}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Popular Searches List */}
            <div className="space-y-2">
              {popularSearches.map((term, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{term}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-600 hover:text-primary">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => removePopularSearch(term)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Searches</p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Terms</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+5%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. per Day</p>
              <p className="text-3xl font-bold text-gray-900">42</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+8%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </div>
    </div>
  )
}