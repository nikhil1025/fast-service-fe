'use client'

import React, { useMemo } from 'react';
import { 
  Sparkles, 
  Car, 
  Warehouse, 
  Scissors, 
  Bug, 
  Wrench, 
  Brush, 
  Shirt,
  ArrowRight 
} from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Sparkles,
  Car,
  Warehouse,
  Scissors,
  Bug,
  Wrench,
  Brush,
  Shirt,
};

const CategoriesSection: React.FC = () => {
  const { categories, loading } = useCategories();

  const handleCategoryClick = (categorySlug: string) => {
    window.location.href = `/services/category/${categorySlug}`;
  };

  // Memoize the parent categories to prevent unnecessary re-renders
  const parentCategories = useMemo(() => 
    categories.filter(cat => !cat.parentId), 
    [categories]
  );

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Browse By Category
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/80 p-4 rounded-lg border border-gray-100 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Browse By Category
          </h2>
          <a 
            href="/categories" 
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200"
          >
            View All
            <ArrowRight size={18} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {parentCategories.map((category) => {
            const IconComponent = iconMap[category.icon || 'Sparkles'] || Sparkles;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className="group flex items-center p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-primary/20 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <IconComponent 
                  size={24} 
                  className="text-primary group-hover:scale-110 transition-transform duration-300" 
                />
                <span className="text-gray-800 font-medium ml-3">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;