import React, { createContext, useContext, useState, useCallback } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [activeQuiz, setActiveQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = useCallback((quizQuestions) => {
    setActiveQuiz(quizQuestions || []);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
  }, []);

  const selectAnswer = useCallback((optionIdx) => {
    setUserAnswers(prev => {
      if (prev[currentIndex] !== undefined) return prev;
      return { ...prev, [currentIndex]: optionIdx };
    });
  }, [currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < activeQuiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, activeQuiz.length]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
  }, []);

  return (
    <QuizContext.Provider value={{
      activeQuiz,
      currentIndex,
      userAnswers,
      isFinished,
      startQuiz,
      selectAnswer,
      nextQuestion,
      setCurrentIndex,
      resetQuiz,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return context;
}
