'use client'

import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const CallToActionSection: React.FC = () => {
  const scrollToCleaningServices = () => {
    document.getElementById('cleaning-services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+971123456789';
  };

  return (
    <section className="py-20 bg-primary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Our Premium Services?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Book your service today and join thousands of satisfied customers who trust us for their home service needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToCleaningServices}
              className="w-full sm:w-auto px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-primary-dark hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              Browse Services
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={handleCallNow}
              className="w-full sm:w-auto px-8 py-3 bg-primary-dark text-white font-semibold rounded-md hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;