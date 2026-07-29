import React from 'react';
import { Flame } from 'lucide-react';

export function LearningStreak() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Active Learning Streak</span>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400">12 Days</span>
      </div>

      <p className="text-xs text-slate-400">Longest Streak: 28 Days. Keep studying daily to maintain your momentum!</p>
    </div>
  );
}
