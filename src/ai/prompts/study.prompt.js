/**
 * study.prompt.js — Versioned prompts for study content generation.
 *
 * Version history:
 *   v1 (2024-07) — Initial prompt with summary, flashcards, quiz
 *
 * When changing prompts, increment the version and keep the old version
 * for reproducibility and A/B testing.
 */

/** Current prompt version */
export const PROMPT_VERSION = 'v1';

/**
 * Build the main study generation prompt.
 *
 * @param {string} topic - Study topic or notes
 * @param {object} [options]
 * @param {string} [options.difficulty='Intermediate']
 * @param {number} [options.cardCount=8]
 * @param {number} [options.quizCount=5]
 * @returns {string}
 */
export function buildStudyPrompt(topic, options = {}) {
  const {
    difficulty = 'Intermediate',
    cardCount = 8,
    quizCount = 5,
  } = options;

  return `You are a world-class professor and curriculum designer specializing in creating comprehensive, accurate study materials.

TASK: Analyze the following topic and generate complete study materials at ${difficulty} level.

TOPIC:
"""
${topic.trim()}
"""

REQUIREMENTS:
- Generate exactly ${cardCount} flashcards with clear Q&A pairs
- Generate exactly ${quizCount} multiple-choice questions with 4 options each
- Write a comprehensive 3-4 sentence summary overview
- Include 4-5 specific key takeaways (not generic)
- Include 1 memorable mnemonic or memory technique
- All content must be factually accurate and educationally sound
- Difficulty level: ${difficulty}

CRITICAL: Return ONLY a valid JSON object. No markdown fences, no explanations, no extra text.

Required JSON schema:
{
  "summary": {
    "overview": "3-4 sentence comprehensive overview of the topic",
    "keyTakeaways": [
      "Specific, actionable takeaway 1",
      "Specific, actionable takeaway 2",
      "Specific, actionable takeaway 3",
      "Specific, actionable takeaway 4"
    ],
    "mnemonics": ["A memorable mnemonic or memory device"]
  },
  "flashcards": [
    {
      "id": 1,
      "question": "Specific, deep question testing conceptual understanding",
      "answer": "Comprehensive, accurate answer with key details"
    }
  ],
  "quiz": [
    {
      "id": 1,
      "question": "Scenario-based question testing applied knowledge",
      "options": ["Correct answer", "Plausible distractor A", "Plausible distractor B", "Plausible distractor C"],
      "correctAnswer": 0,
      "explanation": "Why option A is correct and why the others are wrong"
    }
  ]
}

Generate ${cardCount} flashcards and ${quizCount} quiz questions. Begin JSON output now:`;
}

/**
 * Build an explanation prompt for a quiz answer.
 *
 * @param {string} question
 * @param {string[]} answerOptions
 * @param {number} userAnswer - 0-indexed
 * @param {number} correctAnswer - 0-indexed
 * @returns {string}
 */
export function buildExplanationPrompt(question, answerOptions, userAnswer, correctAnswer) {
  const letters = ['A', 'B', 'C', 'D'];
  const isCorrect = userAnswer === correctAnswer;

  return `As an expert tutor, provide a brief, clear explanation (2-3 sentences) for this quiz question.

Question: "${question}"
${answerOptions.map((o, i) => `${letters[i]}. ${o}`).join('\n')}
Student answered: ${letters[userAnswer]} (${isCorrect ? 'CORRECT' : 'INCORRECT'})
Correct answer: ${letters[correctAnswer]}

Focus on the core concept. Do not repeat the question. Return only the explanation text.`;
}
