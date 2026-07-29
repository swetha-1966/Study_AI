import React, { useState } from 'react';
import { TopicInput } from './TopicInput';
import { DifficultySelector } from './DifficultySelector';
import { ContentSelector } from './ContentSelector';
import { QuestionSelector } from './QuestionSelector';
import { GenerateButton } from './GenerateButton';
import { RecentTopics } from './RecentTopics';
import { validateGeneratorInput } from '../utils/validation';

export function GeneratorForm({ onSubmit, loading }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [quizCount, setQuizCount] = useState(5);
  const [contentTypes, setContentTypes] = useState({
    summary: true,
    flashcards: true,
    quiz: true,
    revision: true,
    memory_tricks: true,
    interview_questions: true,
  });
  const [errors, setErrors] = useState({});

  const handleToggleModule = (key, val) => {
    setContentTypes((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateGeneratorInput(topic, contentTypes);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const selectedModules = Object.keys(contentTypes).filter((k) => contentTypes[k]);
    onSubmit(topic.trim(), {
      difficulty,
      quizCount,
      cardCount: 4,
      contentTypes: selectedModules,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 font-sans">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-display">
            Create Study Session
          </h2>
          <p className="text-xs text-slate-400">Generate AI flashcards, quizzes, and summaries in seconds.</p>
        </div>

        <TopicInput
          topic={topic}
          onChange={(val) => {
            setTopic(val);
            if (errors.topic) setErrors((prev) => ({ ...prev, topic: null }));
          }}
          onClear={() => setTopic('')}
          error={errors.topic}
          disabled={loading}
        />

        <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />

        <QuestionSelector quizCount={quizCount} onChange={setQuizCount} />

        <ContentSelector
          contentTypes={contentTypes}
          onChange={handleToggleModule}
          error={errors.contentTypes}
        />

        <div className="pt-2">
          <GenerateButton loading={loading} disabled={!topic.trim()} />
        </div>

        <RecentTopics onSelectTopic={(t) => setTopic(t)} />
      </div>
    </form>
  );
}
