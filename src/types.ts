export interface ServiceCategory {
  name: string;
  services: (string | {
    name: string;
    subcategories: (string | {
      name: string;
      items?: string[];
    })[];
  })[];
}

export interface CustomerReview {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  image: string;
}

export interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  features: string[];
  customerReviews: CustomerReview[];
}