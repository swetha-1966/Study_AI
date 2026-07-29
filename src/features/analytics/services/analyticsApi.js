import { api } from '../../../services/api';

export async function fetchAnalyticsData() {
  try {
    const res = await api.get('/analytics');
    return res.data;
  } catch (err) {
    return {
      totalSessions: 25,
      studyHours: 18,
      quizAccuracy: 84,
      flashcardsMastered: 420,
    };
  }
}
