import React from 'react';
import { BookOpen, Search, BarChart2, HelpCircle, Layers, Bookmark } from 'lucide-react';

export function EmptyState({ variant = 'history', title, description, action }) {
  const icons = {
    history: BookOpen,
    search: Search,
    analytics: BarChart2,
    quiz: HelpCircle,
    flashcards: Layers,
    bookmarks: Bookmark,
  };

  const Icon = icons[variant] || BookOpen;

  return (
    <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3 font-sans">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-100 font-display">
        {title || 'No Items Found'}
      </h3>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
        {description || 'There is no data to display right now.'}
      </p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
