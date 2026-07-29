import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function Showcase() {
  const items = [
    'Executive Summary & Principles',
    '3D Interactive Flashcards',
    'Scenario-Based Quizzes',
    'Targeted Revision Queue',
    'Senior Interview Questions',
    'Memory Tricks & Mnemonics',
  ];

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 font-sans">
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
            Built for Students, Engineers & Interview Candidates
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            StudyForge AI replaces fragmented studying with a single, cohesive learning dashboard. All output is structured cleanly into valid schema modules.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-indigo-400 font-bold">// AI Output JSON Schema Verified</div>
          <div className="text-slate-400">
            {`{
  "summary": { "overview": "...", "keyTakeaways": [...] },
  "flashcards": [{ "id": 1, "question": "...", "answer": "..." }],
  "quiz": [{ "id": 1, "question": "...", "options": [...] }]
}`}
          </div>
        </div>
      </div>
    </section>
  );
}
