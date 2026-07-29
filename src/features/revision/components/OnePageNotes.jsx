import React from 'react';
import { BookOpen, CheckCircle2, Zap } from 'lucide-react';

export function OnePageNotes({ topic = 'Operating Systems' }) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 font-sans">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">One-Page Revision Sheet</span>
        <h3 className="text-lg font-bold text-slate-100 font-display">{topic} Quick Summary</h3>
      </div>

      <div className="space-y-4">
        {/* Definition Section */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-indigo-400 block">Core Definition</span>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            System software that acts as an intermediary between users and computer hardware, managing CPU execution, memory allocation, and I/O devices.
          </p>
        </div>

        {/* Functions Section */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-purple-400 block">Core Functions & Subsystems</span>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Process Management</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Memory Management</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CPU Scheduling</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> File System Allocation</div>
          </div>
        </div>

        {/* Exam Tips */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 space-y-1">
          <span className="font-bold text-amber-300 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Exam Preparation Tips
          </span>
          <ul className="list-disc list-inside space-y-1 text-amber-200/90">
            <li>Always state Process Control Block (PCB) attributes during process management questions.</li>
            <li>Distinguish preemptive vs non-preemptive algorithms with Gantt chart examples.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
