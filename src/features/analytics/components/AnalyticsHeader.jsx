import React from 'react';
import { BarChart2 } from 'lucide-react';

export function AnalyticsHeader({ timeRange = '7d', onChangeTimeRange }) {
  const ranges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <BarChart2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 font-display">Learning Analytics & Insights</h2>
          <span className="text-xs text-slate-400 font-mono">Performance metrics, study trends, & AI recommendations</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
        {ranges.map((r) => {
          const isActive = timeRange === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onChangeTimeRange(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
