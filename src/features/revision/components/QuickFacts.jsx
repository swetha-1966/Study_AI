import React from 'react';
import { HelpCircle } from 'lucide-react';

export function QuickFacts() {
  const facts = [
    { fact: 'Round Robin prevents process starvation.', importance: 'High Exam Frequency' },
    { fact: 'Virtual Memory relies on Translation Lookaside Buffer (TLB) hardware caching.', importance: 'Core Architecture Metric' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
        <HelpCircle className="w-4 h-4 text-amber-400" />
        <span>Quick Facts & Did You Know</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {facts.map((f, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-xs text-slate-200 font-medium">{f.fact}</p>
            <span className="text-[10px] font-mono font-bold text-amber-400 block">{f.importance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
