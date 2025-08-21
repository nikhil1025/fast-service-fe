'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';

const BannerSection: React.FC = () => {
  const scrollToCleaningServices = () => {
    document.getElementById('cleaning-services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/4107098/pexels-photo-4107098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Professional Cleaning Services in Dubai
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Experience the highest standards of cleanliness with our professional cleaning services. 
            From deep cleaning to specialized solutions, we ensure your space sparkles.
          </p>
          <button 
            onClick={scrollToCleaningServices}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all duration-300"
          >
            Learn More
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;