import React from 'react';

export function Skeleton({ type = 'card', count = 1, className = '' }) {
  const base = 'bg-slate-800/60 animate-pulse rounded-2xl';

  if (type === 'card') {
    return (
      <div className={`p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 ${className}`}>
        <div className={`h-6 w-1/3 ${base}`} />
        <div className={`h-4 w-full ${base}`} />
        <div className={`h-4 w-2/3 ${base}`} />
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`h-12 w-full ${base}`} />
        ))}
      </div>
    );
  }

  return <div className={`h-24 w-full ${base} ${className}`} />;
}
