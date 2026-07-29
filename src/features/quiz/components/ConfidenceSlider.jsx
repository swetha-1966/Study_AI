import React from 'react';
import { Target } from 'lucide-react';

export function ConfidenceSlider({ confidence = 'Maybe', onChange }) {
  const levels = ['Guess', 'Maybe', 'Confident'];

  return (
    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 font-sans">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          Answer Confidence Rating
        </span>
        <span className="text-indigo-400 font-mono font-bold">{confidence}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {levels.map((lvl) => {
          const isActive = confidence === lvl;
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onChange(lvl)}
              className={`py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          );
        })}
      </div>
    </div>
  );
}
