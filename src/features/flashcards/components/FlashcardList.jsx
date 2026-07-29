import React, { useState, useEffect, useCallback } from 'react';
import { Flashcard } from './Flashcard';
import { CardCounter } from './CardCounter';
import { ShuffleToggle } from './ShuffleToggle';
import { CompletionDialog } from './CompletionDialog';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FlashcardList({ flashcards = [] }) {
  const [activeDeck, setActiveDeck] = useState(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [knownIds, setKnownIds] = useState([]);
  const [reviewIds, setReviewIds] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setActiveDeck(flashcards);
    setCurrentIndex(0);
    setIsCompleted(false);
  }, [flashcards]);

  const handleNext = useCallback(() => {
    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, activeDeck.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleToggleBookmark = useCallback((cardId) => {
    setBookmarkedIds((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  }, []);

  const handleMarkKnown = useCallback(() => {
    const cardId = activeDeck[currentIndex]?.id;
    if (cardId) {
      setKnownIds((prev) => [...new Set([...prev, cardId])]);
      setReviewIds((prev) => prev.filter((id) => id !== cardId));
    }
    handleNext();
  }, [activeDeck, currentIndex, handleNext]);

  const handleMarkReview = useCallback(() => {
    const cardId = activeDeck[currentIndex]?.id;
    if (cardId) {
      setReviewIds((prev) => [...new Set([...prev, cardId])]);
      setKnownIds((prev) => prev.filter((id) => id !== cardId));
    }
    handleNext();
  }, [activeDeck, currentIndex, handleNext]);

  const handleToggleShuffle = () => {
    if (isShuffled) {
      setActiveDeck(flashcards);
      setIsShuffled(false);
    } else {
      const shuffled = [...activeDeck].sort(() => Math.random() - 0.5);
      setActiveDeck(shuffled);
      setIsShuffled(true);
    }
    setCurrentIndex(0);
  };

  if (!activeDeck || activeDeck.length === 0) {
    return <div className="text-center py-10 text-slate-400">No flashcards available.</div>;
  }

  const currentCard = activeDeck[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-sans">
      {!isCompleted ? (
        <>
          {/* Header Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <CardCounter current={currentIndex + 1} total={activeDeck.length} />
            <ShuffleToggle isShuffled={isShuffled} onToggle={handleToggleShuffle} />
          </div>

          {/* Active 3D Flashcard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard?.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Flashcard
                card={currentCard}
                currentIndex={currentIndex}
                totalCards={activeDeck.length}
                isBookmarked={bookmarkedIds.includes(currentCard?.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 max-w-2xl mx-auto pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={handlePrevious}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 text-xs font-semibold hover:text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMarkKnown}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-semibold transition-all"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>✓ Known</span>
              </button>

              <button
                type="button"
                onClick={handleMarkReview}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-semibold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>↺ Review Later</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <span>{currentIndex === activeDeck.length - 1 ? 'Complete Deck' : 'Next Card'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      ) : (
        <CompletionDialog
          totalCards={activeDeck.length}
          knownCount={knownIds.length || activeDeck.length - reviewIds.length}
          reviewCount={reviewIds.length}
          onReset={() => {
            setCurrentIndex(0);
            setIsCompleted(false);
          }}
        />
      )}
    </div>
  );
}
