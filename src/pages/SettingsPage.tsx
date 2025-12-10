import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Settings</h2>

      <Card className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Appearance</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Customize how TaskFlow looks</p>

          <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Toggle dark theme</p>
            </div>
            <Button
              variant={isDarkMode ? 'primary' : 'secondary'}
              onClick={toggleTheme}
            >
              {isDarkMode ? 'On' : 'Off'}
            </Button>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Notifications</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Manage your notification preferences</p>

          <div className="space-y-3">
            <label className="flex items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="ml-3 text-neutral-900 dark:text-white">Email notifications</span>
            </label>
            <label className="flex items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="ml-3 text-neutral-900 dark:text-white">Task reminders</span>
            </label>
            <label className="flex items-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
              <input type="checkbox" className="rounded" />
              <span className="ml-3 text-neutral-900 dark:text-white">Weekly summary</span>
            </label>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Account</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">Manage your account settings</p>

          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              Change Password
            </Button>
            <Button variant="secondary" className="w-full">
              Download My Data
            </Button>
            <Button variant="danger" className="w-full">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
