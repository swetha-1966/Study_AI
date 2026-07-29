/**
 * quiz.prompt.js — Versioned prompts for quiz-specific generation.
 * Version: v1
 */

export const QUIZ_PROMPT_VERSION = 'v1';

/**
 * Build a standalone quiz generation prompt (without flashcards or summary).
 *
 * @param {string} topic
 * @param {object} [options]
 * @param {number} [options.count=5]
 * @param {string} [options.difficulty='Intermediate']
 * @param {string} [options.focus] - Specific aspect to focus on
 * @returns {string}
 */
export function buildQuizPrompt(topic, options = {}) {
  const { count = 5, difficulty = 'Intermediate', focus = '' } = options;

  return `Generate ${count} ${difficulty}-level multiple-choice quiz questions about: "${topic}"${focus ? ` focusing on: ${focus}` : ''}.

Each question must test deep understanding (not simple recall). Include realistic distractors.

Return ONLY valid JSON array:
[
  {
    "id": 1,
    "question": "Scenario or concept-based question",
    "options": ["Correct answer", "Distractor B", "Distractor C", "Distractor D"],
    "correctAnswer": 0,
    "explanation": "Clear explanation of why the correct answer is right",
    "difficulty": "${difficulty.toLowerCase()}"
  }
]`;
}

/**
 * Build a "retest wrong answers" prompt for targeted review.
 *
 * @param {object[]} wrongQuestions - Quiz questions the user got wrong
 * @param {string} topic
 * @returns {string}
 */
export function buildRetestPrompt(wrongQuestions, topic) {
  const questionSummary = wrongQuestions
    .slice(0, 5)
    .map((q, i) => `${i + 1}. ${q.question}`)
    .join('\n');

  return `The student struggled with these questions about "${topic}":
${questionSummary}

Generate ${Math.min(wrongQuestions.length, 5)} NEW questions covering the same concepts from different angles.
Return ONLY valid JSON array with the same schema as before.`;
}
