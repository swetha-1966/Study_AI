import React, { useState } from 'react';
import { Info, Sparkles, HelpCircle } from 'lucide-react';
import { fetchAIExplanation } from '../services/quizApi';

export function ExplanationPanel({ questionData, userAnswer }) {
  const [extraExplanation, setExtraExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchExplanation = async () => {
    setLoading(true);
    const data = await fetchAIExplanation(
      questionData.question,
      userAnswer,
      questionData.correctAnswer
    );
    setExtraExplanation(data);
    setLoading(false);
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>Detailed Concept Explanation</span>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleFetchExplanation}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-300 hover:text-white text-[11px] font-semibold transition-all"
        >
          <Sparkles className="w-3 h-3" />
          <span>{loading ? 'Analyzing...' : 'AI Simpler Breakdown'}</span>
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {questionData.explanation}
      </p>

      {extraExplanation && (
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 space-y-1">
          <span className="font-bold text-indigo-300 block">AI Memory Tip:</span>
          <p>{extraExplanation.memoryTip}</p>
        </div>
      )}
    </div>
  );
}
