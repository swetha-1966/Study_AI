import { useEffect, useRef, useCallback } from 'react';

/**
 * useInfiniteScroll — Triggers a callback when the user scrolls near the bottom of a container.
 * @param {Function} onLoadMore - Callback to load more items
 * @param {{ threshold?: number, hasMore?: boolean, loading?: boolean }} options
 * @returns {React.RefObject} - Attach this ref to the container element
 */
export function useInfiniteScroll(onLoadMore, { threshold = 200, hasMore = true, loading = false } = {}) {
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < threshold) {
      onLoadMore();
    }
  }, [loading, hasMore, threshold, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return containerRef;
}
