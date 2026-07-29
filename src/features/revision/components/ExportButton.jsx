import React from 'react';
import { Download } from 'lucide-react';
import { exportToPDF } from '../../../utils/exportPDF';

export function ExportButton({ topic = 'Study Material' }) {
  return (
    <button
      type="button"
      onClick={() => exportToPDF({ summary: { overview: 'One page notes and exam cheat sheet.' } }, topic)}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 transition-all"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Export Notes</span>
    </button>
  );
}
