import React from 'react';
import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './routes/AppRouter';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

/**
 * App — Root application component.
 * Wraps everything in providers and a global error boundary.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
}
