import { useState, useCallback } from 'react';
import { searchHalalShops, getCurrentLocation, type PlaceResult, type SearchResponse } from '@/lib/api';

interface UseHalalSearchReturn {
  results: PlaceResult[];
  loading: boolean;
  error: string | null;
  searchByAddress: (address: string) => Promise<void>;
  searchByCurrentLocation: () => Promise<void>;
}

export function useHalalSearch(): UseHalalSearchReturn {
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchResponse = (response: SearchResponse) => {
    if (response.status === 'success') {
      setResults(response.results);
      setError(null);
    } else {
      setResults([]);
      setError(response.message || 'An error occurred while searching');
    }
  };

  const searchByAddress = useCallback(async (address: string) => {
    if (!address.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchHalalShops(address);
      handleSearchResponse(response);
    } catch (err) {
      setResults([]);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const location = await getCurrentLocation();
      const response = await searchHalalShops(location);
      handleSearchResponse(response);
    } catch (err) {
      setResults([]);
      setError(
        err instanceof Error
          ? err.message
          : 'Could not access your location. Please check your browser permissions.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    searchByAddress,
    searchByCurrentLocation,
  };
}
