'use client'

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    role: 'Homeowner',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    review: 'The cleaning service was exceptional! The team was professional, thorough, and paid attention to every detail. My home has never looked better.',
    service: 'Deep Cleaning Service'
  },
  {
    id: 2,
    name: 'Mohammed Rahman',
    role: 'Business Owner',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    review: 'Fast Services made our office relocation completely stress-free. Their moving team was efficient, careful with our equipment, and very professional.',
    service: 'Office Moving Service'
  },
  {
    id: 3,
    name: 'Emily Wilson',
    role: 'Apartment Resident',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    review: 'Their AC maintenance service is top-notch! Quick response, expert technicians, and now my AC works better than ever. Highly recommended!',
    service: 'AC Maintenance'
  },
  {
    id: 4,
    name: 'Abdullah Al-Sayed',
    role: 'Villa Owner',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    review: 'Outstanding pest control service! They were thorough in their inspection and treatment. Haven\'t seen a single pest since their visit.',
    service: 'Pest Control Service'
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12 px-4"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote
                      size={24}
                      className="absolute -top-2 -left-2 text-primary/20"
                    />
                    <p className="text-gray-600 mb-4 pl-6">
                      {testimonial.review}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-primary font-medium">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-primary mb-2">4.8</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-primary mb-2">5K+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-primary mb-2">10K+</p>
            <p className="text-gray-600">Services Completed</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-primary mb-2">98%</p>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;