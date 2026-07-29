import React from 'react';
import { RotateCcw } from 'lucide-react';

export function ReviewLaterButton({ isReviewLater, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
        isReviewLater
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
      }`}
    >
      <RotateCcw className="w-3.5 h-3.5" />
      <span>{isReviewLater ? 'Marked Review Later' : 'Review Later'}</span>
    </button>
  );
}
