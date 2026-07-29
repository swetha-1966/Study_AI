import { api } from '../../../services/api';

export async function requestGenerateSession(payload) {
  try {
    const response = await api.post('/generate', payload);
    return response;
  } catch (err) {
    throw err;
  }
}
