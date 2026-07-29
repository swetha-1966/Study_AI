import React from 'react';
import { User, ShieldCheck, Award, Sparkles, Flame } from 'lucide-react';
import { useSession } from '../../../context/SessionContext';

export function ProfileHeader() {
  const { userStats } = useSession();

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left font-sans relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 border border-white/20 shrink-0">
        <User className="w-10 h-10 text-white" />
      </div>

      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-display">
            Scholar Profile
          </h2>
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Interactive AI Learning Account • Active Member
        </p>

        <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold font-display">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            Level {userStats.level} Scholar
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold font-display">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            {userStats.streak} Day Learning Streak
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {userStats.xp} XP Earned
          </span>
        </div>
      </div>
    </div>
  );
}
