import { useState, useRef, useCallback, useEffect } from 'react';
import { generateStudyMaterial } from '../services/ai';
import { parseStudyJSON } from '../utils/parser';
import { validateStudyData } from '../utils/validator';
import { getSavedSessions, saveSession, deleteSession } from '../services/storageService';

/**
 * Custom React Hook managing the Study Assistant workflow.
 */
export function useStudyAssistant() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastNotes, setLastNotes] = useState('');
  const [lastOptions, setLastOptions] = useState(null);
  const [history, setHistory] = useState([]);

  const abortControllerRef = useRef(null);
  const activeRequestIdRef = useRef(0);

  // Load history from LocalStorage on mount
  useEffect(() => {
    setHistory(getSavedSessions());
  }, []);

  /**
   * Generates study materials from notes and custom options.
   */
  const generate = useCallback(async (notes, options = {}) => {
    if (!notes || !notes.trim()) {
      setError('Please enter study notes or a topic before submitting.');
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const currentRequestId = ++activeRequestIdRef.current;

    setLoading(true);
    setError(null);
    setLastNotes(notes);
    setLastOptions(options);

    try {
      const rawResponse = await generateStudyMaterial(notes, options, controller.signal);

      if (currentRequestId !== activeRequestIdRef.current) return;

      const parsedData = parseStudyJSON(rawResponse);
      const validatedData = validateStudyData(parsedData);

      if (currentRequestId === activeRequestIdRef.current) {
        setData(validatedData);
        setError(null);

        // Auto-save to LocalStorage history
        saveSession({
          topic: notes.trim().slice(0, 50),
          summary: validatedData.summary,
          flashcards: validatedData.flashcards,
          quiz: validatedData.quiz,
        });

        // Refresh history list
        setHistory(getSavedSessions());
      }
    } catch (err) {
      if (err.name === 'AbortError' || err.message === 'Request was canceled.') {
        return;
      }

      if (currentRequestId === activeRequestIdRef.current) {
        setData(null);
        setError(err.message || 'An error occurred while generating study materials.');
      }
    } finally {
      if (currentRequestId === activeRequestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const loadSession = useCallback((session) => {
    if (session && session.flashcards && session.quiz) {
      setData({
        summary: session.summary,
        flashcards: session.flashcards,
        quiz: session.quiz,
      });
      setLastNotes(session.topic || '');
      setError(null);
    }
  }, []);

  const deleteHistorySession = useCallback((sessionId) => {
    const updated = deleteSession(sessionId);
    setHistory(updated);
  }, []);

  const retry = useCallback(() => {
    if (lastNotes) {
      generate(lastNotes, lastOptions || {});
    }
  }, [generate, lastNotes, lastOptions]);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setData(null);
    setLoading(false);
    setError(null);
    setLastNotes('');
    setLastOptions(null);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    lastNotes,
    history,
    generate,
    loadSession,
    deleteHistorySession,
    retry,
    reset,
  };
}
