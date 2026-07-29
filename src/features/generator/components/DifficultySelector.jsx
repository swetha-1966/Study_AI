import React from 'react';
import { Target } from 'lucide-react';

export function DifficultySelector({ difficulty = 'medium', onChange }) {
  const options = [
    { id: 'easy', label: 'Easy', detail: 'Foundational Concepts' },
    { id: 'medium', label: 'Medium', detail: 'Core Architecture' },
    { id: 'hard', label: 'Hard', detail: 'Advanced Analysis' },
  ];

  return (
    <div className="space-y-2 font-sans">
      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-display">
        <Target className="w-3.5 h-3.5 text-indigo-400" />
        Target Complexity Level
      </label>
      <div className="grid grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const isActive = difficulty.toLowerCase() === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-600/10'
                  : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className="block text-xs font-bold font-display">{opt.label}</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">{opt.detail}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
