import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export function MemoryCard({ onClick }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 font-sans hover:border-pink-500/40 transition-all">
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
          <Lightbulb className="w-5 h-5" />
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-mono font-bold">15 Tricks</span>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-100 font-display">Memory Tricks & Mnemonics</h3>
        <p className="text-xs text-slate-400 mt-1">Creative acronyms & mental models to retain key ideas.</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
      >
        <span>View Mnemonics</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
