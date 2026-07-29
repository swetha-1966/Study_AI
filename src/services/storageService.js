/**
 * LocalStorage Persistence Service for Study History.
 */

const STORAGE_KEY = 'study_assistant_sessions_v1';

/**
 * Retrieves all saved study sessions from LocalStorage.
 * @returns {Array} List of study sessions
 */
export function getSavedSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load sessions from LocalStorage:', e);
    return [];
  }
}

/**
 * Saves a new study session to LocalStorage.
 * @param {object} sessionData - { topic, summary, flashcards, quiz }
 * @returns {object} The saved session object with ID and timestamp
 */
export function saveSession(sessionData) {
  try {
    const sessions = getSavedSessions();
    const newSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      topic: sessionData.topic || 'Untitled Study Session',
      summary: sessionData.summary || null,
      flashcards: sessionData.flashcards || [],
      quiz: sessionData.quiz || [],
    };

    // Prepend new session to top of history
    const updated = [newSession, ...sessions].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newSession;
  } catch (e) {
    console.error('Failed to save session to LocalStorage:', e);
    return null;
  }
}

/**
 * Deletes a session by ID.
 * @param {string} sessionId
 * @returns {Array} Updated sessions list
 */
export function deleteSession(sessionId) {
  try {
    const sessions = getSavedSessions();
    const updated = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete session:', e);
    return getSavedSessions();
  }
}

/**
 * Clears all session history.
 */
export function clearAllSessions() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear sessions:', e);
  }
}
