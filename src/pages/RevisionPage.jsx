import React from 'react';
import { RevisionHeader } from '../features/revision/components/RevisionHeader';
import { OnePageNotes } from '../features/revision/components/OnePageNotes';
import { MemoryTricks } from '../features/revision/components/MemoryTricks';
import { FormulaSheet } from '../features/revision/components/FormulaSheet';
import { RevisionChecklist } from '../features/revision/components/RevisionChecklist';
import { WrongAnswers } from '../features/revision/components/WrongAnswers';

export function RevisionPage({ session, onRetestWrong }) {
  const topic = session?.topic || 'Operating Systems';
  const wrongQuestions = session?.wrongQuestions || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      <RevisionHeader topic={topic} />
      <OnePageNotes topic={topic} />
      <MemoryTricks />
      <FormulaSheet />
      <RevisionChecklist />
      <WrongAnswers questions={wrongQuestions} />
    </div>
  );
}
