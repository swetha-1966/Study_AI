import { useState, useCallback, useRef } from 'react';
import { generateStudyMaterial } from '../services/ai';
import { repairJSON } from '../utils/jsonRepair';
import { validateStudyForgeSchema } from '../utils/jsonValidator';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const abortControllerRef = useRef(null);

  const generate = useCallback(async (notes, options = {}) => {
    if (!notes || !notes.trim()) {
      setError('Please enter study notes or a topic.');
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const rawResponse = await generateStudyMaterial(notes, options, controller.signal);
      const repaired = repairJSON(rawResponse);
      const validated = validateStudyForgeSchema(repaired);

      setData(validated);
      setError(null);
      return validated;
    } catch (err) {
      if (err.name === 'AbortError' || err.message === 'Request was canceled.') {
        return;
      }
      setError(err.message || 'Failed to generate study materials.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, generate, reset, setData };
}
