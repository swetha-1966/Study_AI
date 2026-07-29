import React from 'react';
import { BookOpen, CheckSquare, Target } from 'lucide-react';

export function LearningPreferences({ settings, updateSettings }) {
  const toggleModule = (key) => {
    updateSettings({
      defaultModules: {
        ...settings.defaultModules,
        [key]: !settings.defaultModules?.[key],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Default Difficulty & Quiz Length */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          Default Generation Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Default Target Depth</label>
            <select
              value={settings.defaultDifficulty}
              onChange={(e) => updateSettings({ defaultDifficulty: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Foundational">Foundational Concepts</option>
              <option value="Intermediate">Intermediate Architecture</option>
              <option value="Advanced">Advanced Deep-Dive</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Default Quiz Questions</label>
            <select
              value={settings.defaultQuizCount}
              onChange={(e) => updateSettings({ defaultQuizCount: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value={3}>3 Questions</option>
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Weekly Target Goal</label>
            <select
              value={settings.weeklyGoalHours}
              onChange={(e) => updateSettings({ weeklyGoalHours: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value={3}>3 Hours / Week</option>
              <option value={5}>5 Hours / Week</option>
              <option value={10}>10 Hours / Week</option>
            </select>
          </div>
        </div>
      </div>

      {/* Included Content Modules Checkboxes */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-purple-400" />
          Included Study Modules
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { key: 'summary', label: 'Executive Summary' },
            { key: 'flashcards', label: '3D Flashcards' },
            { key: 'quiz', label: 'Scenario Quiz' },
            { key: 'revision', label: 'Revision Notes' },
            { key: 'mnemonics', label: 'Memory Tricks' },
            { key: 'interview', label: 'Interview Questions' },
          ].map((item) => {
            const isChecked = Boolean(settings.defaultModules?.[item.key]);
            return (
              <label
                key={item.key}
                onClick={() => toggleModule(item.key)}
                className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 text-xs font-medium transition-all ${
                  isChecked
                    ? 'bg-indigo-600/10 border-indigo-500/80 text-indigo-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
