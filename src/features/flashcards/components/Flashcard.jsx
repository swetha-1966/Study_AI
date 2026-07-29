import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, HelpCircle, CheckCircle, Volume2, Bookmark } from 'lucide-react';

/**
 * Interactive 3D Flip Flashcard Component with Speech Synthesis & Bookmark support.
 *
 * @param {object} props
 * @param {object} props.card - Flashcard object { id, question, answer }
 * @param {number} props.currentIndex - Card index number
 * @param {number} props.totalCards - Total number of cards in deck
 * @param {boolean} [props.isBookmarked] - Is card bookmarked
 * @param {function} [props.onToggleBookmark] - Callback when bookmark icon is clicked
 */
export function Flashcard({
  card,
  currentIndex,
  totalCards,
  isBookmarked = false,
  onToggleBookmark,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [card?.id, currentIndex]);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleFlip();
    }
  };

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = isFlipped ? card?.answer : card?.question;
    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!card) return null;

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <div
        tabIndex={0}
        role="button"
        aria-label={`Flashcard ${currentIndex + 1} of ${totalCards}. Question: ${card.question}. Press space to reveal answer.`}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        className="w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-3xl"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative min-h-[320px] sm:min-h-[360px] w-full rounded-3xl transform-style-3d shadow-2xl"
        >
          {/* Front Face (Question) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-10 bg-slate-900 border border-slate-800 flex flex-col justify-between backface-hidden shadow-indigo-500/5">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <HelpCircle className="w-3.5 h-3.5" />
                QUESTION
              </span>

              <div className="flex items-center gap-3">
                {'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className={`p-1.5 rounded-xl transition-colors ${
                      isSpeaking
                        ? 'bg-indigo-500 text-white animate-pulse'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Read text aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}

                {onToggleBookmark && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(card.id);
                    }}
                    className={`p-1.5 rounded-xl transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark card'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  </button>
                )}

                <span className="text-slate-400 font-mono">
                  {currentIndex + 1} / {totalCards}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="my-auto py-4 text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100 leading-relaxed font-display">
                {card.question}
              </h3>
            </div>

            {/* Bottom Hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Space</kbd> to flip</span>
            </div>
          </div>

          {/* Back Face (Answer) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col justify-between backface-hidden rotate-y-180 shadow-indigo-500/10">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                ANSWER
              </span>

              <div className="flex items-center gap-3">
                {'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className={`p-1.5 rounded-xl transition-colors ${
                      isSpeaking
                        ? 'bg-indigo-500 text-white animate-pulse'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Read answer aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}

                <span className="text-slate-400 font-mono">
                  {currentIndex + 1} / {totalCards}
                </span>
              </div>
            </div>

            {/* Answer Text */}
            <div className="my-auto py-4 text-center">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-medium">
                {card.answer}
              </p>
            </div>

            {/* Bottom Hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click to flip back to question</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
