import React from 'react';

export function CardCounter({ current = 1, total = 10 }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-1 font-sans">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
        <span>Progress ({current} of {total})</span>
        <span className="font-mono text-purple-400 font-bold">{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
