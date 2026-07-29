import React from 'react';
import { HelpCircle, RotateCcw } from 'lucide-react';
import { QuizTimer } from './QuizTimer';

export function QuizHeader({ topic = 'Quiz Engine', totalQuestions = 0, formattedTime, isWarning, onReset }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl font-sans">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-100 font-display">{topic}</h2>
          <span className="text-xs text-slate-400 font-mono">{totalQuestions} Multiple-Choice Questions</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <QuizTimer formattedTime={formattedTime} isWarning={isWarning} />
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
