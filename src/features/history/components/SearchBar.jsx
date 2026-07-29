import React from 'react';
import { Search, XCircle } from 'lucide-react';

export function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative flex items-center w-full font-sans">
      <Search className="absolute left-3 text-slate-400 w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search sessions by topic, notes, or tags..."
        className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-2.5 pl-10 pr-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 text-slate-500 hover:text-slate-300"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
