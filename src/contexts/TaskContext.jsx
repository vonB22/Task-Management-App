import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateTaskId, validateTask } from '../utils/taskHelpers';

const TaskContext = createContext(null);

/**
 * Provider component for Task Context
 */
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Create a new task
  const createTask = useCallback((taskData) => {
    const validation = validateTask(taskData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const newTask = {
      id: generateTaskId(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'Backlog',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  }, [setTasks]);

  // Update an existing task
  const updateTask = useCallback((taskId, updates) => {
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const updatedTask = {
        ...prevTasks[taskIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const validation = validateTask(updatedTask);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const newTasks = [...prevTasks];
      newTasks[taskIndex] = updatedTask;
      return newTasks;
    });
  }, [setTasks]);

  // Delete a task
  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  }, [setTasks]);

  // Update task status
  const updateTaskStatus = useCallback((taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  }, [updateTask]);

  // Get task by ID
  const getTaskById = useCallback((taskId) => {
    return tasks.find(t => t.id === taskId);
  }, [tasks]);

  // Get tasks by status
  const getTasksByStatus = useCallback((status) => {
    return tasks.filter(t => t.status === status);
  }, [tasks]);

  // Get tasks by priority
  const getTasksByPriority = useCallback((priority) => {
    return tasks.filter(t => t.priority === priority);
  }, [tasks]);

  // Clear all tasks
  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

  // Generate sample data for testing/demo
  const generateSampleData = useCallback(() => {
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
        title: 'Implement dark mode',
        description: 'Add dark theme support across the application',
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
  }, [setTasks]);

  // Get task statistics
  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      backlog: tasks.filter(t => t.status === 'Backlog').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      done: tasks.filter(t => t.status === 'Done').length,
      highPriority: tasks.filter(t => t.priority === 'High').length,
      mediumPriority: tasks.filter(t => t.priority === 'Medium').length,
      lowPriority: tasks.filter(t => t.priority === 'Low').length
    };
  }, [tasks]);

  const value = useMemo(() => ({
    tasks,
    taskStats,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTaskById,
    getTasksByStatus,
    getTasksByPriority,
    clearAllTasks,
    generateSampleData
  }), [
    tasks,
    taskStats,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTaskById,
    getTasksByStatus,
    getTasksByPriority,
    clearAllTasks,
    generateSampleData
  ]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

/**
 * Hook to use Task Context
 */
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
