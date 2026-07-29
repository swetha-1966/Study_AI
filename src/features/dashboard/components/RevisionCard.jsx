import React from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';

export function RevisionCard({ onClick }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 font-sans hover:border-amber-500/40 transition-all">
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <RotateCcw className="w-5 h-5" />
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold">4 Pages</span>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-100 font-display">Revision Notes</h3>
        <p className="text-xs text-slate-400 mt-1">Targeted review sheets focusing on weak concepts.</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
      >
        <span>Open Revision Queue</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
