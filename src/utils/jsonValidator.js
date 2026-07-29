/**
 * Schema Validator for StudyForge AI Output.
 *
 * Enforces valid shapes for:
 * - summary (overview, keyTakeaways, mnemonics)
 * - flashcards (id, question, answer)
 * - quiz (id, question, options, correctAnswer, explanation)
 * - important_topics
 * - interview_questions
 */

export function validateStudyForgeSchema(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('AI returned an invalid data payload.');
  }

  const { flashcards, quiz, summary, important_topics, interview_questions } = data;

  // Flashcards validation
  if (!Array.isArray(flashcards) || flashcards.length === 0) {
    throw new Error('Study material must contain at least 1 flashcard.');
  }

  const normalizedFlashcards = flashcards.map((c, i) => ({
    id: c.id ?? i + 1,
    question: String(c.question || '').trim() || `Flashcard Question ${i + 1}`,
    answer: String(c.answer || '').trim() || 'Detailed answer explanation.',
    isBookmarked: Boolean(c.isBookmarked),
  }));

  // Quiz validation
  if (!Array.isArray(quiz) || quiz.length === 0) {
    throw new Error('Study material must contain at least 1 quiz question.');
  }

  const normalizedQuiz = quiz.map((q, i) => {
    const options = Array.isArray(q.options)
      ? q.options.map(o => String(o || '').trim()).filter(Boolean)
      : ['Option A', 'Option B', 'Option C', 'Option D'];

    let correctIdx = parseInt(q.correctAnswer, 10);
    if (isNaN(correctIdx) || correctIdx < 0 || correctIdx >= options.length) {
      correctIdx = 0;
    }

    return {
      id: q.id ?? i + 1,
      question: String(q.question || '').trim() || `Quiz Question ${i + 1}`,
      options,
      correctAnswer: correctIdx,
      explanation: String(q.explanation || '').trim() || 'Comprehensive answer explanation.',
    };
  });

  // Summary normalization
  const normalizedSummary = {
    overview: String(summary?.overview || '').trim() || 'Executive architectural overview of the topic.',
    keyTakeaways: Array.isArray(summary?.keyTakeaways)
      ? summary.keyTakeaways.map(t => String(t).trim()).filter(Boolean)
      : ['Understand foundational mechanisms.', 'Analyze real-world trade-offs.'],
    mnemonics: Array.isArray(summary?.mnemonics)
      ? summary.mnemonics.map(m => String(m).trim()).filter(Boolean)
      : ['F.A.C.T: Focus, Analyze, Code, Test.'],
  };

  const normalizedTopics = Array.isArray(important_topics)
    ? important_topics.map(t => String(t).trim()).filter(Boolean)
    : ['Foundational Concepts', 'System Architecture', 'Performance Tradeoffs'];

  const normalizedInterview = Array.isArray(interview_questions)
    ? interview_questions.map((iq, i) => ({
        id: iq.id ?? i + 1,
        question: String(iq.question || iq || '').trim(),
        answer: String(iq.answer || 'Senior engineering level answer breakdown.').trim(),
      })).filter(iq => iq.question)
    : [
        {
          id: 1,
          question: 'How do you evaluate tradeoffs when implementing this in production?',
          answer: 'Senior engineers evaluate throughput vs latency, memory footprint vs CPU efficiency, and code maintainability.',
        }
      ];

  return {
    session: {
      title: data.session?.title || 'Study Session',
      difficulty: data.session?.difficulty || 'Intermediate',
      estimatedTime: data.session?.estimatedTime || '15 min',
    },
    summary: normalizedSummary,
    flashcards: normalizedFlashcards,
    quiz: normalizedQuiz,
    important_topics: normalizedTopics,
    interview_questions: normalizedInterview,
  };
}
