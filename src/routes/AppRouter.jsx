import React, { useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { CommandPalette } from '../components/Common/CommandPalette';
import { HistoryView } from '../components/HistoryView';

import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { InputBox } from '../components/InputBox';
import { AIProcessingPage } from '../pages/AIProcessingPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { RevisionPage } from '../pages/RevisionPage';

import { SummaryView } from '../components/SummaryView';
import { FlashcardList } from '../components/FlashcardList';
import { Quiz } from '../components/Quiz';
import { ErrorCard } from '../components/ErrorCard';
import { exportToPDF, exportToJSON } from '../utils/exportPDF';

import { useAI } from '../hooks/useAI';
import { useSession } from '../context/SessionContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { BookOpen, Layers, HelpCircle, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AppRouter() {
  const [activeRoute, setActiveRoute] = useState('landing');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [studyTab, setStudyTab] = useState('summary');

  const { data, loading, error, generate, setData } = useAI();
  const { history, activeSession, loadSession, addCompletedSession, removeSession } = useSession();

  useKeyboard({
    'Ctrl+K': () => setIsCommandOpen(true),
  });

  const handleGenerateSubmit = async (notes, options) => {
    setActiveRoute('processing');
    const result = await generate(notes, options);
    if (result) {
      addCompletedSession({
        topic: notes.trim().slice(0, 50),
        summary: result.summary,
        flashcards: result.flashcards,
        quiz: result.quiz,
      });
      setStudyTab('summary');
      setActiveRoute('study');
    } else {
      setActiveRoute('create');
    }
  };

  const handleLoadSessionFromHistory = (session) => {
    loadSession(session);
    setData({
      summary: session.summary,
      flashcards: session.flashcards,
      quiz: session.quiz,
    });
    setStudyTab('summary');
    setActiveRoute('study');
  };

  const activeStudyData = data || (activeSession ? { summary: activeSession.summary, flashcards: activeSession.flashcards, quiz: activeSession.quiz } : null);
  const hasStudyData = Boolean(activeStudyData && activeStudyData.flashcards?.length > 0);

  return (
    <AppLayout
      activeRoute={activeRoute}
      onNavigate={(route) => setActiveRoute(route)}
      onOpenCommand={() => setIsCommandOpen(true)}
      onOpenHistory={() => setIsHistoryOpen(true)}
    >
      <AnimatePresence mode="wait">
        {activeRoute === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage
              onStart={() => setActiveRoute('create')}
              onDemo={() => handleGenerateSubmit('Operating Systems Scheduling', { difficulty: 'Intermediate' })}
            />
          </motion.div>
        )}

        {activeRoute === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DashboardPage onNavigate={(route) => setActiveRoute(route)} />
          </motion.div>
        )}

        {activeRoute === 'create' && (
          <motion.div key="create" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="space-y-6">
              {error && <ErrorCard message={error} onRetry={() => setActiveRoute('create')} />}
              <InputBox onSubmit={handleGenerateSubmit} loading={loading} />
            </div>
          </motion.div>
        )}

        {activeRoute === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AIProcessingPage onCancel={() => setActiveRoute('create')} />
          </motion.div>
        )}

        {activeRoute === 'revision' && (
          <motion.div key="revision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RevisionPage onNavigate={(route) => setActiveRoute(route)} />
          </motion.div>
        )}

        {activeRoute === 'study' && hasStudyData && (
          <motion.div key="study" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-display">
                    {activeSession?.topic || 'Study Session Deck'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeStudyData.flashcards.length} Flashcards • {activeStudyData.quiz.length} Quiz Questions
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800/80 w-full sm:w-auto">
                  {activeStudyData.summary && (
                    <button
                      type="button"
                      onClick={() => setStudyTab('summary')}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        studyTab === 'summary'
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Summary</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setStudyTab('flashcards')}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      studyTab === 'flashcards'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcards ({activeStudyData.flashcards.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudyTab('quiz')}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      studyTab === 'quiz'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Quiz ({activeStudyData.quiz.length})</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => exportToPDF(activeStudyData, activeSession?.topic || 'Study Session')}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
                    title="Export PDF"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => exportToJSON(activeStudyData, activeSession?.topic || 'study_deck')}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
                    title="Export JSON"
                  >
                    <FileText className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              {studyTab === 'summary' && <SummaryView summary={activeStudyData.summary} />}
              {studyTab === 'flashcards' && <FlashcardList flashcards={activeStudyData.flashcards} />}
              {studyTab === 'quiz' && <Quiz quiz={activeStudyData.quiz} />}
            </div>
          </motion.div>
        )}

        {activeRoute === 'analytics' && (
          <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalyticsPage />
          </motion.div>
        )}

        {activeRoute === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfilePage />
          </motion.div>
        )}

        {activeRoute === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SettingsPage />
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={(route) => setActiveRoute(route)}
      />

      <HistoryView
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadSession={handleLoadSessionFromHistory}
        onDeleteSession={removeSession}
      />
    </AppLayout>
  );
}
