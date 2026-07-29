/**
 * core/router/routes.js — Named route constants and route guard utilities.
 * Centralises all route strings to prevent magic strings in components.
 */

export const ROUTES = Object.freeze({
  LANDING: 'landing',
  DASHBOARD: 'dashboard',
  CREATE: 'create',
  PROCESSING: 'processing',
  STUDY: 'study',
  ANALYTICS: 'analytics',
  REVISION: 'revision',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  HISTORY: 'history',
  NOT_FOUND: '404',
});

/**
 * Routes that require an active study session to access.
 */
export const SESSION_REQUIRED_ROUTES = new Set([
  ROUTES.STUDY,
  ROUTES.REVISION,
]);

/**
 * Check if a route requires an active session.
 * @param {string} route
 * @returns {boolean}
 */
export function requiresSession(route) {
  return SESSION_REQUIRED_ROUTES.has(route);
}

/**
 * Map a route to its display title.
 * @param {string} route
 * @returns {string}
 */
export function getRouteTitle(route) {
  const titles = {
    [ROUTES.LANDING]: 'StudyForge AI',
    [ROUTES.DASHBOARD]: 'Dashboard',
    [ROUTES.CREATE]: 'Generate Study Material',
    [ROUTES.PROCESSING]: 'Generating...',
    [ROUTES.STUDY]: 'Study Session',
    [ROUTES.ANALYTICS]: 'Analytics',
    [ROUTES.REVISION]: 'Revision Hub',
    [ROUTES.PROFILE]: 'Profile',
    [ROUTES.SETTINGS]: 'Settings',
    [ROUTES.HISTORY]: 'Session History',
  };
  return titles[route] || 'StudyForge AI';
}
