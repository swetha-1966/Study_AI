import React from 'react';

export function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
