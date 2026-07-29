import React from 'react';
import { Bookmark } from 'lucide-react';

export function BookmarkButton({ isBookmarked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
        isBookmarked
          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
      }`}
    >
      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
      <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Question'}</span>
    </button>
  );
}
