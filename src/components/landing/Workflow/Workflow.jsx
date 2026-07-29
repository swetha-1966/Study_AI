import React from 'react';
import { BookOpen, Brain, Layers, Target, CheckCircle2 } from 'lucide-react';

export function Workflow() {
  const steps = [
    { number: '01', title: 'Enter Topic', desc: 'Paste lecture notes, textbook text, or type any subject.' },
    { number: '02', title: 'AI Processing', desc: 'Google Gemini engine constructs structured educational schema.' },
    { number: '03', title: 'Executive Summary', desc: 'Read multi-paragraph breakdown and core principles.' },
    { number: '04', title: '3D Flashcards', desc: 'Practice active recall with flip animation & speech synthesis.' },
    { number: '05', title: 'Scenario Quiz', desc: 'Test retention with multiple choice questions & explanations.' },
    { number: '06', title: 'Track Progress', desc: 'Save session to history, earn XP points, and track streak.' },
  ];

  return (
    <section id="workflow" className="py-12 max-w-6xl mx-auto px-4 space-y-8 font-sans">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 font-display">
          How StudyForge Works
        </h2>
        <p className="text-sm text-slate-400">Simple 6-step workflow from raw text to complete topic mastery.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2 relative">
            <span className="text-xs font-mono font-bold text-indigo-400 block">{step.number}</span>
            <h3 className="text-base font-bold text-slate-100 font-display">{step.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
