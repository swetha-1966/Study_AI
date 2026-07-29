import React from 'react';
import { Target } from 'lucide-react';

export function GoalSummary() {
  const currentHours = 3.9;
  const targetHours = 5.0;
  const progress = Math.min(100, Math.round((currentHours / targetHours) * 100));

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-100 font-display flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          Weekly Study Goal
        </h3>
        <span className="text-xs font-mono font-bold text-indigo-400">
          {currentHours} / {targetHours} Hours
        </span>
      </div>

      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-[11px] text-slate-400">
        You are 1.1 hours away from completing your weekly goal! Keep up the momentum.
      </p>
    </div>
  );
}
