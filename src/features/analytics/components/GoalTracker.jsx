import React from 'react';
import { Target } from 'lucide-react';

export function GoalTracker() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
          <Target className="w-4 h-4 text-indigo-400" />
          <span>Weekly Learning Goal</span>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-400">3.8 / 5.0 Hours</span>
      </div>

      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[76%]" />
      </div>
    </div>
  );
}
