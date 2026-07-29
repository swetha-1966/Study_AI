import { api } from '../../../services/api';

export async function fetchAIExplanation(question, userAnswer, correctAnswer) {
  try {
    const res = await api.post('/explain', { question, userAnswer, correctAnswer });
    return res.data;
  } catch (err) {
    return {
      explanation: `The correct answer is Option ${correctAnswer + 1}.`,
      memoryTip: 'Focus on core system metrics and architectural constraints.',
      reference: 'Standard Computer Science & Engineering Handbook',
    };
  }
}
