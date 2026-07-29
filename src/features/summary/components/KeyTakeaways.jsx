import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

export function KeyTakeaways({ takeaways = [] }) {
  const defaultTakeaways = [
    'Preemptive vs Non-Preemptive Scheduling: Preemptive algorithms (Round Robin, SRTF) dynamically interrupt processes; Non-preemptive algorithms (FCFS, SJF) run processes until completion or I/O yield.',
    'Scheduling Metrics: Key performance indicators include Throughput (jobs per unit time), Turnaround Time (Completion - Arrival), Waiting Time (Turnaround - Burst), and Response Time.',
    'Starvation & Aging: Starvation occurs when low-priority processes wait indefinitely. Aging progressively increases a process priority over time to guarantee execution.',
    'Multi-Level Feedback Queues (MLFQ): Advanced scheduling that dynamically adjusts process priority based on CPU burst history and I/O behavior.',
  ];

  const items = takeaways.length > 0 ? takeaways : defaultTakeaways;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        Executive Key Takeaways & Core Principles
      </h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
