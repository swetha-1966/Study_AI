import React from 'react';
import { Award, RotateCcw, RefreshCw, Download, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuizResult({ scoreResults, onRestartFull, onRetestWrong }) {
  const { correctCount, wrongCount, total, percentage, wrongQuestions } = scoreResults;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-8 font-sans"
    >
      {/* Trophy & Percentage Circle */}
      <div className="relative inline-flex items-center justify-center">
        <div className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center border shadow-xl ${
          percentage >= 70
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
        }`}>
          <Award className="w-8 h-8 mb-1" />
          <span className="text-xl font-extrabold font-mono">{percentage}%</span>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold text-slate-100 font-display">
          Quiz Completed!
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {percentage >= 80
            ? 'Outstanding mastery! You answered most questions correctly.'
            : 'Good effort! Review the missed concepts in revision mode.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Correct</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{correctCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Incorrect</span>
          <span className="text-2xl font-bold font-mono text-red-400 mt-1 block">{wrongCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total</span>
          <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">{total}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {wrongQuestions.length > 0 && (
          <button
            type="button"
            onClick={onRetestWrong}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-amber-100 bg-amber-600 hover:bg-amber-500 shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retest Missed Questions ({wrongQuestions.length})</span>
          </button>
        )}

        <button
          type="button"
          onClick={onRestartFull}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Full Quiz</span>
        </button>
      </div>
    </motion.div>
  );
}
