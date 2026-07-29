import React from 'react';
import { User, ShieldCheck } from 'lucide-react';
import { useSession } from '../../../context/SessionContext';

export function ProfileHeader() {
  const { userStats } = useSession();

  return (
    <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left font-sans">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl">
        VR
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <h2 className="text-2xl font-extrabold text-slate-100 font-display">
            Varshith Rao
          </h2>
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Senior Software Scholar • Member since July 2026
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
            Level {userStats.level} Scholar
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
            {userStats.streak} Day Streak
          </span>
        </div>
      </div>
    </div>
  );
}
