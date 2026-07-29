import React from 'react';
import { Calculator } from 'lucide-react';

export function FormulaSheet({ formulas = [] }) {
  const defaultFormulas = [
    { eq: 'CPU Utilization = (Busy Time / Total Time) × 100%', desc: 'Percentage of time CPU executes processes.' },
    { eq: 'Turnaround Time = Completion Time - Arrival Time', desc: 'Total time spent from submission to completion.' },
    { eq: 'Waiting Time = Turnaround Time - Burst Time', desc: 'Total time spent waiting in ready queue.' },
  ];

  const items = formulas.length > 0 ? formulas : defaultFormulas;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
        <Calculator className="w-4 h-4 text-emerald-400" />
        <span>Formula & Reference Equations</span>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400 block">{item.eq}</span>
            <p className="text-[11px] text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
