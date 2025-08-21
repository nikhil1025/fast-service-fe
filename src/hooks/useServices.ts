'use client'

import { useState, useEffect, useRef } from 'react';
import { api, Service } from '@/lib/api';

export function useServices(categoryId?: string) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      // Create a unique key for this fetch
      const fetchKey = categoryId || 'all';
      
      // Prevent multiple fetches for the same categoryId
      if (hasFetched.current === fetchKey) return;
      
      try {
        setLoading(true);
        hasFetched.current = fetchKey;
        const data = await api.getServices(categoryId);
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
        hasFetched.current = null; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]); // Only depend on categoryId

  const refetch = async () => {
    hasFetched.current = null; // Reset to allow refetch
    const fetchKey = categoryId || 'all';
    
    try {
      setLoading(true);
      hasFetched.current = fetchKey;
      const data = await api.getServices(categoryId);
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
      hasFetched.current = null;
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, error, refetch };
}

export function useFeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchServices = async () => {
      // Prevent multiple fetches
      if (hasFetched.current) return;
      
      try {
        setLoading(true);
        hasFetched.current = true;
        const data = await api.getFeaturedServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured services');
        hasFetched.current = false; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // Empty dependency array

  return { services, loading, error };
}

export function useService(id: string) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      // Prevent multiple fetches for the same ID
      if (hasFetched.current === id) return;
      
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        hasFetched.current = id;
        const data = await api.getService(id);
        setService(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch service');
        hasFetched.current = null; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]); // Only depend on id

  return { service, loading, error };
}