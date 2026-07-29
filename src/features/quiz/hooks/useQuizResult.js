import { useMemo } from 'react';
import { calculateQuizScore } from '../utils/scoring';

export function useQuizResult(deck, answers) {
  return useMemo(() => calculateQuizScore(deck, answers), [deck, answers]);
}
