import React from 'react';
import { BookOpen, Calendar, Clock, Target } from 'lucide-react';

export function SessionInfo({ topic = 'Operating Systems', difficulty = 'Medium', studyTime = '18 Minutes', created = 'Today' }) {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Active Study Session</span>
        <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
          In Progress
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-display">
        {topic}
      </h2>

      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 pt-1">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Target className="w-4 h-4 text-indigo-400" />
          Difficulty: {difficulty}
        </span>
        <span className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-4 h-4 text-purple-400" />
          Study Time: {studyTime}
        </span>
        <span className="flex items-center gap-1.5 text-slate-300">
          <Calendar className="w-4 h-4 text-amber-400" />
          Created: {created}
        </span>
      </div>
    </div>
  );
}
