import React from 'react';
import { Clock } from 'lucide-react';

export function QuizTimer({ formattedTime, isWarning }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
      isWarning ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      <Clock className="w-3.5 h-3.5" />
      <span>{formattedTime}</span>
    </div>
  );
}
