/**
 * endpoints.js — All API endpoint constants in one place.
 * Changing a backend route = editing this file only.
 */

const BASE = '/api/v1';

export const API_ENDPOINTS = {
  /** Health check */
  HEALTH: `${BASE}/health`,

  /** Study material generation */
  GENERATE: `${BASE}/generate`,
  STUDY: '/api/study', // legacy alias

  /** AI explanation for quiz answers */
  EXPLAIN: `${BASE}/explain`,

  /** Analytics data */
  ANALYTICS: `${BASE}/analytics`,

  /** Future endpoints */
  SESSIONS: `${BASE}/sessions`,
  PROFILE: `${BASE}/profile`,
  ACHIEVEMENTS: `${BASE}/achievements`,
};
