import { api } from '../../../services/api';

export async function fetchRevisionSummary(topic) {
  try {
    const res = await api.post('/explain', { question: `Provide revision summary for ${topic}` });
    return res.data;
  } catch (err) {
    return { explanation: `Exam notes for ${topic}` };
  }
}
