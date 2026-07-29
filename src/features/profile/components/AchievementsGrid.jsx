import React from 'react';
import { Award } from 'lucide-react';

export function AchievementsGrid() {
  const achievements = [
    { title: 'First Session', icon: '🏅', description: 'Created & completed first AI study deck', unlocked: true },
    { title: 'Quiz Champion', icon: '🏅', description: 'Achieved 90%+ score across 5 consecutive quizzes', unlocked: true },
    { title: 'Flashcard Master', icon: '🏅', description: 'Mastered 100+ flashcards in study mode', unlocked: true },
    { title: '30-Day Streak', icon: '🏅', description: 'Maintained 30 consecutive active study days', unlocked: true },
    { title: 'Consistent Learner', icon: '🏅', description: 'Completed 5 hours of study in a single week', unlocked: true },
    { title: 'AI Explorer', icon: '🏅', description: 'Generated decks across 5 distinct academic topics', unlocked: true },
  ];

  return (
    <div className="space-y-4 font-sans">
      <h3 className="text-base font-bold text-slate-100 font-display flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" />
        Milestones & Achievements
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((ach, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex items-center gap-4">
            <div className="text-3xl">{ach.icon}</div>
            <div>
              <h4 className="text-xs font-bold text-slate-100">{ach.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{ach.description}</p>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-1">
                Unlocked ✓
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
