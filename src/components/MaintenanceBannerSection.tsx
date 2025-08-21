'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';

const MaintenanceBannerSection: React.FC = () => {
  const scrollToMaintenanceServices = () => {
    document.getElementById('maintenance-services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary-dark/70"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Expert Home Maintenance Services
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Keep your home in perfect condition with our comprehensive maintenance services. 
            From repairs to renovations, we've got you covered.
          </p>
          <button 
            onClick={scrollToMaintenanceServices}
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

export default MaintenanceBannerSection;