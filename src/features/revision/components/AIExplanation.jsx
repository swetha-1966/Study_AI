import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export function AIExplanation({ explanationText, memoryTip }) {
  return (
    <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <span>AI Architectural Breakdown</span>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed font-medium">
        {explanationText || 'Detailed concept explanation breaking down the core system behavior.'}
      </p>

      {memoryTip && (
        <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
          <span className="font-bold text-indigo-300 block mb-0.5">Memory Tip:</span>
          <p>{memoryTip}</p>
        </div>
      )}
    </div>
  );
}
