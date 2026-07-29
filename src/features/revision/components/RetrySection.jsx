import React from 'react';
import { RefreshCw } from 'lucide-react';

export function RetrySection({ count = 0, onRetry }) {
  if (count === 0) return null;

  return (
    <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-4 font-sans">
      <div>
        <h4 className="text-sm font-bold text-amber-300 font-display">Targeted Retest Available</h4>
        <p className="text-xs text-amber-200/80 mt-0.5">Practice only your {count} missed questions to solidify retention.</p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-amber-950 bg-amber-400 hover:bg-amber-300 shadow-lg transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Retest Missed ({count})</span>
      </button>
    </div>
  );
}
