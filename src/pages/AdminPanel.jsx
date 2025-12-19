import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ROLES } from '../config/permissions';

/**
 * AdminPanel Component
 * Admin-only dashboard for managing users and system settings
 */
const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Mock data - in production this would come from an API
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: ROLES.ADMIN, status: 'active', tasks: 15 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: ROLES.MANAGER, status: 'active', tasks: 23 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: ROLES.TEAM_MEMBER, status: 'active', tasks: 8 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: ROLES.VIEWER, status: 'inactive', tasks: 0 },
  ];

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return 'bg-red-100 text-red-700 border-red-200';
      case ROLES.MANAGER:
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case ROLES.TEAM_MEMBER:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case ROLES.VIEWER:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'active').length,
    totalTasks: mockUsers.reduce((sum, u) => sum + u.tasks, 0),
    admins: mockUsers.filter(u => u.role === ROLES.ADMIN).length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-amber-950">Admin Panel</h1>
        <p className="text-amber-600 mt-1">Manage users, roles, and system settings</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.totalUsers}</p>
              <p className="text-xs text-amber-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.activeUsers}</p>
              <p className="text-xs text-amber-600">Active Users</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.totalTasks}</p>
              <p className="text-xs text-amber-600">Total Tasks</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.admins}</p>
              <p className="text-xs text-amber-600">Administrators</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-amber-200">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'users'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                : 'text-amber-700 hover:bg-orange-50'
            }`}
          >
            👥 User Management
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'roles'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                : 'text-amber-700 hover:bg-orange-50'
            }`}
          >
            🔐 Role Permissions
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'system'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                : 'text-amber-700 hover:bg-orange-50'
            }`}
          >
            ⚙️ System Settings
          </button>
        </div>

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-amber-950">All Users</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md font-medium text-sm">
                + Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Tasks</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="border-b border-amber-100 hover:bg-orange-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">
                              {u.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-amber-950">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-amber-700">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(u.role)}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-amber-950 font-medium">{u.tasks}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-orange-600 hover:bg-orange-100 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Role Permissions Tab */}
        {activeTab === 'roles' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-amber-950 mb-6">Role Permission Matrix</h3>
            <div className="space-y-4">
              {Object.values(ROLES).map((role) => (
                <div key={role} className="p-4 rounded-lg border border-amber-200 bg-orange-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(role)}`}>
                      {role}
                    </span>
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      Edit Permissions
                    </button>
                  </div>
                  <p className="text-sm text-amber-700">
                    {role === ROLES.ADMIN && 'Full system access, user management, and all permissions'}
                    {role === ROLES.MANAGER && 'Task management for team, assign tasks, view team metrics'}
                    {role === ROLES.TEAM_MEMBER && 'Create, edit, and delete own tasks'}
                    {role === ROLES.VIEWER && 'Read-only access to tasks and dashboards'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === 'system' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-amber-950 mb-4">System Configuration</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-amber-950">Maintenance Mode</p>
                    <p className="text-sm text-amber-600">Temporarily disable user access</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                  />
                </label>
                <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-amber-950">Email Notifications</p>
                    <p className="text-sm text-amber-600">Enable system-wide email notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                  />
                </label>
                <label className="flex items-center justify-between p-4 rounded-lg border border-amber-200 hover:bg-orange-50 cursor-pointer">
                  <div>
                    <p className="font-medium text-amber-950">Auto Backup</p>
                    <p className="text-sm text-amber-600">Automatically backup data daily</p>
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
              <h3 className="text-lg font-semibold text-amber-950 mb-4">Danger Zone</h3>
              <div className="p-4 rounded-lg border-2 border-red-200 bg-red-50">
                <p className="font-medium text-red-700 mb-2">Clear All Data</p>
                <p className="text-sm text-red-600 mb-3">This will permanently delete all tasks and user data.</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                  Clear Database
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
