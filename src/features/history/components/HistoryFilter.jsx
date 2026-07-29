import React from 'react';
import { Search } from 'lucide-react';

export function HistoryFilter({ query, onChangeQuery, sort, onChangeSort }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 font-sans">
      <div className="relative flex items-center w-full sm:w-64">
        <Search className="absolute left-3 text-slate-400 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="Search saved decks..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <span className="text-xs text-slate-400 font-semibold">Sort:</span>
        <select
          value={sort}
          onChange={(e) => onChangeSort(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}
