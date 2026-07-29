/**
 * shared/index.js — Top-level shared layer barrel.
 *
 * Import shared code from here for the cleanest import paths:
 *   import { Button, useModal, debounce, APP_NAME } from '@/shared';
 */
export * from './components/index';
export * from './hooks/index';
// Note: utils and constants not re-exported at top level to avoid name collisions.
// Import from @/shared/utils or @/shared/constants directly.
