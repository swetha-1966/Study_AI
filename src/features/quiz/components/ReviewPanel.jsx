import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export function ReviewPanel({ questionData, userChoice }) {
  if (!questionData) return null;

  const isCorrect = userChoice === questionData.correctAnswer;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-100 font-display">{questionData.question}</h4>
        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
          isCorrect ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>

      <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div>Your Answer: <span className="font-bold text-slate-200">{questionData.options?.[userChoice] || 'None'}</span></div>
        <div>Correct Answer: <span className="font-bold text-emerald-400">{questionData.options?.[questionData.correctAnswer]}</span></div>
        <p className="text-slate-400 pt-1 leading-relaxed border-t border-slate-900 mt-2">{questionData.explanation}</p>
      </div>
    </div>
  );
}
