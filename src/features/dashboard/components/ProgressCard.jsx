import React from 'react';
import { Progress } from '../../../components/ui/Progress/Progress';

export function ProgressCard({ progress = 32 }) {
  const modules = [
    { label: 'Summary Overview', status: '100% Completed' },
    { label: '3D Flashcards', status: '60% Reviewed' },
    { label: 'Scenario Quiz', status: '20% Attempted' },
    { label: 'Revision Notes', status: '0% Pending' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="space-y-2 text-center sm:text-left">
        <h3 className="text-sm font-bold text-slate-100 font-display">Overall Session Mastery</h3>
        <div className="space-y-1">
          {modules.map((m, i) => (
            <div key={i} className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-slate-300 font-medium">{m.label}:</span>
              <span className="font-mono text-slate-500">{m.status}</span>
            </div>
          ))}
        </div>
      </div>

      <Progress value={progress} total={100} type="circular" />
    </div>
  );
}
