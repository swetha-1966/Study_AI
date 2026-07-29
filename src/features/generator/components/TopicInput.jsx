import React from 'react';
import { Search, XCircle } from 'lucide-react';

export function TopicInput({ topic, onChange, onClear, error, disabled }) {
  return (
    <div className="space-y-1.5 w-full font-sans">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
        <label htmlFor="topic-input">Study Topic or Lecture Notes</label>
        <span className="font-mono text-[11px] text-slate-500">{topic.length} / 150 chars</span>
      </div>

      <div className="relative flex items-center">
        <Search className="absolute left-3 text-slate-400 w-4 h-4" />
        <input
          id="topic-input"
          type="text"
          value={topic}
          maxLength={150}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter any subject... (e.g. Operating Systems Scheduling, JavaScript Closures)"
          className={`w-full bg-slate-950 border text-slate-100 placeholder-slate-500 rounded-2xl py-3 pl-10 pr-9 text-xs font-medium focus:outline-none transition-all ${
            error ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'
          }`}
        />
        {topic && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-slate-500 hover:text-slate-300"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      {error && <span className="text-[11px] text-red-400 block font-medium">{error}</span>}
    </div>
  );
}
