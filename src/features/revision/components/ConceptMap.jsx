import React from 'react';
import { GitFork } from 'lucide-react';

export function ConceptMap({ topic = 'Operating Systems' }) {
  const nodes = [
    { title: 'Processes', children: ['PCB', 'State Diagram', 'Context Switch'] },
    { title: 'CPU Scheduling', children: ['FCFS', 'SJF', 'Round Robin', 'Priority'] },
    { title: 'Memory', children: ['Paging', 'Segmentation', 'Virtual Memory', 'TLB'] },
    { title: 'Storage & I/O', children: ['File System', 'Disk Scheduling', 'RAID'] },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
        <GitFork className="w-4 h-4 text-purple-400" />
        <span>Hierarchical Concept Map</span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="text-sm font-extrabold text-indigo-400 font-mono text-center">
          {topic}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {nodes.map((n, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-1">{n.title}</span>
              <ul className="space-y-1 text-[11px] text-slate-400 font-mono">
                {n.children.map((child, i) => (
                  <li key={i}>├─ {child}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
