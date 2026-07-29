import React from 'react';
import { Sparkles, XCircle, FileText } from 'lucide-react';

export function TopicInput({ topic, onChange, onClear, error, disabled }) {
  return (
    <div className="space-y-2 w-full font-sans">
      <div className="flex justify-between items-center text-xs font-bold text-slate-300">
        <label htmlFor="topic-input" className="flex items-center gap-1.5 font-display text-slate-200">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          Study Topic or Lecture Notes
        </label>
        <span className="font-mono text-[11px] text-slate-400">{topic.length} / 300 chars</span>
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-indigo-400 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <textarea
          id="topic-input"
          value={topic}
          maxLength={300}
          rows={3}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste lecture notes or enter any topic... (e.g. Quantum Computing Principles, Organic Chemistry Reactions, React 19 Hooks)"
          className={`w-full bg-slate-950/90 border text-slate-100 placeholder-slate-500 rounded-2xl py-3.5 pl-10 pr-9 text-xs sm:text-sm font-medium focus:outline-none transition-all resize-none ${
            error
              ? 'border-red-500/80 focus:border-red-500 shadow-lg shadow-red-500/10'
              : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 shadow-inner'
          }`}
        />
        {topic && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-3.5 right-3 text-slate-500 hover:text-slate-300 transition-colors"
            title="Clear text"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      {error && <span className="text-[11px] text-red-400 block font-semibold">{error}</span>}
    </div>
  );
}
