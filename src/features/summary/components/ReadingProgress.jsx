import React from 'react';

export function ReadingProgress({ progress = 42 }) {
  return (
    <div className="w-full space-y-1 font-sans">
      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
        <span>Reading Progress</span>
        <span className="font-mono text-indigo-400">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
