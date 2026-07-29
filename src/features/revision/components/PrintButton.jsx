import React from 'react';
import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
    >
      <Printer className="w-3.5 h-3.5 text-indigo-400" />
      <span>Print A4</span>
    </button>
  );
}
