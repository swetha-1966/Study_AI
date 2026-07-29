import React from 'react';
import { History } from 'lucide-react';

export function RecentTopics({ topics = [], onSelectTopic }) {
  const defaultTopics = [
    'Operating Systems',
    'React',
    'Machine Learning',
    'DBMS',
    'Computer Networks',
  ];

  const displayTopics = topics.length > 0 ? topics : defaultTopics;

  return (
    <div className="space-y-2 pt-2 font-sans">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        <History className="w-3.5 h-3.5 text-indigo-400" />
        <span>Recent Topics</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {displayTopics.slice(0, 5).map((topic, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectTopic(topic)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-all"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
