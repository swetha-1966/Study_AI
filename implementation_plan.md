# Shared Layer Migration & Core Integration Plan

## Goal
Migrate reusable UI primitives, hooks, utils, and constants into a unified `src/shared/` layer and integrate core utilities (routing, theme tokens, caching) throughout the application. This completes Phase G‑I of the Enterprise Architecture refactor, delivering a clean separation between feature‑specific code and shared infrastructure.

## User Review Required
> [!IMPORTANT]
> The following changes affect import paths across many components. Ensure the project builds after updating imports.
>
> - **Component imports**: All previous imports from `src/components/...` will be replaced with `src/shared/components/...`.
> - **Hook imports**: Hooks will move from `src/hooks` to `src/shared/hooks`.
> - **Utility imports**: Utilities will move from `src/utils` to `src/shared/utils`.
> - **Constants**: Global constants will be accessed via `src/shared/constants`.
> - **Theme tokens**: Updated to use the new token system in `src/core/theme/tokens.js`.
> - **Cache usage**: Introduce `MemoryCache` via `src/cache` for AI response and analytics caching.
>
> Please confirm you are ready to proceed with these sweeping import updates, or let me know if you prefer a phased rollout.

## Open Questions
> [!WARNING]
> 1. **Styling framework**: The project currently uses Tailwind utility classes embedded in components. Should we also expose a `src/shared/styles` directory with CSS custom properties derived from the token system, or keep Tailwind strings directly?
> 2. **Theme provider**: Do you want a dedicated `ThemeProvider` (wrapping `ThemeContext`) placed under `src/core/providers` to centralize dark/light/system theme handling?
> 3. **Cache granularity**: Which APIs should be cached by default? Suggested: `AIProvider.generateResponse`, `AnalyticsRepository.fetchStats`.
> 4. **Testing strategy**: Would you like us to add unit tests for the new shared hooks and cache module now?

## Proposed Changes
---
### Shared Layer
#### [NEW] `src/shared/components/index.js`
- Barrel file exporting all UI primitives (Button, Card, Modal, etc.).

#### [NEW] `src/shared/hooks/index.js`
- Export hooks such as `useTheme`, `useMediaQuery` (future).

#### [NEW] `src/shared/utils/index.js`
- Export generic utilities (debounce, formatDate, etc.).

#### [NEW] `src/shared/constants/index.js`
- Export design token references, API endpoint constants, and feature flags.

#### [MODIFY] Move existing UI components
- Relocate files from `src/components/ui/*` to `src/shared/components/*` preserving filenames.
- Update import statements across the codebase to use the new barrel (`import { Button } from '@/shared/components';`).

#### [MODIFY] Adjust feature imports
- For each feature (`quiz`, `flashcards`, `revision`, `analytics`, `settings`, `history`, `profile`), replace direct UI component imports with the shared barrel.

---
### Core Layer
#### [NEW] `src/core/router/routes.js` *(already created)*
- Centralized route constants and guard utilities.

#### [NEW] `src/core/theme/tokens.js` *(already created)*
- Design token definition.

#### [NEW] `src/core/providers/AppProviders.jsx`
- Wraps the app with Context providers, ThemeProvider, React‑Query `QueryClientProvider`, and any error boundaries.

---
### Caching Layer
#### [NEW] `src/cache/MemoryCache.js` *(already created)*
- In‑memory LRU cache with TTL.

#### [NEW] `src/cache/CacheManager.js`
- Singleton exposing caches for AI, analytics, and generic data.

#### [NEW] `src/cache/index.js`
- Export caches for easy import (`import { aiCache } from '@/cache';`).

---
### Integration Points
#### Feature Repositories
- Inject caches where appropriate (e.g., `AIProvider` checks `aiCache` before calling the API).

#### Theme Settings Component
- Update `ThemeSettings.jsx` to import `theme` tokens from `src/core/theme/tokens.js` for consistent colors.

#### Global Styles
- Add a CSS file `src/shared/styles/tokens.css` that maps token values to CSS custom properties for use in non‑Tailwind contexts.

## Verification Plan
### Automated Tests
- Run `npm run test` after import updates to ensure no broken references.
- Execute `npm run build` to verify TypeScript/JSX compilation.

### Manual Verification
- Launch the dev server (`npm run dev`) and manually navigate through each feature page ensuring UI renders correctly.
- Toggle theme in Settings and confirm dark/light/system colors update.
- Verify AI response caching by triggering the same AI request twice and observing network logs (second call should hit cache).

---
**Next Steps**
1. Await user approval to apply the above changes.
2. Upon approval, execute the migration and run verification.

*Implementation plan created. Please review and approve or provide feedback.*
