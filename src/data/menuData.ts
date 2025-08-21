import { ServiceCategory } from '../types';

// All categories in a flat structure for mobile menu
export const megaMenuCategories: ServiceCategory[] = [
  {
    name: 'Cleaning',
    services: [
      'Home Cleaning',
      'Deep Cleaning',
      {
        name: 'Furniture Cleaning',
        subcategories: ['Sofa', 'Carpet', 'Mattress', 'Curtain']
      },
      {
        name: 'Laundry & Dry Cleaning',
        subcategories: []
      }
    ]
  },
  {
    name: 'Moving',
    services: ['Apartment Moving', 'Villa Moving', 'Office Moving']
  },
  {
    name: 'Salon & Home Spa',
    services: [
      "Women's Salon", 
      "Women's Spa", 
      'Premium Spa', 
      'Makeup', 
      "Men's Spa", 
      'Hair Care'
    ]
  },
  {
    name: 'Storage',
    services: ['Self Storage', 'AC Storage']
  },
  {
    name: 'Pest Control and Gardening',
    services: ['Pest Control', 'Gardening']
  },
  {
    name: 'Maintenance',
    services: ['Painting Services']
  }
];

// Mega menu structure - organized by columns
export const megaMenuData = [
  // Column 1 (Left Side)
  [
    {
      name: 'Cleaning',
      services: [
        'Home Cleaning',
        'Deep Cleaning',
        {
          name: 'Furniture Cleaning',
          subcategories: ['Sofa', 'Carpet', 'Mattress', 'Curtain']
        },
        {
          name: 'Laundry & Dry Cleaning',
          subcategories: []
        }
      ]
    }
  ],
  
  // Column 2 (Middle Side)
  [
    {
      name: 'Moving',
      services: ['Apartment Moving', 'Villa Moving', 'Office Moving']
    },
    {
      name: 'Salon & Home Spa',
      services: [
        "Women's Salon", 
        "Women's Spa", 
        'Premium Spa', 
        'Makeup', 
        "Men's Spa", 
        'Hair Care'
      ]
    }
  ],
  
  // Column 3 (Next to Middle)
  [
    {
      name: 'Storage',
      services: ['Self Storage', 'AC Storage']
    },
    {
      name: 'Pest Control and Gardening',
      services: ['Pest Control', 'Gardening']
    }
  ],
  
  // Column 4 (Rightmost)
  [
    {
      name: 'Maintenance',
      services: ['Painting Services']
    }
  ]
];