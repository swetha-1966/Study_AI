import React from 'react';

export function DifficultyBadge({ difficulty = 'medium' }) {
  const styles = {
    easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    hard: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[difficulty.toLowerCase()] || styles.medium}`}>
      {difficulty}
    </span>
  );
}
