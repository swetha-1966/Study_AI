import React from 'react';
import { RotateCcw, Download, Printer } from 'lucide-react';
import { exportToPDF } from '../../../utils/exportPDF';

export function RevisionHeader({ topic = 'Operating Systems', difficulty = 'Medium' }) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4 font-sans print:hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-display">
              {topic} — Exam Revision Hub
            </h2>
            <span className="text-xs text-slate-400 font-mono">Difficulty: {difficulty} • 8 Minutes Read</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-400" />
            <span>Print A4</span>
          </button>

          <button
            type="button"
            onClick={() => exportToPDF({ summary: { overview: 'One page notes and exam cheat sheet.' } }, topic)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
