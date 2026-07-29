import { useState, useEffect } from 'react';
import { fetchAnalyticsData } from '../services/analyticsApi';

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
