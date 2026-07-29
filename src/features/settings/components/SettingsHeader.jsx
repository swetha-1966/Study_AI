import React from 'react';
import { Sliders, Sun, BookOpen, Brain, Bell, Shield, HardDrive, Command, Eye } from 'lucide-react';

export function SettingsHeader({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'ai', label: 'AI Engine', icon: Brain },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility', icon: Eye },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'shortcuts', label: 'Shortcuts', icon: Command },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 font-display">
            Settings & Personalization
          </h2>
          <p className="text-xs text-slate-400">Manage theme, font size, AI prompts, notifications, and accessibility.</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
