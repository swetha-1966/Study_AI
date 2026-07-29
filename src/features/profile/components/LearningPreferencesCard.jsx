import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

export function LearningPreferencesCard() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        Personal Learning Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Most Studied</span>
          <span className="text-xs font-bold text-indigo-400 block">Operating Systems Scheduling</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Strongest Topic</span>
          <span className="text-xs font-bold text-emerald-400 block">JavaScript Closures & Scope</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Improvement</span>
          <span className="text-xs font-bold text-amber-400 block">Database Indexing & Sharding</span>
        </div>
      </div>
    </div>
  );
}
