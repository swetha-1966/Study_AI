import { useState } from 'react';

export function useRevision(session) {
  const [focusMode, setFocusMode] = useState(false);
  return {
    focusMode,
    toggleFocusMode: () => setFocusMode((prev) => !prev),
    topic: session?.topic || 'Operating Systems',
    wrongQuestions: session?.wrongQuestions || [],
  };
}
