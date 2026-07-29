import React from 'react';

export function Progress({ value = 0, total = 100, type = 'linear', className = '' }) {
  const percent = Math.min(100, Math.max(0, Math.round((value / total) * 100)));

  if (type === 'circular') {
    const strokeDashoffset = 100 - percent;
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
          <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="text-indigo-500 transition-all duration-500" strokeDasharray="100, 100" strokeDashoffset={strokeDashoffset} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <span className="absolute text-xs font-mono font-bold text-slate-100">{percent}%</span>
      </div>
    );
  }

  return (
    <div className={`w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 ${className}`}>
      <div
        className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-400"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
