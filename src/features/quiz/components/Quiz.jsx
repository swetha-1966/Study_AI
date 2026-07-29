import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QuizHeader } from './QuizHeader';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { ConfidenceSlider } from './ConfidenceSlider';
import { ExplanationPanel } from './ExplanationPanel';
import { calculateQuizScore } from '../utils/scoring';

export function Quiz({ quiz = [] }) {
  const [activeDeck, setActiveDeck] = useState(quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [confidences, setConfidences] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const { formattedTime, isWarning, reset: resetTimer } = useQuizTimer(600, () => setIsCompleted(true));

  useEffect(() => {
    setActiveDeck(quiz);
    setCurrentIndex(0);
    setUserAnswers({});
    setConfidences({});
    setIsCompleted(false);
    resetTimer(600);
  }, [quiz, resetTimer]);

  const handleSelectOption = useCallback((optionIndex) => {
    setUserAnswers((prev) => {
      if (prev[currentIndex] !== undefined) return prev;
      return { ...prev, [currentIndex]: optionIndex };
    });
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, activeDeck.length]);

  const scoreResults = useMemo(() => {
    return calculateQuizScore(activeDeck, userAnswers);
  }, [activeDeck, userAnswers]);

  if (!activeDeck || activeDeck.length === 0) {
    return <div className="text-center py-10 text-slate-400">No quiz questions available.</div>;
  }

  const currentQuestion = activeDeck[currentIndex];
  const currentUserAnswer = userAnswers[currentIndex] ?? null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-sans">
      {!isCompleted ? (
        <>
          <QuizHeader
            topic="Multiple-Choice Quiz Engine"
            totalQuestions={activeDeck.length}
            formattedTime={formattedTime}
            isWarning={isWarning}
            onReset={() => {
              setCurrentIndex(0);
              setUserAnswers({});
              setIsCompleted(false);
              resetTimer(600);
            }}
          />

          {/* Navigator Palette */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            {activeDeck.map((q, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              const isCorrect = isAnswered && userAnswers[idx] === q.correctAnswer;

              let btnClass = 'bg-slate-800 text-slate-400 border-slate-700';
              if (isCurrent) {
                btnClass = 'bg-indigo-600 text-white border-indigo-400 font-bold ring-2 ring-indigo-500/40';
              } else if (isAnswered) {
                btnClass = isCorrect ? 'bg-emerald-950 text-emerald-400 border-emerald-500/60 font-semibold' : 'bg-red-950 text-red-400 border-red-500/60 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs flex-shrink-0 transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <QuizQuestion
            questionData={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={activeDeck.length}
            userAnswer={currentUserAnswer}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onSkip={handleNext}
          />

          {currentUserAnswer !== null && (
            <div className="max-w-2xl mx-auto space-y-4">
              <ConfidenceSlider
                confidence={confidences[currentIndex] || 'Maybe'}
                onChange={(val) => setConfidences((prev) => ({ ...prev, [currentIndex]: val }))}
              />
              <ExplanationPanel questionData={currentQuestion} userAnswer={currentUserAnswer} />
            </div>
          )}
        </>
      ) : (
        <QuizResult
          scoreResults={scoreResults}
          onRestartFull={() => {
            setActiveDeck(quiz);
            setCurrentIndex(0);
            setUserAnswers({});
            setIsCompleted(false);
            resetTimer(600);
          }}
          onRetestWrong={() => {
            if (scoreResults.wrongQuestions.length > 0) {
              setActiveDeck(scoreResults.wrongQuestions);
              setCurrentIndex(0);
              setUserAnswers({});
              setIsCompleted(false);
              resetTimer(300);
            }
          }}
        />
      )}
    </div>
  );
}
