import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * AnalyticsPage Component
 * Displays comprehensive task analytics and statistics
 */
const AnalyticsPage = () => {
  const [tasks] = useLocalStorage('tasks', []);

  // Calculate comprehensive statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const backlog = tasks.filter(t => t.status === 'Backlog' || t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress' || t.status === 'inProgress').length;
    const done = tasks.filter(t => t.status === 'Done' || t.status === 'done').length;
    
    const highPriority = tasks.filter(t => t.priority === 'High' || t.priority === 'high').length;
    const mediumPriority = tasks.filter(t => t.priority === 'Medium' || t.priority === 'medium').length;
    const lowPriority = tasks.filter(t => t.priority === 'Low' || t.priority === 'low').length;
    
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;
    
    return {
      total,
      backlog,
      inProgress,
      done,
      highPriority,
      mediumPriority,
      lowPriority,
      completionRate
    };
  }, [tasks]);

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      title: 'Completed',
      value: stats.done,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700'
    },
    {
      title: 'Backlog',
      value: stats.backlog,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-amber-950">Analytics</h1>
        <p className="text-amber-600 mt-1">Track your productivity and task completion</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
            className="bg-white rounded-xl shadow-md border border-amber-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-sm font-medium text-amber-600 mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-amber-950">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Completion Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="bg-white rounded-xl shadow-md border border-amber-200 p-6"
      >
        <h2 className="text-xl font-bold text-amber-950 mb-4">Completion Rate</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                className="bg-gradient-to-r from-green-400 to-green-600 h-full flex items-center justify-center text-white font-semibold text-sm"
              >
                {stats.completionRate}%
              </motion.div>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.completionRate}%</div>
        </div>
        <p className="text-sm text-amber-600 mt-2">
          {stats.done} out of {stats.total} tasks completed
        </p>
      </motion.div>

      {/* Priority Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="bg-white rounded-xl shadow-md border border-amber-200 p-6"
      >
        <h2 className="text-xl font-bold text-amber-950 mb-4">Priority Breakdown</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-700">High Priority</span>
              <span className="text-sm font-bold text-amber-950">{stats.highPriority}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stats.total > 0 ? `${(stats.highPriority / stats.total) * 100}%` : '0%' }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-gradient-to-r from-red-400 to-red-600 h-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-orange-700">Medium Priority</span>
              <span className="text-sm font-bold text-amber-950">{stats.mediumPriority}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stats.total > 0 ? `${(stats.mediumPriority / stats.total) * 100}%` : '0%' }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">Low Priority</span>
              <span className="text-sm font-bold text-amber-950">{stats.lowPriority}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stats.total > 0 ? `${(stats.lowPriority / stats.total) * 100}%` : '0%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-gradient-to-r from-green-400 to-green-600 h-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {stats.total === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md border border-amber-200 p-12 text-center"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-amber-950 mb-2">No Data Yet</h3>
          <p className="text-amber-600">Create some tasks to see your analytics</p>
        </motion.div>
      )}
    </div>
  );
};

export default AnalyticsPage;
