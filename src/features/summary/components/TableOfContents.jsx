import React from 'react';
import { List } from 'lucide-react';

export function TableOfContents({ sections = [], activeIndex = 0, onSelectSection }) {
  const defaultSections = [
    '1. Introduction & Overview',
    '2. Process Management',
    '3. CPU Scheduling Algorithms',
    '4. Deadlocks & Starvation',
    '5. Memory Management & Paging',
    '6. Summary & Key Terms',
  ];

  const items = sections.length > 0 ? sections : defaultSections;

  return (
    <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
        <List className="w-4 h-4 text-indigo-400" />
        <span>Table of Contents</span>
      </div>

      <div className="space-y-1">
        {items.map((sec, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSection(idx)}
              className={`w-full text-left p-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950'
              }`}
            >
              {sec}
            </button>
          );
        })}
      </div>
    </div>
  );
}
