import React from 'react';
import { BookOpen, Clock, Target, Layers } from 'lucide-react';

export function OverviewCards() {
  const kpis = [
    { title: 'Study Sessions', value: '25', icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { title: 'Study Time', value: '18 Hours', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Quiz Accuracy', value: '84%', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Flashcards Mastered', value: '420', icon: Layers, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <div className={`w-10 h-10 rounded-2xl ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{kpi.title}</span>
              <span className={`text-2xl font-extrabold font-mono mt-0.5 block ${kpi.color}`}>{kpi.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
