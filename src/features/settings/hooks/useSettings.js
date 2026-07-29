import { useState, useEffect, useCallback } from 'react';

const SETTINGS_KEY = 'studyforge_user_settings_v1';

const DEFAULT_SETTINGS = {
  theme: 'dark',
  fontSize: 'Medium', // 'Small' | 'Medium' | 'Large'
  readingWidth: 'Medium', // 'Narrow' | 'Medium' | 'Wide'
  animations: true,
  reduceMotion: false,

  defaultDifficulty: 'Intermediate', // 'Foundational' | 'Intermediate' | 'Advanced'
  defaultCardCount: 4,
  defaultQuizCount: 3,
  defaultModules: {
    summary: true,
    flashcards: true,
    quiz: true,
    revision: true,
    mnemonics: true,
    interview: true,
  },
  weeklyGoalHours: 5,

  preferredTone: 'Balanced', // 'Simple' | 'Balanced' | 'Detailed'
  contentStyle: 'Academic', // 'Academic' | 'Interview' | 'Exam' | 'Beginner'
  aiResponseLength: 'Medium', // 'Short' | 'Medium' | 'Detailed'

  notifications: {
    studyReminders: true,
    weeklyProgress: true,
    achievementAlerts: true,
    goalCompleted: true,
  },

  accessibility: {
    highContrast: false,
    largeText: false,
    keyboardNavigation: true,
  },
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(SETTINGS_KEY);
  }, []);

  return { settings, updateSettings, resetSettings };
}
