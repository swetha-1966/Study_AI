import React from 'react';

export function QuizPerformanceChart() {
  const data = [
    { quiz: 'Quiz 1', accuracy: 70 },
    { quiz: 'Quiz 2', accuracy: 82 },
    { quiz: 'Quiz 3', accuracy: 90 },
    { quiz: 'Quiz 4', accuracy: 95 },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display">Quiz Accuracy Score Trend</h3>
      <div className="space-y-3 pt-2">
        {data.map((q, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">{q.quiz}</span>
              <span className="font-mono text-emerald-400 font-bold">{q.accuracy}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${q.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
