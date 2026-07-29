import { useState, useMemo } from 'react';

/**
 * usePagination — Paginate any array of items.
 * @template T
 * @param {T[]} items - The full array to paginate
 * @param {number} [pageSize=10] - Items per page
 * @returns {{ currentPage: number, totalPages: number, paginatedItems: T[], goTo: Function, next: Function, prev: Function, hasNext: boolean, hasPrev: boolean }}
 */
export function usePagination(items = [], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goTo = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  const next = () => goTo(currentPage + 1);
  const prev = () => goTo(currentPage - 1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goTo,
    next,
    prev,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    totalItems: items.length,
    pageSize,
  };
}
