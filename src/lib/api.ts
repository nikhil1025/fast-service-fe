const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  parentId?: string;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  reviews?: Review[],
  price: string;
  duration: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  category: Category;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  serviceName: string;
  name: string;
  mobile: string;
  address: string;
  date: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  user?: User;
  service?: Service;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: User;
  service: Service;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SearchResult {
  services: Service[];
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    query?: string;
    category?: string;
    minRating?: number;
    maxPrice?: number;
    sortBy: string;
    sortOrder: string;
  };
  popularSearches: string[];
  suggestions: string[];
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role?: 'user' | 'admin';
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/profile', {
      method: 'POST',
    });
  }

  // Users endpoints
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories endpoints
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories');
  }

  async getCategoriesHierarchy(): Promise<Category[]> {
    return this.request<Category[]>('/categories/hierarchy');
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return this.request<Category>(`/categories/slug/${slug}`);
  }

  async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    image?: string;
    parentId?: string;
    isActive?: boolean;
  }): Promise<Category> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    icon?: string;
    image?: string;
    parentId?: string;
    isActive?: boolean;
  }): Promise<Category> {
    return this.request<Category>(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string): Promise<void> {
    return this.request<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  async seedCategories(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/categories/seed');
  }

  // Services endpoints
  async getServices(categoryId?: string): Promise<Service[]> {
    const params = categoryId ? `?categoryId=${categoryId}` : '';
    return this.request<Service[]>(`/services${params}`);
  }

  async getFeaturedServices(): Promise<Service[]> {
    return this.request<Service[]>('/services/featured');
  }

  async getPopularServices(): Promise<Service[]> {
    return this.request<Service[]>('/services/popular');
  }

  async getServicesByCategory(slug: string): Promise<Service[]> {
    return this.request<Service[]>(`/services/category/${slug}`);
  }

  async getService(id: string): Promise<Service> {
    return this.request<Service>(`/services/${id}`);
  }

  async createService(data: {
    title: string;
    categoryId: string;
    description: string;
    image: string;
    price: string;
    duration: string;
    features: string[];
    isActive?: boolean;
    sortOrder?: number;
  }): Promise<Service> {
    return this.request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: {
    title?: string;
    categoryId?: string;
    description?: string;
    image?: string;
    price?: string;
    duration?: string;
    features?: string[];
    isActive?: boolean;
    sortOrder?: number;
  }): Promise<Service> {
    return this.request<Service>(`/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  async seedServices(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/services/seed');
  }

  // Bookings endpoints
  async createBooking(data: {
    serviceName: string;
    name: string;
    mobile: string;
    address: string;
    date: string;
    message?: string;
  }): Promise<Booking> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBookings(): Promise<Booking[]> {
    return this.request<Booking[]>('/bookings');
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.request<Booking[]>('/bookings?all=true');
  }

  async getBooking(id: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteBooking(id: string): Promise<void> {
    return this.request<void>(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  // Reviews endpoints
  async getReviews(serviceId?: string): Promise<Review[]> {
    const params = serviceId ? `?serviceId=${serviceId}` : '';
    return this.request<Review[]>(`/reviews${params}`);
  }

  async deleteReview(id: string): Promise<void> {
    return this.request<void>(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact endpoints
  async createContact(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<Contact> {
    return this.request<Contact>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContacts(): Promise<Contact[]> {
    return this.request<Contact[]>('/contact');
  }

  async markContactAsRead(id: string): Promise<Contact> {
    return this.request<Contact>(`/contact/${id}/read`, {
      method: 'PATCH',
    });
  }

  async deleteContact(id: string): Promise<void> {
    return this.request<void>(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<any> {
    return this.request('/dashboard/stats');
  }

  async getDashboardActivity(): Promise<any> {
    return this.request('/dashboard/activity');
  }

  // Search endpoints
  async search(params: {
    query?: string;
    category?: string;
    minRating?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }): Promise<SearchResult> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    
    return this.request<SearchResult>(`/search?${searchParams.toString()}`);
  }

  async getSearchFilters(): Promise<any> {
    return this.request('/search/filters');
  }

  async getSearchSuggestions(query: string): Promise<{ suggestions: string[] }> {
    return this.request(`/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  async getPopularSearches(): Promise<{ popularSearches: string[] }> {
    return this.request('/search/popular');
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL);

// Auth utilities
export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.login({ email, password });
    api.setToken(response.access_token);
    return response;
  },
  
  register: async (data: { email: string; password: string; name: string; phone: string }) => {
    const response = await api.register(data);
    api.setToken(response.access_token);
    return response;
  },
  
  logout: () => {
    api.removeToken();
  },
  
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },
  
  isAuthenticated: () => {
    return !!auth.getToken();
  }
};