/**
 * Schema Validator for AI Generated Study Data.
 *
 * Validates structure for:
 * - summary (object with overview, keyTakeaways array, mnemonics array)
 * - flashcards (array of objects with id, question, answer)
 * - quiz (array of objects with id, question, options array, correctAnswer index, explanation)
 */

const DEFAULT_ERROR_MSG = 'The AI returned invalid data. Please try again.';

export function validateStudyData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error(DEFAULT_ERROR_MSG);
  }

  const { flashcards, quiz, summary } = data;

  // 1. Validate Flashcards Array
  if (!Array.isArray(flashcards) || flashcards.length === 0) {
    console.error('Validation failed: flashcards is missing or not an array');
    throw new Error(DEFAULT_ERROR_MSG);
  }

  const normalizedFlashcards = flashcards.map((card, idx) => {
    if (!card || typeof card !== 'object') {
      throw new Error(DEFAULT_ERROR_MSG);
    }

    const question = typeof card.question === 'string' ? card.question.trim() : '';
    const answer = typeof card.answer === 'string' ? card.answer.trim() : '';

    if (!question || !answer) {
      console.error(`Validation failed on flashcard at index ${idx}:`, card);
      throw new Error(DEFAULT_ERROR_MSG);
    }

    return {
      id: card.id ?? idx + 1,
      question,
      answer,
    };
  });

  // 2. Validate Quiz Array
  if (!Array.isArray(quiz) || quiz.length === 0) {
    console.error('Validation failed: quiz is missing or not an array');
    throw new Error(DEFAULT_ERROR_MSG);
  }

  const normalizedQuiz = quiz.map((item, idx) => {
    if (!item || typeof item !== 'object') {
      throw new Error(DEFAULT_ERROR_MSG);
    }

    const question = typeof item.question === 'string' ? item.question.trim() : '';
    const options = Array.isArray(item.options)
      ? item.options.map(opt => String(opt ?? '').trim()).filter(Boolean)
      : [];

    if (!question || options.length < 2) {
      console.error(`Validation failed on quiz item at index ${idx}:`, item);
      throw new Error(DEFAULT_ERROR_MSG);
    }

    let parsedCorrect = parseInt(item.correctAnswer, 10);
    if (isNaN(parsedCorrect)) {
      parsedCorrect = 0;
    }

    if (parsedCorrect >= options.length && parsedCorrect === options.length) {
      parsedCorrect = parsedCorrect - 1;
    } else if (parsedCorrect < 0 || parsedCorrect >= options.length) {
      parsedCorrect = 0;
    }

    const explanation = typeof item.explanation === 'string' && item.explanation.trim()
      ? item.explanation.trim()
      : 'No detailed explanation provided.';

    return {
      id: item.id ?? idx + 1,
      question,
      options,
      correctAnswer: parsedCorrect,
      explanation,
    };
  });

  // 3. Normalize Summary Section (Optional but fallback if missing)
  const normalizedSummary = {
    overview: typeof summary?.overview === 'string' && summary.overview.trim()
      ? summary.overview.trim()
      : 'Comprehensive study material generated from your notes.',
    keyTakeaways: Array.isArray(summary?.keyTakeaways)
      ? summary.keyTakeaways.map(t => String(t).trim()).filter(Boolean)
      : [
          'Master core definitions and structural concepts.',
          'Review practical trade-offs and domain applications.',
          'Test retention using flashcards and multiple-choice quizzes.'
        ],
    mnemonics: Array.isArray(summary?.mnemonics)
      ? summary.mnemonics.map(m => String(m).trim()).filter(Boolean)
      : [
          'Active Recall + Spaced Repetition = Long Term Memory Retention'
        ],
  };

  return {
    summary: normalizedSummary,
    flashcards: normalizedFlashcards,
    quiz: normalizedQuiz,
  };
}
