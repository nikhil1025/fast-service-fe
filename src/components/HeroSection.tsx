'use client'

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchSuggestions } from '@/hooks/useSearch';
import { api } from '@/lib/api';

const HeroSection: React.FC = () => {
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const { suggestions, getSuggestions } = useSearchSuggestions();

  useEffect(() => {
    // Fetch popular searches on component mount
    const fetchPopularSearches = async () => {
      try {
        const data = await api.getPopularSearches();
        setPopularSearches(data.popularSearches);
      } catch (error) {
        console.error('Failed to fetch popular searches:', error);
      }
    };

    fetchPopularSearches();
  }, []);

  useEffect(() => {
    // Get suggestions when service input changes
    if (service.length >= 2) {
      getSuggestions(service);
    }
  }, [service, getSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (service.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(service.trim())}&city=${encodeURIComponent(city)}`;
    }
  };

  const handlePopularSearchClick = (searchTerm: string) => {
    window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/3747455/pexels-photo-3747455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary-dark/70 to-primary-dark/90"></div>
      </div>

      <div className="container-custom relative z-10 text-center">
        <h1 className="text-white font-bold mb-4">
          Book Top-Rated Home Services in Dubai
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Your One Stop Destination For Booking All Kinds of Home Services at low prices.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              
              {/* Search Suggestions Dropdown */}
              {suggestions.length > 0 && service.length >= 2 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setService(suggestion);
                        // Clear suggestions after selection
                        getSuggestions('');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1">
              <select
                className="w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Choose City</option>
                <option value="dubai">Dubai</option>
                <option value="abudhabi">Abu Dhabi</option>
                <option value="sharjah">Sharjah</option>
                <option value="ajman">Ajman</option>
                <option value="fujairah">Fujairah</option>
                <option value="rak">Ras Al Khaimah</option>
                <option value="uaq">Umm Al Quwain</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md shadow-md transition duration-200 flex items-center justify-center gap-2"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>

        {/* Top Searched Services */}
        <div>
          <p className="text-white/80 mb-2">Top Searched Services:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.map((searchTerm, index) => (
              <button 
                key={index}
                onClick={() => handlePopularSearchClick(searchTerm)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full text-sm transition duration-200"
              >
                {searchTerm}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;