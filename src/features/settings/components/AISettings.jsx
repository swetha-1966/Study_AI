import React from 'react';
import { Brain, Sparkles, MessageSquare } from 'lucide-react';

export function AISettings({ settings, updateSettings }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" />
          AI Generation Tone & Style Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Preferred AI Tone</label>
            <select
              value={settings.preferredTone}
              onChange={(e) => updateSettings({ preferredTone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Simple">Simple & Concise</option>
              <option value="Balanced">Balanced Academic</option>
              <option value="Detailed">Exhaustive Technical</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Content Perspective Style</label>
            <select
              value={settings.contentStyle}
              onChange={(e) => updateSettings({ contentStyle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Academic">University Academic</option>
              <option value="Interview">Senior Engineering Interview</option>
              <option value="Exam">Certification Exam Prep</option>
              <option value="Beginner">Beginner Primer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Explanation Detail Level</label>
            <select
              value={settings.aiResponseLength}
              onChange={(e) => updateSettings({ aiResponseLength: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Short">Compact Bullet Points</option>
              <option value="Medium">Standard Explanations</option>
              <option value="Detailed">Multi-Paragraph Deep Dive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
