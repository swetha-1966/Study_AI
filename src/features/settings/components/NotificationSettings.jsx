import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

export function NotificationSettings({ settings, updateSettings }) {
  const toggleNotification = (key) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications?.[key],
      },
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
        <Bell className="w-4 h-4 text-indigo-400" />
        Notification Alerts & Reminders
      </h3>

      <div className="space-y-3">
        {[
          { key: 'studyReminders', title: 'Daily Study Reminders', desc: 'Receive gentle daily notifications to maintain your study streak' },
          { key: 'weeklyProgress', title: 'Weekly Progress Digest', desc: 'Summary of questions answered, hours studied, and accuracy scores' },
          { key: 'achievementAlerts', title: 'Achievement & Badge Alerts', desc: 'Get notified immediately when unlocking new milestone badges' },
          { key: 'goalCompleted', title: 'Goal Completion Alerts', desc: 'Alert when completing weekly study hour goals' },
        ].map((item) => {
          const isEnabled = Boolean(settings.notifications?.[item.key]);
          return (
            <div key={item.key} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification(item.key)}
                className={`w-11 h-6 rounded-full transition-colors p-1 ${
                  isEnabled ? 'bg-indigo-600' : 'bg-slate-800'
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
