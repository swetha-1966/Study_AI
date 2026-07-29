import React from 'react';
import { History, Star, Archive, CheckCircle2 } from 'lucide-react';

export function HistoryHeader({ total = 28, completed = 19, favorites = 8, archived = 4 }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 font-display">Study Session Workspace</h2>
          <span className="text-xs text-slate-400 font-mono">Manage, search, organize, & load previous sessions</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Sessions</span>
          <span className="text-lg font-bold font-mono text-slate-100">{total}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
          <span className="text-lg font-bold font-mono text-emerald-400">{completed}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Favorites</span>
          <span className="text-lg font-bold font-mono text-amber-400">{favorites}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Archived</span>
          <span className="text-lg font-bold font-mono text-purple-400">{archived}</span>
        </div>
      </div>
    </div>
  );
}
