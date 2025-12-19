import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFilter } from '../hooks/useFilter';
import { useAuth } from '../contexts/AuthContext';
import { useRBAC } from '../hooks/useRBAC';
import { useNotifications } from '../contexts/NotificationContext';
import TaskForm from '../components/task/TaskForm';
import TaskFilters from '../components/task/TaskFilters';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

/**
 * TasksPage Component
 * List view of all tasks with advanced filtering
 */
const TasksPage = () => {
  const { user } = useAuth();
  const { canCreateTask, canEditTask, canDeleteTask } = useRBAC();
  const { showToast } = useNotifications();
  
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const {
    searchTerm,
    setSearchTerm,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
    hasActiveFilters,
    filterTasks
  } = useFilter();

  // Apply filters to tasks
  const filteredData = filterTasks(tasks);

  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user?.name || 'Unknown',
      status: newTask.status || 'todo'
    };
    setTasks([...tasks, task]);
    setIsCreateModalOpen(false);
    showToast({
      title: 'Task Created',
      message: `"${task.title}" has been created successfully`,
      type: 'success'
    });
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? { ...updatedTask, id: task.id, createdAt: task.createdAt, createdBy: task.createdBy } : task
    ));
    setEditingTask(null);
    setIsEditModalOpen(false);
    showToast({
      title: 'Task Updated',
      message: `"${updatedTask.title}" has been updated successfully`,
      type: 'success'
    });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const deletedTask = tasks.find(task => task.id === taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      showToast({
        title: 'Task Deleted',
        message: `"${deletedTask?.title || 'Task'}" has been deleted`,
        type: 'success'
      });
    }
  };

  const handleEditTask = (task) => {
    if (canEditTask(task)) {
      setEditingTask(task);
      setIsEditModalOpen(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'inProgress':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'done':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      'High': 'high',
      'high': 'high',
      'Medium': 'medium',
      'medium': 'medium',
      'Low': 'low',
      'low': 'low'
    };
    return variants[priority] || 'default';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-950">All Tasks</h1>
            <p className="text-amber-600 mt-1">
              Manage and organize your tasks in a list view
            </p>
          </div>
          <div className="flex gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-amber-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-amber-600'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-amber-600'
                }`}
              >
                Grid
              </button>
            </div>
            {canCreateTask() && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <TaskFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPriority={priorityFilter || 'all'}
        onPriorityChange={(value) => setPriorityFilter(value === 'all' ? null : value)}
        selectedStatus={statusFilter || 'all'}
        onStatusChange={(value) => setStatusFilter(value === 'all' ? null : value)}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Task Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-amber-600"
      >
        Showing {filteredData.length} of {tasks.length} tasks
      </motion.div>

      {/* Tasks List/Grid */}
      {filteredData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-amber-200"
        >
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-amber-950 mb-2">No tasks found</h3>
          <p className="text-amber-600 mb-6">
            {tasks.length === 0 
              ? "Create your first task to get started!"
              : "Try adjusting your filters"}
          </p>
          {canCreateTask() && tasks.length === 0 && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md font-medium"
            >
              Create First Task
            </button>
          )}
        </motion.div>
      ) : viewMode === 'list' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50 border-b border-amber-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Task</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Due Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-amber-700">Created</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-amber-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((task, index) => {
                  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done';
                  return (
                    <motion.tr
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-amber-100 hover:bg-orange-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="max-w-md">
                          <p className="font-medium text-amber-950 mb-1">{task.title}</p>
                          {task.description && (
                            <p className="text-sm text-amber-600 truncate">{task.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getPriorityBadgeVariant(task.priority)} size="sm">
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                          {task.status === 'todo' ? 'To Do' : task.status === 'inProgress' ? 'In Progress' : 'Done'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {task.dueDate ? (
                          <span className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-amber-700'}`}>
                            {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                          </span>
                        ) : (
                          <span className="text-sm text-amber-400">No due date</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-amber-600">
                        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          {canEditTask(task) && (
                            <button
                              onClick={() => handleEditTask(task)}
                              className="p-1.5 text-orange-600 hover:bg-orange-100 rounded transition-colors"
                              title="Edit task"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {canDeleteTask(task) && (
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                              title="Delete task"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredData.map((task, index) => {
            const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done';
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  isOverdue ? 'border-red-400' : 'border-amber-200'
                }`}
                onClick={() => handleEditTask(task)}
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={getPriorityBadgeVariant(task.priority)} size="sm">
                    {task.priority}
                  </Badge>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    {task.status === 'todo' ? 'To Do' : task.status === 'inProgress' ? 'In Progress' : 'Done'}
                  </span>
                </div>
                <h3 className="font-semibold text-amber-950 mb-2">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-amber-600 mb-3 line-clamp-2">{task.description}</p>
                )}
                {task.dueDate && (
                  <div className={`text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-amber-500'}`}>
                    Due {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Create Task Modal */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        title="Edit Task"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default TasksPage;
