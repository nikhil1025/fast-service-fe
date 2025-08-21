'use client'

import { useState, useEffect, useRef } from 'react';
import { api, Category } from '@/lib/api';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      // Prevent multiple fetches
      if (hasFetched.current) return;
      
      try {
        setLoading(true);
        hasFetched.current = true;
        const data = await api.getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        hasFetched.current = false; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array

  return { categories, loading, error };
}

export function useCategoriesHierarchy() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      // Prevent multiple fetches
      if (hasFetched.current) return;
      
      try {
        setLoading(true);
        hasFetched.current = true;
        const data = await api.getCategoriesHierarchy();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        hasFetched.current = false; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array

  return { categories, loading, error };
}