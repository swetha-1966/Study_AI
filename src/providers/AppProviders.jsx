import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../context/ThemeContext';
import { NotificationProvider } from '../context/NotificationContext';
import { SessionProvider } from '../context/SessionContext';
import { QuizProvider } from '../context/QuizContext';
import { queryClient } from '../config/queryClient';

/**
 * AppProviders — wraps the entire application with all global context providers.
 * Add new providers here instead of polluting App.jsx or main.jsx.
 *
 * Order matters: outer providers can be consumed by inner providers.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NotificationProvider>
          <SessionProvider>
            <QuizProvider>
              {children}
            </QuizProvider>
          </SessionProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
