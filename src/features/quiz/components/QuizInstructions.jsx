import React from 'react';
import { HelpCircle, Clock, ShieldCheck, Play } from 'lucide-react';

export function QuizInstructions({ totalQuestions = 5, onStart }) {
  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 max-w-xl mx-auto text-center font-sans">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
        <HelpCircle className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-slate-100 font-display">
          Quiz Assessment Instructions
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Test your topic comprehension with scenario-based multiple choice questions. Answers auto-save immediately.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Questions</span>
          <span className="text-sm font-extrabold text-slate-100 font-mono">{totalQuestions} Multiple Choice</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time Limit</span>
          <span className="text-sm font-extrabold text-indigo-400 font-mono">10 Minutes (Timed)</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
      >
        <Play className="w-4 h-4 fill-white" />
        <span>Begin Quiz Assessment</span>
      </button>
    </div>
  );
}
