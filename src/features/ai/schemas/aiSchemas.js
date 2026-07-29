/**
 * aiSchemas.js — JSON schema validation for AI responses.
 * Validates that AI output matches expected shape before rendering.
 */

/**
 * Validate a study session AI response.
 * @param {any} data - The parsed AI JSON response
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateStudyResponse(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Response is not an object'] };
  }

  // Validate summary
  if (!data.summary) {
    errors.push('Missing: summary');
  } else {
    if (!data.summary.overview || typeof data.summary.overview !== 'string') {
      errors.push('Missing or invalid: summary.overview');
    }
    if (!Array.isArray(data.summary.keyTakeaways) || data.summary.keyTakeaways.length === 0) {
      errors.push('Missing or empty: summary.keyTakeaways');
    }
  }

  // Validate flashcards
  if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
    errors.push('Missing or empty: flashcards array');
  } else {
    data.flashcards.forEach((card, i) => {
      if (!card.question) errors.push(`flashcards[${i}]: missing question`);
      if (!card.answer) errors.push(`flashcards[${i}]: missing answer`);
    });
  }

  // Validate quiz
  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    errors.push('Missing or empty: quiz array');
  } else {
    data.quiz.forEach((q, i) => {
      if (!q.question) errors.push(`quiz[${i}]: missing question`);
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`quiz[${i}]: options must have at least 2 items`);
      }
      if (typeof q.correctAnswer !== 'number') {
        errors.push(`quiz[${i}]: correctAnswer must be a number`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sanitize and normalize a study session response.
 * Fills in defaults for missing optional fields.
 * @param {object} data
 * @returns {object}
 */
export function normalizeStudyResponse(data) {
  return {
    summary: {
      overview: data.summary?.overview || 'No overview available.',
      keyTakeaways: data.summary?.keyTakeaways || [],
      mnemonics: data.summary?.mnemonics || [],
    },
    flashcards: (data.flashcards || []).map((card, i) => ({
      id: card.id ?? i + 1,
      question: card.question || `Question ${i + 1}`,
      answer: card.answer || 'Answer not available.',
      difficulty: card.difficulty || 'medium',
    })),
    quiz: (data.quiz || []).map((q, i) => ({
      id: q.id ?? i + 1,
      question: q.question || `Question ${i + 1}`,
      options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: q.correctAnswer ?? 0,
      explanation: q.explanation || 'No explanation provided.',
    })),
  };
}
