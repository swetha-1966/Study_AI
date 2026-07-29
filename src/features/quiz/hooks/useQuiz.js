import { useState, useCallback } from 'react';

export function useQuiz(initialDeck = []) {
  const [deck, setDeck] = useState(initialDeck);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confidences, setConfidences] = useState({});

  const selectAnswer = useCallback((idx, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [idx]: optionIdx }));
  }, []);

  const setConfidence = useCallback((idx, level) => {
    setConfidences((prev) => ({ ...prev, [idx]: level }));
  }, []);

  return {
    deck,
    setDeck,
    currentIndex,
    setCurrentIndex,
    answers,
    selectAnswer,
    confidences,
    setConfidence,
  };
}
