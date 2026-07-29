import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSavedSessions, saveSession, deleteSession } from '../services/storageService';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [activeSession, setActiveSession] = useState(null);
  const [history, setHistory] = useState([]);
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('user_stats_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      xp: 250,
      level: 2,
      streak: 3,
      sessionsCompleted: 4,
      cardsMastered: 18,
      quizAccuracy: 88,
      studyMinutes: 45,
    };
  });

  // Sync history on mount
  useEffect(() => {
    setHistory(getSavedSessions());
  }, []);

  // Save user stats changes
  useEffect(() => {
    localStorage.setItem('user_stats_v1', JSON.stringify(userStats));
  }, [userStats]);

  const loadSession = useCallback((sessionData) => {
    setActiveSession(sessionData);
  }, []);

  const addCompletedSession = useCallback((sessionData) => {
    setActiveSession(sessionData);
    const saved = saveSession(sessionData);
    setHistory(getSavedSessions());

    // Award XP
    setUserStats(prev => {
      const newXp = prev.xp + 100;
      const newLevel = Math.floor(newXp / 300) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        sessionsCompleted: prev.sessionsCompleted + 1,
        cardsMastered: prev.cardsMastered + (sessionData.flashcards?.length || 0),
      };
    });

    return saved;
  }, []);

  const removeSession = useCallback((sessionId) => {
    const updated = deleteSession(sessionId);
    setHistory(updated);
    if (activeSession && activeSession.id === sessionId) {
      setActiveSession(null);
    }
  }, [activeSession]);

  return (
    <SessionContext.Provider value={{
      activeSession,
      history,
      userStats,
      loadSession,
      addCompletedSession,
      removeSession,
      resetActiveSession: () => setActiveSession(null),
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
