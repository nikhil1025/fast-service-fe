// 'use client'

// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import { Star, ArrowRight, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';
// import BookingModal from './BookingModal';
// import 'swiper/css';
// import 'swiper/css/navigation';

// const maintenanceServices = [
//   {
//     id: 1,
//     title: 'AC Maintenance',
//     description: 'Complete AC service, repair, and maintenance',
//     image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     rating: 4.7,
//     reviews: 203
//   },
//   {
//     id: 2,
//     title: 'Plumbing Services',
//     description: 'Professional plumbing repair and installation',
//     image: 'https://images.pexels.com/photos/8486973/pexels-photo-8486973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     rating: 4.8,
//     reviews: 167
//   },
//   {
//     id: 3,
//     title: 'Electrical Work',
//     description: 'Expert electrical repair and installation services',
//     image: 'https://images.pexels.com/photos/8486974/pexels-photo-8486974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     rating: 4.9,
//     reviews: 145
//   },
//   {
//     id: 4,
//     title: 'Painting Services',
//     description: 'Professional interior and exterior painting',
//     image: 'https://images.pexels.com/photos/8486975/pexels-photo-8486975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     rating: 4.6,
//     reviews: 178
//   }
// ];

// const MaintenanceServicesSection: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState('');

//   const handleBookNow = (serviceName: string) => {
//     setSelectedService(serviceName);
//     setIsModalOpen(true);
//   };

//   return (
//     <section id="maintenance-services" className="py-16 bg-gradient-to-b from-white to-primary/5">
//       <div className="container-custom">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Maintenance Services
//           </h2>
//           <a 
//             href="/services/maintenance" 
//             className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200"
//           >
//             View All
//             <ArrowRight size={18} />
//           </a>
//         </div>

//         <div className="relative group">
//           <button className="maintenance-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-white backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-primary hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100">
//             <ChevronLeft size={20} />
//           </button>
//           <button className="maintenance-swiper-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-10 h-10 bg-white backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-primary hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100">
//             <ChevronRight size={20} />
//           </button>

//           <div className="overflow-hidden mx-6">
//             <Swiper
//               modules={[Navigation]}
//               spaceBetween={24}
//               slidesPerView={1}
//               navigation={{
//                 prevEl: '.maintenance-swiper-prev',
//                 nextEl: '.maintenance-swiper-next',
//               }}
//               breakpoints={{
//                 640: {
//                   slidesPerView: 2,
//                 },
//                 1024: {
//                   slidesPerView: 3,
//                 },
//               }}
//               className="px-4"
//             >
//               {maintenanceServices.map((service) => (
//                 <SwiperSlide key={service.id}>
//                   <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 h-full">
//                     <div className="relative h-48">
//                       <img 
//                         src={service.image} 
//                         alt={service.title}
//                         className="w-full h-full object-cover rounded-t-lg"
//                       />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                         {service.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {service.description}
//                       </p>
//                       <div className="flex items-center gap-2 mb-4">
//                         <div className="flex items-center text-yellow-400">
//                           <Star size={16} fill="currentColor" />
//                           <span className="ml-1 text-gray-800 font-medium">{service.rating}</span>
//                         </div>
//                         <span className="text-gray-500">({service.reviews} reviews)</span>
//                       </div>
//                       <button 
//                         onClick={() => handleBookNow(service.title)}
//                         className="w-full bg-primary text-white py-2.5 rounded-md hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2"
//                       >
//                         <CalendarCheck size={18} />
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>

//       <BookingModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         serviceName={selectedService}
//       />
//     </section>
//   );
// };

// export default MaintenanceServicesSection;
'use client'

import React, { useState, useMemo } from 'react';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Star, ArrowRight, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';
import BookingModal from './BookingModal';
import { useServices } from '@/hooks/useServices'
import { useCategories } from '@/hooks/useCategories'
import 'swiper/css';
import 'swiper/css/navigation';

const MaintenanceServicesSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const { categories } = useCategories()
  
  // Memoize the maintenance category to prevent unnecessary re-renders
  const maintenanceCategory = useMemo(() => 
    categories.find(cat => cat.slug === 'maintenance'), 
    [categories]
  )
  
  const { services: maintenanceServices, loading } = useServices(maintenanceCategory?.id)

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <section id="maintenance-services" className="py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Maintenance Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="maintenance-services" className="py-16 bg-gradient-to-b from-white to-primary/5">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Maintenance Services
          </h2>
          <Link 
            href={maintenanceCategory ? `/services/category/${maintenanceCategory.slug}` : '/services'} 
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {maintenanceServices.length > 0 ? (
          <div className="relative group">
            <button className="maintenance-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-white backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-primary hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100">
              <ChevronLeft size={20} />
            </button>
            <button className="maintenance-swiper-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-10 h-10 bg-white backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-primary hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100">
              <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden mx-6">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  prevEl: '.maintenance-swiper-prev',
                  nextEl: '.maintenance-swiper-next',
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="px-4"
              >
                {maintenanceServices.map((service) => (
                  <SwiperSlide key={service.id}>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 h-full">
                      <Link href={`/services/${service.id}`} className="block">
                        <div className="relative h-48">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
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
                        </div>
                      </Link>
                      <div className="px-6 pb-6">
                        <button 
                          onClick={() => handleBookNow(service.title)}
                          className="w-full bg-primary text-white py-2.5 rounded-md hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2"
                        >
                          <CalendarCheck size={18} />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No maintenance services available at the moment.</p>
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </section>
  );
};

export default MaintenanceServicesSection;