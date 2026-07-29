import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export function OptionCard({ optionText, index, isSelected, isAnswered, isCorrect, onClick }) {
  let borderStyle = 'border-slate-800 bg-slate-950/80 hover:border-indigo-500/50 hover:bg-slate-900';
  let badge = null;

  if (isAnswered) {
    if (isCorrect) {
      borderStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200';
      badge = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    } else if (isSelected) {
      borderStyle = 'border-red-500/80 bg-red-950/40 text-red-200';
      badge = <XCircle className="w-4 h-4 text-red-400" />;
    }
  } else if (isSelected) {
    borderStyle = 'border-indigo-500 bg-indigo-950/40 text-indigo-200 ring-2 ring-indigo-500/30';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAnswered}
      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs font-semibold font-sans ${borderStyle}`}
    >
      <div className="flex items-center gap-3">
        <span className="w-6 h-6 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-[11px] font-bold text-slate-300">
          {String.fromCharCode(65 + index)}
        </span>
        <span>{optionText}</span>
      </div>
      {badge}
    </button>
  );
}
