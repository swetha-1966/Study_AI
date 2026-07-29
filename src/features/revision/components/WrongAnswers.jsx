import React from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

export function WrongAnswers({ questions = [] }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400 font-sans">
        No incorrect questions in revision queue. Great job!
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans">
      <h3 className="text-base font-bold text-slate-100 font-display flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-amber-400" />
        Missed Questions Review Queue ({questions.length})
      </h3>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-slate-100 font-display">{q.question}</h4>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Correct Option: {q.options?.[q.correctAnswer] || 'Option A'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{q.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
