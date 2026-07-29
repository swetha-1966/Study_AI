import React from 'react';
import { Star } from 'lucide-react';

export function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-1.5 rounded-xl transition-all ${
        isFavorite
          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200'
      }`}
      title={isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
    >
      <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
    </button>
  );
}
