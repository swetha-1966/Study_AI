import React from 'react';
import { Eye } from 'lucide-react';

export function FocusRevision({ topic = 'Operating Systems' }) {
  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 max-w-3xl mx-auto font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
          <Eye className="w-4 h-4" />
          <span>Focus Mode — Essential Exam Notes Only</span>
        </div>
        <span className="text-xs font-mono text-slate-500">{topic}</span>
      </div>

      <p className="text-sm text-slate-200 leading-relaxed">
        Focus strictly on process synchronization (Mutex vs Semaphore), CPU scheduling metrics, and page replacement algorithms for your exam.
      </p>
    </div>
  );
}
