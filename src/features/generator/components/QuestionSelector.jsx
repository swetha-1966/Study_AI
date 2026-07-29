import React from 'react';

export function QuestionSelector({ quizCount = 5, onChange }) {
  const options = [5, 10, 15, 20];

  return (
    <div className="space-y-1.5 font-sans">
      <label className="text-xs font-semibold text-slate-300 block">Quiz Questions Count</label>
      <div className="grid grid-cols-4 gap-2">
        {options.map((count) => {
          const isActive = Number(quizCount) === count;
          return (
            <button
              key={count}
              type="button"
              onClick={() => onChange(count)}
              className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {count} Qs
            </button>
          );
        })}
      </div>
    </div>
  );
}
