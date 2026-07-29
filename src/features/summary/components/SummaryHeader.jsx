import React from 'react';
import { BookOpen } from 'lucide-react';
import { TextToSpeech } from './TextToSpeech';
import { ReadingProgress } from './ReadingProgress';

export function SummaryHeader({ topic = 'Executive Topic Overview', overview = '' }) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-display">
              {topic}
            </h2>
            <span className="text-xs text-slate-400 font-mono">5 min read • Academic Overview</span>
          </div>
        </div>

        <TextToSpeech textToRead={overview} />
      </div>

      <ReadingProgress progress={42} />
    </div>
  );
}
