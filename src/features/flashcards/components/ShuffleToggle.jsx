import React from 'react';
import { Shuffle } from 'lucide-react';

export function ShuffleToggle({ isShuffled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
        isShuffled
          ? 'bg-purple-600/20 border-purple-500 text-purple-300'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
      }`}
    >
      <Shuffle className="w-3.5 h-3.5" />
      <span>{isShuffled ? 'Shuffled' : 'Shuffle Order'}</span>
    </button>
  );
}
