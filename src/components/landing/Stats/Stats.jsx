import React from 'react';

export function Stats() {
  const kpis = [
    { value: '10,000+', label: 'Study Sessions' },
    { value: '95%', label: 'Average Accuracy' },
    { value: '6x', label: 'Faster Revision' },
    { value: '50+', label: 'Learning Templates' },
  ];

  return (
    <section className="py-8 max-w-6xl mx-auto px-4 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-mono block">
              {kpi.value}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
