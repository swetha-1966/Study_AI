import React from 'react';
import { Eye, ShieldCheck } from 'lucide-react';

export function AccessibilitySettings({ settings, updateSettings }) {
  const toggleAcc = (key) => {
    updateSettings({
      accessibility: {
        ...settings.accessibility,
        [key]: !settings.accessibility?.[key],
      },
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
        <Eye className="w-4 h-4 text-emerald-400" />
        Accessibility & Assistive Mode Controls
      </h3>

      <div className="space-y-3">
        {[
          { key: 'highContrast', title: 'High Contrast Mode', desc: 'Increase contrast ratio between text and background elements (WCAG 2.2 AA Compliance)' },
          { key: 'largeText', title: 'Enlarged Interface Text', desc: 'Scale up base typography for easier legibility across all study screens' },
          { key: 'keyboardNavigation', title: 'Full Focus Ring Indicators', desc: 'Enhance focus rings for keyboard users navigating via Tab key' },
        ].map((item) => {
          const isEnabled = Boolean(settings.accessibility?.[item.key]);
          return (
            <div key={item.key} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleAcc(item.key)}
                className={`w-11 h-6 rounded-full transition-colors p-1 ${
                  isEnabled ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
