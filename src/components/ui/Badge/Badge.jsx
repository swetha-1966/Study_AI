import React from 'react';

export function Badge({ variant = 'neutral', children, className = '' }) {
  const styles = {
    ai: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    premium: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[variant] || styles.neutral} ${className}`}>
      {children}
    </span>
  );
}
