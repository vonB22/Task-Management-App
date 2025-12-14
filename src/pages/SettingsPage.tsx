import React from 'react';
import { Sun, Zap, Layout, Save, RotateCcw } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Label } from '../components/Label';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { UserSettings } from '../types';
import { FadeUp } from '../components/ui/motion';

const DEFAULT_SETTINGS: UserSettings = {
  version: 1,
  theme: 'system',
  animations: {
    enabled: true,
    speed: 'normal',
    pageTransitions: true,
    hoverEffects: true,
    modalAnimations: true,
  },
  display: {
    viewMode: 'grid',
    compactView: false,
    showCompleted: true,
    tasksPerPage: 12,
  },
};

export const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [settings, setSettings] = useLocalStorage<UserSettings>('taskapp_settings', DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [tempSettings, setTempSettings] = React.useState<UserSettings>(settings);

  const handleChange = (key: keyof UserSettings | string, value: any) => {
    setHasChanges(true);
    
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setTempSettings({
        ...tempSettings,
        [parent]: {
          ...(tempSettings[parent as keyof UserSettings] as any),
          [child]: value,
        },
      });
    } else {
      setTempSettings({
        ...tempSettings,
        [key]: value,
      });
    }
  };

  const handleSave = () => {
    setSettings(tempSettings);
    setHasChanges(false);
    
    // Apply theme if changed
    if (tempSettings.theme !== settings.theme) {
      if (tempSettings.theme === 'dark' && !isDarkMode) {
        toggleTheme();
      } else if (tempSettings.theme === 'light' && isDarkMode) {
        toggleTheme();
      } else if (tempSettings.theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark !== isDarkMode) {
          toggleTheme();
        }
      }
    }
  };

  const handleReset = () => {
    setTempSettings(DEFAULT_SETTINGS);
    setHasChanges(true);
  };

  return (
    <FadeUp className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Customize your Task Management experience
          </p>
        </div>
        {hasChanges && (
          <div className="flex gap-2 self-start sm:self-auto">
            <Button 
              variant="secondary" 
              onClick={() => {
                setTempSettings(settings);
                setHasChanges(false);
              }}
              size="sm"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save size={16} />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Appearance */}
      <Card className="transition-shadow duration-150">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
              <Sun size={18} className="sm:w-5 sm:h-5" />
              Appearance
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              Customize how the app looks
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-sm">Theme</Label>
              <Select
                id="theme"
                value={tempSettings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="viewMode">Default View</Label>
              <Select
                id="viewMode"
                value={tempSettings.display.viewMode}
                onChange={(e) => handleChange('display.viewMode', e.target.value)}
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
              </Select>
            </div>

            <label className="flex items-center justify-between p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm active:scale-[0.99]">
              <div className="flex-1 pr-4">
                <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">Compact View</p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Show more items per page</p>
              </div>
              <input
                type="checkbox"
                checked={tempSettings.display.compactView}
                onChange={(e) => handleChange('display.compactView', e.target.checked)}
                className="rounded transition-colors duration-150"
              />
            </label>

            <label className="flex items-center justify-between p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm active:scale-[0.99]">
              <div className="flex-1 pr-4">
                <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">Show Completed Tasks</p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Display completed tasks by default</p>
              </div>
              <input
                type="checkbox"
                checked={tempSettings.display.showCompleted}
                onChange={(e) => handleChange('display.showCompleted', e.target.checked)}
                className="rounded"
              />
            </label>
          </div>
        </div>
      </Card>

      {/* Animations */}
      <Card className="transition-shadow duration-150">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
              <Zap size={18} className="sm:w-5 sm:h-5" />
              Animations
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              Control animation preferences
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <label className="flex items-center justify-between p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm active:scale-[0.99]">
              <div className="flex-1 pr-4">
                <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">Enable Animations</p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Turn animations on or off</p>
              </div>
              <input
                type="checkbox"
                checked={tempSettings.animations.enabled}
                onChange={(e) => handleChange('animations.enabled', e.target.checked)}
                className="rounded"
              />
            </label>

            {tempSettings.animations.enabled && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="animSpeed" className="text-sm">Animation Speed</Label>
                  <Select
                    id="animSpeed"
                    value={tempSettings.animations.speed}
                    onChange={(e) => handleChange('animations.speed', e.target.value)}
                    size="sm"
                  >
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                  </Select>
                </div>

                <label className="flex items-center justify-between p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm active:scale-[0.99]">
                  <span className="text-sm sm:text-base text-neutral-900 dark:text-white">Page Transitions</span>
                  <input
                    type="checkbox"
                    checked={tempSettings.animations.pageTransitions}
                    onChange={(e) => handleChange('animations.pageTransitions', e.target.checked)}
                    className="rounded transition-colors duration-150"
                  />
                </label>

                <label className="flex items-center justify-between p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm active:scale-[0.99]">
                  <span className="text-sm sm:text-base text-neutral-900 dark:text-white">Hover Effects</span>
                  <input
                    type="checkbox"
                    checked={tempSettings.animations.hoverEffects}
                    onChange={(e) => handleChange('animations.hoverEffects', e.target.checked)}
                    className="rounded transition-colors duration-150"
                  />
                </label>

                <label className="flex items-center justify-between p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer transition-all duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm active:scale-[0.99]">
                  <span className="text-sm sm:text-base text-neutral-900 dark:text-white">Modal Animations</span>
                  <input
                    type="checkbox"
                    checked={tempSettings.animations.modalAnimations}
                    onChange={(e) => handleChange('animations.modalAnimations', e.target.checked)}
                    className="rounded"
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Display */}
      <Card className="transition-shadow duration-150">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
              <Layout size={18} className="sm:w-5 sm:h-5" />
              Display
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              Configure display preferences
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tasksPerPage" className="text-sm">Tasks Per Page</Label>
              <Select
                id="tasksPerPage"
                value={tempSettings.display.tasksPerPage.toString()}
                onChange={(e) => handleChange('display.tasksPerPage', parseInt(e.target.value))}
                size="sm"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-start sm:justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <Button variant="outline" onClick={handleReset} size="sm" className="w-full sm:w-auto">
          <RotateCcw size={16} />
          Reset to Defaults
        </Button>
      </div>
    </FadeUp>
  );
};
