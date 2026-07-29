import React from 'react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    { name: 'Computer Science Student', role: 'College Scholar', text: 'StudyForge helped me prepare for my Operating Systems and Database exams in half the time.' },
    { name: 'Frontend Engineer', role: 'Interview Candidate', text: 'The scenario-based quizzes and 3D flashcards made reviewing JavaScript closures and system design effortless.' },
    { name: 'University Lecturer', role: 'Computer Science Professor', text: 'The structured schema validation ensures that students receive clean, non-repetitive educational summaries.' },
  ];

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 space-y-8 font-sans">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 font-display">
          What Scholars Are Saying
        </h2>
        <p className="text-sm text-slate-400">Sample testimonials from students, software engineers, and educators.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">"{rev.text}"</p>
            <div>
              <h4 className="text-xs font-bold text-slate-100">{rev.name}</h4>
              <span className="text-[10px] text-slate-400 font-mono">{rev.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
