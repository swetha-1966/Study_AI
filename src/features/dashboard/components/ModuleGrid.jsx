import React from 'react';
import { SummaryCard } from './SummaryCard';
import { FlashcardCard } from './FlashcardCard';
import { QuizCard } from './QuizCard';
import { RevisionCard } from './RevisionCard';
import { MemoryCard } from './MemoryCard';
import { InterviewCard } from './InterviewCard';

export function ModuleGrid({ onOpenModule }) {
  return (
    <div className="space-y-4 font-sans">
      <h3 className="text-base font-bold text-slate-100 font-display">Study Session Modules</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SummaryCard onClick={() => onOpenModule('summary')} />
        <FlashcardCard cardCount={4} onClick={() => onOpenModule('flashcards')} />
        <QuizCard quizCount={3} onClick={() => onOpenModule('quiz')} />
        <RevisionCard onClick={() => onOpenModule('revision')} />
        <MemoryCard onClick={() => onOpenModule('summary')} />
        <InterviewCard onClick={() => onOpenModule('summary')} />
      </div>
    </div>
  );
}
