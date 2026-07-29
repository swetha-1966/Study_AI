import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '../../../hooks/useSpeech';

export function TextToSpeech({ textToRead }) {
  const { speak, stop, isSpeaking } = useSpeech();

  return (
    <button
      type="button"
      onClick={() => (isSpeaking ? stop() : speak(textToRead))}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
        isSpeaking
          ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
          : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
      }`}
    >
      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
      <span>{isSpeaking ? 'Stop Reading' : 'Listen Summary'}</span>
    </button>
  );
}
