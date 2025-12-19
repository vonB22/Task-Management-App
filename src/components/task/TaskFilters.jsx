import React from 'react';
import { motion } from 'framer-motion';

/**
 * TaskFilters Component
 * Advanced filtering UI for tasks
 */
const TaskFilters = ({
  searchTerm,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  selectedAssignee,
  onAssigneeChange,
  hasActiveFilters,
  onClearFilters,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md border border-amber-200 p-4 ${className}`}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-amber-200 bg-orange-50 text-amber-950 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="w-full lg:w-48">
          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg border border-amber-200 bg-white text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-48">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg border border-amber-200 bg-white text-amber-950 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="todo">📋 To Do</option>
              <option value="inProgress">⚡ In Progress</option>
              <option value="done">✅ Done</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClearFilters}
            className="px-4 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium whitespace-nowrap flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </motion.button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 pt-3 border-t border-amber-200 flex flex-wrap gap-2"
        >
          <span className="text-xs font-medium text-amber-700">Active filters:</span>
          {searchTerm && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
              Search: "{searchTerm}"
            </span>
          )}
          {selectedPriority !== 'all' && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium capitalize">
              Priority: {selectedPriority}
            </span>
          )}
          {selectedStatus !== 'all' && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium capitalize">
              Status: {selectedStatus.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskFilters;
