/**
 * core/theme/tokens.js — Design token system for StudyForge AI.
 *
 * Single source of truth for colors, spacing, typography, and animation.
 * These tokens map to Tailwind CSS classes and CSS custom properties.
 */

export const theme = Object.freeze({
  colors: {
    primary: {
      50: 'indigo-50',
      100: 'indigo-100',
      400: 'indigo-400',
      500: 'indigo-500',
      600: 'indigo-600',
      700: 'indigo-700',
    },
    accent: {
      400: 'violet-400',
      500: 'violet-500',
    },
    success: {
      400: 'emerald-400',
      500: 'emerald-500',
    },
    warning: {
      400: 'amber-400',
      500: 'amber-500',
    },
    danger: {
      400: 'red-400',
      500: 'red-500',
    },
    surface: {
      base: 'slate-950',
      elevated: 'slate-900',
      overlay: 'slate-800',
      border: 'slate-700',
      muted: 'slate-800',
    },
    text: {
      primary: 'slate-100',
      secondary: 'slate-400',
      muted: 'slate-500',
      inverse: 'white',
    },
  },

  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    full: 'rounded-full',
  },

  animation: {
    fast: '0.15s',
    normal: '0.25s',
    slow: '0.4s',
    spring: 'spring(1, 80, 10, 0)',
  },

  typography: {
    fontDisplay: 'font-display',
    fontSans: 'font-sans',
    fontMono: 'font-mono',
  },
});
