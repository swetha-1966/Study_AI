import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, Info, ArrowRight, SkipForward } from 'lucide-react';

/**
 * Quiz Single Question View Component.
 *
 * @param {object} props
 * @param {object} props.questionData - { id, question, options, correctAnswer, explanation }
 * @param {number} props.currentIndex - 0-indexed question index
 * @param {number} props.totalQuestions - Total questions in quiz
 * @param {number|null} props.userAnswer - User's selected option index or null if un-answered
 * @param {function} props.onSelectOption - Callback when option is clicked
 * @param {function} props.onNext - Callback for proceeding to next question
 * @param {function} [props.onSkip] - Callback to skip current question
 */
export function QuizQuestion({
  questionData,
  currentIndex,
  totalQuestions,
  userAnswer,
  onSelectOption,
  onNext,
  onSkip,
}) {
  if (!questionData) return null;

  const { question, options, correctAnswer, explanation } = questionData;
  const isAnswered = userAnswer !== null && userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === correctAnswer;

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Question Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        {/* Question Header */}
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            QUESTION {currentIndex + 1}
          </span>
          <span className="text-slate-400 font-mono">
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Question Prompt */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed font-display">
          {question}
        </h3>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {options.map((optionText, idx) => {
            const letter = optionLetters[idx] || `${idx + 1}`;
            const isSelected = userAnswer === idx;
            const isTargetCorrect = idx === correctAnswer;

            let optionStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-400 border-slate-700';

            if (isAnswered) {
              if (isTargetCorrect) {
                optionStyle = 'bg-emerald-950/50 border-emerald-500/80 text-emerald-100 ring-1 ring-emerald-500/40';
                badgeStyle = 'bg-emerald-500 text-white border-emerald-400';
              } else if (isSelected && !isTargetCorrect) {
                optionStyle = 'bg-red-950/50 border-red-500/80 text-red-100 ring-1 ring-red-500/40';
                badgeStyle = 'bg-red-500 text-white border-red-400';
              } else {
                optionStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60';
              }
            }

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: isAnswered ? 1 : 1.01 }}
                whileTap={{ scale: isAnswered ? 1 : 0.99 }}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${optionStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${badgeStyle}`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-normal">
                    {optionText}
                  </span>
                </div>

                {isAnswered && (
                  <div className="flex-shrink-0">
                    {isTargetCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    {isSelected && !isTargetCorrect && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Immediate Feedback & Explanation Card */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-2"
            >
              <div className={`p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-red-950/30 border-red-500/30'} space-y-2`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isCorrect ? 'Correct Answer!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Footer Actions (Skip & Next) */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {!isAnswered && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Skip Question</span>
            </button>
          )}

          {isAnswered && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onNext}
              className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
