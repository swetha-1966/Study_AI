import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AIRecommendations() {
  const recs = [
    { title: 'Focus Area: Computer Networks', text: 'Accuracy is 61%. Review TCP Congestion Control and Sliding Window protocol before taking your next quiz.' },
    { title: 'Challenge Mode: Operating Systems', text: 'Accuracy is 92%. Attempt hard difficulty scenario quizzes to stretch your mastery.' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <span>AI Study Coach Recommendations</span>
      </div>

      <div className="space-y-3">
        {recs.map((r, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-indigo-300 block">{r.title}</span>
            <p className="text-xs text-slate-400 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
