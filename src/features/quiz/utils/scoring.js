export function calculateQuizScore(questions = [], userAnswers = {}) {
  let correctCount = 0;
  let wrongCount = 0;
  const wrongQuestions = [];

  questions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    if (userChoice === q.correctAnswer) {
      correctCount += 1;
    } else {
      wrongCount += 1;
      wrongQuestions.push({
        ...q,
        userChoice,
      });
    }
  });

  const total = questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return {
    correctCount,
    wrongCount,
    total,
    percentage,
    wrongQuestions,
  };
}
