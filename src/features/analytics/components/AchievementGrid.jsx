import React from 'react';
import { Award, Zap, Flame, Target, Star, CheckCircle2 } from 'lucide-react';

export function AchievementGrid() {
  const badges = [
    { title: 'First Session', icon: Award, unlocked: true },
    { title: 'Quiz Master', icon: Target, unlocked: true },
    { title: 'Flashcard Expert', icon: Star, unlocked: true },
    { title: '7-Day Streak', icon: Flame, unlocked: true },
    { title: 'Perfect Score', icon: Zap, unlocked: true },
    { title: 'Scholar Status', icon: CheckCircle2, unlocked: false },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display">In-App Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-semibold ${
                b.unlocked ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-950/40 border-slate-900 text-slate-600'
              }`}
            >
              <Icon className={`w-4 h-4 ${b.unlocked ? 'text-amber-400' : 'text-slate-600'}`} />
              <span>{b.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
