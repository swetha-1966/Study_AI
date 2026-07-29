import React from 'react';
import { Trash2, Archive, Download, Star } from 'lucide-react';

export function BulkToolbar({ selectedCount = 0, onDelete, onArchive, onExport }) {
  if (selectedCount === 0) return null;

  return (
    <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-between gap-4 font-sans text-xs">
      <span className="font-semibold text-indigo-200">{selectedCount} sessions selected</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="p-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
          title="Export Selected"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onArchive}
          className="p-1.5 rounded-xl bg-slate-900 text-purple-400 border border-slate-700"
          title="Archive Selected"
        >
          <Archive className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-xl bg-red-950 text-red-400 border border-red-500/30"
          title="Delete Selected"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
