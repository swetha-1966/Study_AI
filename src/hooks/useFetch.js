import { useState, useCallback } from 'react';
import { axiosInstance } from '../config/axios';
import { logger } from '../lib/logger';

const MODULE = 'useFetch';

/**
 * useFetch — Generic data fetching hook with loading and error states.
 * For cached server state, prefer useQuery from TanStack Query instead.
 *
 * @param {string} [initialUrl] - Optional initial URL to fetch on mount
 * @returns {{ data: any, loading: boolean, error: string|null, fetch: Function, reset: Function }}
 */
export function useFetch(initialUrl = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { method = 'GET', body, params } = options;
      let response;

      if (method === 'GET') {
        response = await axiosInstance.get(url, { params });
      } else if (method === 'POST') {
        response = await axiosInstance.post(url, body);
      } else if (method === 'PUT') {
        response = await axiosInstance.put(url, body);
      } else if (method === 'DELETE') {
        response = await axiosInstance.delete(url);
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.message || 'Failed to fetch data';
      logger.error(MODULE, `Fetch failed for ${url}:`, message);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetch: fetchData, reset };
}
