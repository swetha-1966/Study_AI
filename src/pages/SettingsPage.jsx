import React, { useState } from 'react';
import { useSettings } from '../features/settings/hooks/useSettings';
import { SettingsHeader } from '../features/settings/components/SettingsHeader';
import { AppearanceSettings } from '../features/settings/components/AppearanceSettings';
import { LearningPreferences } from '../features/settings/components/LearningPreferences';
import { AISettings } from '../features/settings/components/AISettings';
import { NotificationSettings } from '../features/settings/components/NotificationSettings';
import { AccessibilitySettings } from '../features/settings/components/AccessibilitySettings';
import { PrivacySettings } from '../features/settings/components/PrivacySettings';
import { StorageSettings } from '../features/settings/components/StorageSettings';
import { KeyboardShortcuts } from '../features/settings/components/KeyboardShortcuts';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('appearance');
  const { settings, updateSettings } = useSettings();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-sans">
      <SettingsHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="pt-2">
        {activeTab === 'appearance' && <AppearanceSettings settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'learning' && <LearningPreferences settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'ai' && <AISettings settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'notifications' && <NotificationSettings settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'accessibility' && <AccessibilitySettings settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'privacy' && <PrivacySettings />}
        {activeTab === 'storage' && <StorageSettings />}
        {activeTab === 'shortcuts' && <KeyboardShortcuts />}
      </div>
    </div>
  );
}
