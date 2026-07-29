import React from 'react';

export function DifficultySelector({ difficulty = 'medium', onChange }) {
  const options = [
    { id: 'easy', label: 'Easy (Foundational)' },
    { id: 'medium', label: 'Medium (Architecture)' },
    { id: 'hard', label: 'Hard (Advanced)' },
  ];

  return (
    <div className="space-y-1.5 font-sans">
      <label className="text-xs font-semibold text-slate-300 block">Difficulty</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isActive = difficulty.toLowerCase() === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
