import { post } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { getProvider } from '../../ai/providers/index';
import { StudySession } from '../../models/StudySession';
import { logger } from '../../lib/logger';
import { appCache } from '../../utils/cache';

const MODULE = 'SessionRepository';

/**
 * SessionRepository — Data access layer for study sessions.
 *
 * Abstracts the data source (backend API, AI provider, localStorage) from components.
 * Components interact with hooks → Repository → Data Source.
 *
 * Benefits:
 * - Mockable for testing (swap repository without touching components)
 * - Cache layer lives here (invisible to calling code)
 * - Offline fallback lives here
 */
class SessionRepositoryClass {
  /**
   * Generate a new study session from a topic/notes input.
   *
   * Strategy:
   * 1. Try backend POST /api/v1/generate
   * 2. Fall back to AI provider (Gemini / Mock)
   *
   * @param {string} topic - User's study topic or notes
   * @param {object} [options] - Generation options
   * @param {AbortSignal} [signal] - Cancellation signal
   * @returns {Promise<StudySession>}
   */
  async generate(topic, options = {}, signal) {
    logger.info(MODULE, `Generating session for: "${topic.slice(0, 40)}..."`);

    // 1. Try backend server
    try {
      const response = await post(
        API_ENDPOINTS.GENERATE,
        { notes: topic.trim(), ...options },
        { signal }
      );

      const rawData = response.data || response;
      logger.info(MODULE, 'Session generated via backend');
      return StudySession.fromRaw({ topic, ...rawData });
    } catch (backendErr) {
      if (backendErr.name === 'AbortError' || backendErr.name === 'CanceledError') throw backendErr;
      logger.warn(MODULE, 'Backend failed, falling back to AI provider:', backendErr.message);
    }

    // 2. Fall back to AI provider
    const provider = getProvider();
    const rawData = await provider.generate(topic, { ...options, signal });
    logger.info(MODULE, `Session generated via ${provider.name}`);
    return StudySession.fromRaw({ topic, ...rawData });
  }

  /**
   * Get all saved sessions from localStorage.
   * @returns {StudySession[]}
   */
  getAll() {
    const cacheKey = 'sessions:all';
    const cached = appCache.get(cacheKey);
    if (cached) return cached;

    const { getSavedSessions } = require('../../services/storageService');
    const raw = getSavedSessions();
    const sessions = raw.map((s) => StudySession.fromRaw(s));
    appCache.set(cacheKey, sessions);
    return sessions;
  }

  /**
   * Delete a session by ID.
   * @param {string} sessionId
   */
  delete(sessionId) {
    appCache.delete('sessions:all');
    const { deleteSession } = require('../../services/storageService');
    return deleteSession(sessionId);
  }
}

export const SessionRepository = new SessionRepositoryClass();
