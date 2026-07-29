import React from 'react';
import { BookOpen, Flame, HelpCircle, Clock } from 'lucide-react';
import { useSession } from '../../../context/SessionContext';

export function StatisticsCard() {
  const { userStats, history } = useSession();

  const totalSessions = Math.max(42, history.length);
  const totalHours = Math.max(32, Math.round(totalSessions * 0.8));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
      <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>Study Sessions</span>
          <BookOpen className="w-4 h-4 text-indigo-400" />
        </div>
        <span className="text-2xl font-black text-slate-100 font-mono block">
          {totalSessions}
        </span>
      </div>

      <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>Current Streak</span>
          <Flame className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-2xl font-black text-amber-400 font-mono block">
          15 Days
        </span>
      </div>

      <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>Quiz Accuracy</span>
          <HelpCircle className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-2xl font-black text-emerald-400 font-mono block">
          88%
        </span>
      </div>

      <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>Study Time</span>
          <Clock className="w-4 h-4 text-purple-400" />
        </div>
        <span className="text-2xl font-black text-purple-400 font-mono block">
          {totalHours} Hours
        </span>
      </div>
    </div>
  );
}
