import React from 'react';
import { Award, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function CompletionDialog({ totalCards = 4, knownCount = 3, reviewCount = 1, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6 font-sans"
    >
      <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto shadow-xl">
        <Award className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-2xl font-extrabold text-slate-100 font-display">
          🎉 Flashcard Deck Completed!
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          You reviewed all {totalCards} flashcards in this study session.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Known</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{knownCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Review</span>
          <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">{reviewCount}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Review Deck Again</span>
        </button>
      </div>
    </motion.div>
  );
}
