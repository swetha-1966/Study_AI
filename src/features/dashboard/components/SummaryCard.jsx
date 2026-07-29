import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export function SummaryCard({ onClick }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 font-sans hover:border-indigo-500/40 transition-all">
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">5 min read</span>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-100 font-display">Executive Summary</h3>
        <p className="text-xs text-slate-400 mt-1">12 Key Architectural Takeaways & Multi-Paragraph Breakdown.</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <span>Open Summary</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
