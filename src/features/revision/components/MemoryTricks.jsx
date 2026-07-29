import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

export function MemoryTricks() {
  const tricks = [
    { title: 'Scheduling Acronym', mnemonic: 'FCFS — First Come First Served', tip: 'Sequential execution queue without preemption.' },
    { title: 'OSI 7-Layer Model', mnemonic: 'Please Do Not Throw Sausage Pizza Away', tip: 'Physical, Data Link, Network, Transport, Session, Presentation, Application.' },
    { title: 'Deadlock Conditions (COFF)', mnemonic: 'Circular Wait, One Mutual Exclusion, Hold & Wait, Free No Preemption', tip: 'Four necessary conditions for a system deadlock.' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-100 font-display">
          <Lightbulb className="w-4 h-4 text-pink-400" />
          <span>AI-Generated Memory Tricks & Mnemonics</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-mono border border-pink-500/20">
          ✨ AI Generated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tricks.map((t, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.title}</span>
            <div className="text-xs font-bold text-pink-300 font-mono">{t.mnemonic}</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{t.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
