import React from 'react';
import { Play, Download, RefreshCw, Trash2 } from 'lucide-react';

export function QuickActions({ onContinue, onExport, onRegenerate, onDelete }) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-sans">
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
      >
        <Play className="w-3.5 h-3.5 fill-white" />
        <span>Continue Learning</span>
      </button>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
      >
        <Download className="w-3.5 h-3.5 text-emerald-400" />
        <span>Export Notes</span>
      </button>

      <button
        type="button"
        onClick={onRegenerate}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
        <span>Regenerate Session</span>
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 hover:text-white transition-all ml-auto"
          title="Delete Session"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
