import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * SettingsPage Component
 * Application settings and preferences
 */
const SettingsPage = () => {
  const { user, updatePreferences } = useAuth();
  const { preferences: notifPrefs, updatePreferences: updateNotifPrefs } = useNotifications();
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-amber-950">Settings</h1>
        <p className="text-amber-600 mt-1">Customize your Taskler experience</p>
      </motion.div>

      {/* Settings Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-amber-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-amber-700 hover:bg-orange-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || ''}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 bg-white text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 bg-white text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-amber-950">Email Notifications</p>
                      <p className="text-sm text-amber-600">Receive email updates about your tasks</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-amber-950">Auto-save Tasks</p>
                      <p className="text-sm text-amber-600">Automatically save task changes</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Data Management</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-amber-200 bg-orange-50">
                    <p className="font-medium text-amber-950 mb-2">Generate Sample Data</p>
                    <p className="text-sm text-amber-600 mb-4">Add 10 sample tasks to test the application (will replace existing tasks)</p>
                    <button
                      onClick={() => {
                        const generateTaskId = () => `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                        const sampleTasks = [
                          {
                            id: generateTaskId(),
                            title: 'Complete project documentation',
                            description: 'Write comprehensive documentation for the new feature release',
                            priority: 'High',
                            status: 'In Progress',
                            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Review pull requests',
                            description: 'Review and merge pending code changes from team members',
                            priority: 'High',
                            status: 'Backlog',
                            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Update dependencies',
                            description: 'Update all npm packages to latest stable versions',
                            priority: 'Medium',
                            status: 'Backlog',
                            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Fix responsive design issues',
                            description: 'Address mobile layout problems on the dashboard page',
                            priority: 'High',
                            status: 'In Progress',
                            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Implement search feature',
                            description: 'Add global search functionality across tasks',
                            priority: 'Low',
                            status: 'Backlog',
                            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Write unit tests',
                            description: 'Increase test coverage for core components',
                            priority: 'Medium',
                            status: 'Done',
                            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Optimize database queries',
                            description: 'Improve performance of slow-running queries',
                            priority: 'Medium',
                            status: 'In Progress',
                            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Design new landing page',
                            description: 'Create mockups for refreshed marketing page',
                            priority: 'Low',
                            status: 'Done',
                            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Set up CI/CD pipeline',
                            description: 'Configure automated testing and deployment',
                            priority: 'High',
                            status: 'Done',
                            createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                          },
                          {
                            id: generateTaskId(),
                            title: 'Conduct user research',
                            description: 'Interview users to gather feedback on new features',
                            priority: 'Medium',
                            status: 'Backlog',
                            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                            updatedAt: new Date().toISOString()
                          }
                        ];
                        setTasks(sampleTasks);
                        alert('✅ Sample data generated successfully! Check your Dashboard or Tasks page.');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium"
                    >
                      Generate Sample Data
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                    <p className="font-medium text-red-700 mb-2">Clear All Data</p>
                    <p className="text-sm text-red-600 mb-4">Delete all tasks permanently</p>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
                          setTasks([]);
                          showToast({
                            title: 'All Tasks Cleared',
                            message: 'All tasks have been permanently deleted',
                            type: 'success'
                          });
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
                    >
                      Clear All Tasks
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-amber-950">Sound Notifications</p>
                      <p className="text-sm text-amber-600">Play sound for new notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPrefs.sound}
                      onChange={(e) => updateNotifPrefs({ sound: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-amber-950">Do Not Disturb</p>
                      <p className="text-sm text-amber-600">Mute all notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPrefs.doNotDisturb}
                      onChange={(e) => updateNotifPrefs({ doNotDisturb: e.target.checked })}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Notification Types</h3>
                <div className="space-y-4">
                  {notifPrefs && Object.entries(notifPrefs).filter(([key]) => key !== 'sound' && key !== 'frequency' && key !== 'doNotDisturb').map(([type, enabled]) => (
                    <label key={type} className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-amber-950 capitalize">
                          {type.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-amber-600">
                          Receive notifications for {type.replace('_', ' ')} events
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => updateNotifPrefs({
                          ...notifPrefs,
                          [type]: e.target.checked
                        })}
                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border-2 border-orange-500 bg-orange-50 cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded"></div>
                      <p className="font-medium text-amber-950">Warm Theme</p>
                    </div>
                    <p className="text-sm text-amber-600">Current theme with warm orange tones</p>
                  </div>
                  <div className="p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer opacity-50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded"></div>
                      <p className="font-medium text-amber-950">Dark Theme</p>
                    </div>
                    <p className="text-sm text-amber-600">Coming soon...</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <h3 className="text-lg font-semibold text-amber-950 mb-4">Display Options</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-amber-950">Smooth Animations</p>
                      <p className="text-sm text-amber-600">Enable smooth transitions and effects</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-amber-950">Compact View</p>
                      <p className="text-sm text-amber-600">Show more content with reduced spacing</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Save Button */}
        <div className="px-6 py-4 bg-orange-50 border-t border-amber-200 flex justify-end">
          <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium">
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
