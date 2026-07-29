export className = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  GENERATE: '/generate',
  SESSION: (id = ':id') => `/session/${id}`,
  FLASHCARDS: (id = ':id') => `/flashcards/${id}`,
  QUIZ: (id = ':id') => `/quiz/${id}`,
  SUMMARY: (id = ':id') => `/summary/${id}`,
  HISTORY: '/history',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  PROFILE: '/profile',
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  GENERATE: '/generate',
  SESSION: '/session/:id',
  FLASHCARDS: '/flashcards/:id',
  QUIZ: '/quiz/:id',
  SUMMARY: '/summary/:id',
  HISTORY: '/history',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  PROFILE: '/profile',
};
