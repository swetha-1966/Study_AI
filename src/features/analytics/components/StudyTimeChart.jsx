import React from 'react';

export function StudyTimeChart() {
  const data = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 2.0 },
    { day: 'Sun', hours: 4.0 },
  ];

  const maxHours = 5;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display">Weekly Study Time (Hours)</h3>
      <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
        {data.map((d, idx) => {
          const heightPercent = Math.round((d.hours / maxHours) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-mono font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.hours}h
              </span>
              <div className="w-full bg-slate-950 rounded-xl overflow-hidden h-32 flex items-end p-0.5 border border-slate-800">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-lg transition-all duration-500"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
