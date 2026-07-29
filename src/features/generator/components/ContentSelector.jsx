import React from 'react';

export function ContentSelector({ contentTypes = {}, onChange, error }) {
  const modules = [
    { id: 'summary', label: '☑ Summary' },
    { id: 'flashcards', label: '☑ Flashcards' },
    { id: 'quiz', label: '☑ Quiz' },
    { id: 'revision', label: '☑ Revision Notes' },
    { id: 'memory_tricks', label: '☑ Memory Tricks' },
    { id: 'interview_questions', label: '☑ Interview Questions' },
  ];

  return (
    <div className="space-y-1.5 font-sans">
      <label className="text-xs font-semibold text-slate-300 block">Include Modules</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {modules.map((m) => {
          const isChecked = Boolean(contentTypes[m.id]);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id, !isChecked)}
              className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                isChecked
                  ? 'bg-indigo-600/10 border-indigo-500/80 text-indigo-200 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>
      {error && <span className="text-[11px] text-red-400 block font-medium">{error}</span>}
    </div>
  );
}
