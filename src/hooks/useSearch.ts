'use client'

import { useState, useCallback } from 'react';
import { api, SearchResult } from '@/lib/api';

export function useSearch() {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: {
    query?: string;
    category?: string;
    minRating?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.search(params);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}

export function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const data = await api.getSearchSuggestions(query);
      setSuggestions(data.suggestions);
    } catch (err) {
      console.error('Failed to get suggestions:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { suggestions, loading, getSuggestions };
}