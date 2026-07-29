import React from 'react';
import { OptionCard } from './OptionCard';
import { Badge } from '../../../components/ui/Badge/Badge';

export function QuestionCard({ questionData, currentIndex, totalQuestions, selectedOption, onSelectOption }) {
  if (!questionData) return null;

  const isAnswered = selectedOption !== null && selectedOption !== undefined;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-400 font-mono">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <Badge variant="ai">Multiple Choice</Badge>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-100 font-display leading-snug">
        {questionData.question}
      </h3>

      <div className="space-y-3">
        {questionData.options?.map((opt, idx) => (
          <OptionCard
            key={idx}
            optionText={opt}
            index={idx}
            isSelected={selectedOption === idx}
            isAnswered={isAnswered}
            isCorrect={idx === questionData.correctAnswer}
            onClick={() => onSelectOption(idx)}
          />
        ))}
      </div>
    </div>
  );
}
