import { Service } from '../types';

export const topSearchedServices = [
  'AC Cleaning',
  'Painting Services',
  'Sofa Cleaning',
  'Deep Cleaning',
  'Pest Control',
  'Apartment Moving',
  'Women\'s Salon'
];

export const services: Service[] = [
  {
    id: 'home-deep-cleaning',
    category: 'cleaning',
    title: 'Home Deep Cleaning',
    description: 'Professional deep cleaning service for your entire home. Our expert team uses advanced equipment and eco-friendly products to ensure your space is spotless.',
    image: 'https://images.pexels.com/photos/4107098/pexels-photo-4107098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviews: 156,
    price: 'AED 299',
    duration: '4-5 hours',
    features: [
      'Thorough cleaning of all rooms',
      'Bathroom and kitchen deep cleaning',
      'Window and glass cleaning',
      'Floor scrubbing and polishing',
      'Furniture and upholstery cleaning',
      'Air vent cleaning'
    ],
    customerReviews: [
      {
        id: 1,
        name: 'Sarah Ahmed',
        rating: 5,
        date: '2 days ago',
        comment: 'Excellent service! The team was professional and thorough. My house has never been cleaner.',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      {
        id: 2,
        name: 'Mohammed Rahman',
        rating: 5,
        date: '1 week ago',
        comment: 'Very satisfied with the cleaning service. They paid attention to every detail.',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
      }
    ]
  },
  {
    id: 'sofa-cleaning',
    category: 'cleaning',
    title: 'Sofa Cleaning',
    description: 'Professional sofa cleaning and sanitization service. We use specialized equipment and safe cleaning solutions to remove stains and refresh your upholstery.',
    image: 'https://images.pexels.com/photos/4107112/pexels-photo-4107112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviews: 98,
    price: 'AED 199',
    duration: '2-3 hours',
    features: [
      'Deep fabric cleaning',
      'Stain removal treatment',
      'Sanitization and deodorization',
      'Fabric protection treatment',
      'Pet hair removal',
      'Same-day service available'
    ],
    customerReviews: [
      {
        id: 1,
        name: 'Emily Wilson',
        rating: 5,
        date: '3 days ago',
        comment: 'Amazing results! My old sofa looks brand new after their cleaning service.',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
      },
      {
        id: 2,
        name: 'Abdullah Al-Sayed',
        rating: 4,
        date: '1 week ago',
        comment: 'Very professional service. They removed all the tough stains from my fabric sofa.',
        image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
      }
    ]
  },
  {
    id: 'home-relocation',
    category: 'moving',
    title: 'Home Relocation',
    description: 'Complete home moving service with professional packing and unpacking. We ensure safe transportation of your belongings to your new home.',
    image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviews: 156,
    price: 'AED 599',
    duration: '4-8 hours',
    features: [
      'Professional packing service',
      'Safe transportation',
      'Furniture disassembly and assembly',
      'Loading and unloading',
      'Unpacking service',
      'Insurance coverage'
    ],
    customerReviews: [
      {
        id: 1,
        name: 'Hassan Ali',
        rating: 5,
        date: '1 week ago',
        comment: 'Excellent moving service! They handled everything with care and professionalism.',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
      },
      {
        id: 2,
        name: 'Lisa Chen',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Made my move stress-free. Very organized and efficient team.',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      }
    ]
  },
  {
    id: 'ac-maintenance',
    category: 'maintenance',
    title: 'AC Maintenance',
    description: 'Professional AC maintenance and repair service. Our certified technicians ensure your AC system runs efficiently and effectively.',
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviews: 203,
    price: 'AED 249',
    duration: '1-2 hours',
    features: [
      'Complete system inspection',
      'Filter cleaning or replacement',
      'Coil cleaning',
      'Refrigerant level check',
      'Performance optimization',
      'Preventive maintenance'
    ],
    customerReviews: [
      {
        id: 1,
        name: 'Fatima Khan',
        rating: 5,
        date: '4 days ago',
        comment: 'Very professional AC service. My AC is working perfectly now!',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
      },
      {
        id: 2,
        name: 'John Smith',
        rating: 4,
        date: '1 week ago',
        comment: 'Thorough service and helpful technicians. Would recommend!',
        image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
      }
    ]
  }
];