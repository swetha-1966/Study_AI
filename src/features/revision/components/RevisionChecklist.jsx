import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';

export function RevisionChecklist() {
  const [checked, setChecked] = useState({
    'Processes & Threads': true,
    'CPU Scheduling': true,
    'Deadlocks & Synchronization': false,
    'Memory Paging & Segmentation': false,
    'Virtual Memory Management': false,
  });

  const toggleCheck = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
        <CheckSquare className="w-4 h-4 text-indigo-400" />
        <span>Exam Topics Revision Checklist</span>
      </div>

      <div className="space-y-2">
        {Object.keys(checked).map((key) => {
          const isDone = checked[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleCheck(key)}
              className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                isDone ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-200 line-through' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <span>{key}</span>
              <span className="font-mono text-[10px] text-slate-500">{isDone ? '✓ Reviewed' : 'Pending'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
