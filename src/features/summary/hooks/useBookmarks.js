import { useState, useCallback } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('summary_bookmarks_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = useCallback((sectionId) => {
    setBookmarks((prev) => {
      const next = prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId];
      localStorage.setItem('summary_bookmarks_v1', JSON.stringify(next));
      return next;
    });
  }, []);

  return { bookmarks, toggleBookmark };
}
