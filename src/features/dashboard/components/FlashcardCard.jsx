import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export function FlashcardCard({ cardCount = 4, onClick }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 font-sans hover:border-purple-500/40 transition-all">
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Layers className="w-5 h-5" />
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono font-bold">{cardCount} Cards</span>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-100 font-display">3D Flashcards</h3>
        <p className="text-xs text-slate-400 mt-1">Active recall with 3D flip animation & speech synthesis.</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
      >
        <span>Start Flashcards</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
