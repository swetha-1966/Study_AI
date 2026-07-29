import { QueryClient } from '@tanstack/react-query';

/**
 * queryClient — shared TanStack Query client instance.
 * Centralised here so AppProviders and any testing utilities can import the same instance.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Don't refetch when user returns to tab */
      refetchOnWindowFocus: false,
      /** Only retry once on network failure */
      retry: 1,
      /** Cache data for 5 minutes */
      staleTime: 5 * 60 * 1000,
      /** Keep unused data in cache for 10 minutes */
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      /** Don't retry failed mutations by default */
      retry: 0,
    },
  },
});
