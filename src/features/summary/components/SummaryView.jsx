import React, { useState } from 'react';
import { SummaryHeader } from './SummaryHeader';
import { TableOfContents } from './TableOfContents';
import { KeyTakeaways } from './KeyTakeaways';
import { BookOpen, Lightbulb, CheckCircle2, Bookmark, Copy } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';

export function SummaryView({ summary }) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [copied, setCopied] = useState(false);

  if (!summary) {
    return <div className="text-center py-10 text-slate-400">No summary available for this session.</div>;
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(summary.overview || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      <SummaryHeader topic="Executive Topic Breakdown" overview={summary.overview} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Table of Contents Column */}
        <div className="space-y-4">
          <TableOfContents
            activeIndex={activeSectionIdx}
            onSelectSection={(idx) => setActiveSectionIdx(idx)}
          />

          {/* Mnemonics Card */}
          {summary.mnemonics && summary.mnemonics.length > 0 && (
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Lightbulb className="w-4 h-4 text-pink-400" />
                <span>Memory Trick / Mnemonic</span>
              </div>
              <p className="text-xs text-indigo-300 font-medium bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {summary.mnemonics[0]}
              </p>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Main Overview Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Comprehensive Architectural Breakdown
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleBookmark('section_1')}
                  className={`p-1.5 rounded-xl transition-colors ${
                    bookmarks.includes('section_1')
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes('section_1') ? 'fill-amber-400' : ''}`} />
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
              {summary.overview}
            </p>
          </div>

          <KeyTakeaways takeaways={summary.keyTakeaways} />
        </div>
      </div>
    </div>
  );
}
