import React from 'react';

export function TopicBreakdown() {
  const topics = [
    { name: 'Operating Systems', accuracy: '92%', status: 'Strong', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { name: 'DBMS', accuracy: '84%', status: 'Good', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { name: 'Machine Learning', accuracy: '74%', status: 'Improving', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'Computer Networks', accuracy: '61%', status: 'Needs Practice', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display">Topic Accuracy Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-mono">
              <th className="pb-2">Topic</th>
              <th className="pb-2">Accuracy</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {topics.map((t, idx) => (
              <tr key={idx}>
                <td className="py-2.5 font-semibold text-slate-100">{t.name}</td>
                <td className="py-2.5 font-mono font-bold text-indigo-400">{t.accuracy}</td>
                <td className="py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.badge}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
