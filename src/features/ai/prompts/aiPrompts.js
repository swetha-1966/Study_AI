/**
 * aiPrompts.js — Centralized prompt engineering for all AI features.
 * Isolating prompts here makes iteration and testing much easier.
 */

/**
 * Generate the main study content generation prompt.
 * @param {string} topic - User's topic/notes input
 * @param {object} [options]
 * @param {string} [options.difficulty] - Difficulty level
 * @param {number} [options.cardCount] - Number of flashcards
 * @param {number} [options.quizCount] - Number of quiz questions
 * @returns {string}
 */
export function buildStudyPrompt(topic, options = {}) {
  const { difficulty = 'Intermediate', cardCount = 8, quizCount = 5 } = options;

  return `You are a world-class professor and curriculum designer.

TASK: Analyze the following topic and generate comprehensive study materials.

TOPIC: "${topic}"
DIFFICULTY: ${difficulty}
FLASHCARD COUNT: ${cardCount}
QUIZ QUESTION COUNT: ${quizCount}

INSTRUCTIONS:
1. Generate exactly ${cardCount} flashcards with clear, concise Q&A pairs
2. Generate exactly ${quizCount} multiple-choice questions (4 options each)
3. Write a comprehensive summary with key takeaways
4. Include a practical mnemonic for remembering core concepts
5. All content must be accurate, educational, and appropriate for the difficulty level

CRITICAL: Return ONLY valid JSON matching this exact schema. No markdown, no extra text.

{
  "summary": {
    "overview": "Comprehensive 2-3 paragraph overview of the topic",
    "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3", "Takeaway 4", "Takeaway 5"],
    "mnemonics": ["A memorable mnemonic or memory technique"]
  },
  "flashcards": [
    {
      "id": 1,
      "question": "Clear, specific question",
      "answer": "Accurate, concise answer"
    }
  ],
  "quiz": [
    {
      "id": 1,
      "question": "Scenario-based question testing deep understanding",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Why this answer is correct and others are wrong"
    }
  ]
}`;
}

/**
 * Generate the explanation prompt for a quiz answer.
 * @param {string} question - The quiz question
 * @param {string[]} options - Answer options
 * @param {number} userAnswer - Index of user's selected answer
 * @param {number} correctAnswer - Index of correct answer
 * @returns {string}
 */
export function buildExplanationPrompt(question, options, userAnswer, correctAnswer) {
  return `As an expert tutor, explain why the following quiz answer is ${userAnswer === correctAnswer ? 'correct' : 'incorrect'}.

Question: "${question}"
Options: ${options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join(', ')}
User selected: ${String.fromCharCode(65 + userAnswer)}
Correct answer: ${String.fromCharCode(65 + correctAnswer)}

Provide a brief, clear explanation (2-3 sentences). Focus on the concept, not the answer itself.
Return ONLY the explanation text, no JSON, no formatting.`;
}

/**
 * Generate a revision sheet prompt.
 * @param {string} topic - Study topic
 * @param {object} sessionData - Existing session data
 * @returns {string}
 */
export function buildRevisionPrompt(topic, sessionData = {}) {
  return `As an expert educator, create a concise exam revision sheet for: "${topic}"

Generate exam-focused revision content. Return ONLY valid JSON:
{
  "keyFacts": ["5-7 critical facts to remember"],
  "commonMistakes": ["3-5 common exam mistakes to avoid"],
  "examTips": ["3-5 specific tips for exam questions on this topic"],
  "quickFormulas": ["Any key formulas, definitions, or rules"],
  "mnemonic": "One powerful memory device for this topic"
}`;
}
