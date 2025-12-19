import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useRBAC } from '../hooks/useRBAC';
import { useNotifications } from '../contexts/NotificationContext';
import StatusColumn from '../components/task/StatusColumn';
import TaskForm from '../components/task/TaskForm';
import TaskFilters from '../components/task/TaskFilters';
import Modal from '../components/ui/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFilter } from '../hooks/useFilter';

/**
 * Dashboard Component
 * Main kanban board view with task management
 */
const Dashboard = () => {
  const { user } = useAuth();
  const { canCreateTask } = useRBAC();
  const { showToast } = useNotifications();
  
  // State management
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filter and search
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
  const filteredTasks = filterTasks(tasks);

  // Task handlers
  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user?.name || 'Unknown',
      status: 'todo'
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
      task.id === updatedTask.id ? updatedTask : task
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

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    const statusLabels = { 
      todo: 'To Do', 
      Backlog: 'Backlog',
      inProgress: 'In Progress', 
      'In Progress': 'In Progress',
      done: 'Done',
      Done: 'Done'
    };
    showToast({
      title: '✓ Task Moved',
      message: `"${updatedTask?.title}" moved to ${statusLabels[newStatus] || newStatus}`,
      type: 'success'
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Group tasks by status (handle both formats)
  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo' || task.status === 'Backlog'),
    inProgress: filteredTasks.filter(task => task.status === 'inProgress' || task.status === 'In Progress'),
    done: filteredTasks.filter(task => task.status === 'done' || task.status === 'Done')
  };

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo' || t.status === 'Backlog').length,
    inProgress: tasks.filter(t => t.status === 'inProgress' || t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'done' || t.status === 'Done').length
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
            <h1 className="text-3xl font-bold text-amber-950">Dashboard</h1>
            <p className="text-amber-600 mt-1">
              Welcome back, {user?.name || 'User'}! Here's your task overview.
            </p>
          </div>
          {canCreateTask() && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.total}</p>
              <p className="text-xs text-amber-600">Total Tasks</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.todo}</p>
              <p className="text-xs text-amber-600">To Do</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-950">{stats.inProgress}</p>
              <p className="text-xs text-amber-600">In Progress</p>
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
              <p className="text-2xl font-bold text-amber-950">{stats.done}</p>
              <p className="text-xs text-amber-600">Completed</p>
            </div>
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

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <StatusColumn
          title="To Do"
          status="todo"
          tasks={tasksByStatus.todo}
          onStatusChange={handleStatusChange}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <StatusColumn
          title="In Progress"
          status="inProgress"
          tasks={tasksByStatus.inProgress}
          onStatusChange={handleStatusChange}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <StatusColumn
          title="Done"
          status="done"
          tasks={tasksByStatus.done}
          onStatusChange={handleStatusChange}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </motion.div>

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

export default Dashboard;
