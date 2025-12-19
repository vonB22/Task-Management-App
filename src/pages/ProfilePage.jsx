import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * ProfilePage Component
 * User profile information and settings
 */
const ProfilePage = () => {
  const { user, getUserInitials } = useAuth();
  const [tasks] = useLocalStorage('tasks', []);

  // Calculate user statistics
  const userStats = useMemo(() => {
    const userTasks = tasks.filter(task => task.createdBy === user?.name);
    const completed = userTasks.filter(task => task.status === 'done' || task.status === 'Done').length;
    const inProgress = userTasks.filter(task => task.status === 'inProgress' || task.status === 'In Progress').length;
    
    return {
      created: userTasks.length,
      completed,
      inProgress
    };
  }, [tasks, user?.name]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-amber-950">Profile</h1>
        <p className="text-amber-600 mt-1">Manage your account information</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden"
      >
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
              <span className="text-white font-bold text-4xl">
                {getUserInitials()}
              </span>
            </div>
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-amber-950">{user?.name || 'User'}</h2>
              <p className="text-amber-600">{user?.email || 'user@example.com'}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {user?.role || 'Member'}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 bg-orange-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 bg-orange-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Role</label>
                <input
                  type="text"
                  value={user?.role || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 bg-orange-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Member Since</label>
                <input
                  type="text"
                  value="January 2024"
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 bg-orange-50 text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="p-6 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{userStats.created}</p>
              <p className="text-sm text-amber-600">Tasks Created</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{userStats.completed}</p>
              <p className="text-sm text-amber-600">Tasks Completed</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{userStats.inProgress}</p>
              <p className="text-sm text-amber-600">In Progress</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
