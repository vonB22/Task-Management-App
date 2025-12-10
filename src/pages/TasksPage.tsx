import React, { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import type { Task, TaskStatus, TaskCategory } from '../types';
import { Button } from '../components/Button';
import { TaskCard } from '../components/TaskCard';
import { FilterSection } from '../components/FilterSection';
import { AddTaskModal } from '../components/AddTaskModal';
import { EditTaskModal } from '../components/EditTaskModal';
import { ViewTaskModal } from '../components/ViewTaskModal';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish and submit the quarterly project proposal for the new initiative.',
    category: 'work',
    status: 'in-progress',
    createdAt: new Date('2025-12-05'),
    updatedAt: new Date('2025-12-05'),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Get milk, eggs, bread, and vegetables from the supermarket.',
    category: 'shopping',
    status: 'todo',
    createdAt: new Date('2025-12-08'),
    updatedAt: new Date('2025-12-08'),
  },
  {
    id: '3',
    title: 'Schedule doctor appointment',
    description: 'Book an appointment with Dr. Smith for the annual checkup.',
    category: 'health',
    status: 'todo',
    createdAt: new Date('2025-12-09'),
    updatedAt: new Date('2025-12-09'),
  },
  {
    id: '4',
    title: 'Review team feedback',
    description: 'Go through the feedback from the team meeting and prepare action items.',
    category: 'work',
    status: 'done',
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2025-12-03'),
  },
];

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Memoize filtered tasks to prevent recalculation on every render
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
        const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
        return matchesSearch && matchesStatus && matchesCategory;
      }),
    [tasks, searchQuery, selectedStatus, selectedCategory]
  );

  // Memoize callbacks to prevent unnecessary prop changes
  const handleAddTask = useCallback(
    (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prev) => [...prev, task]);
    },
    []
  );

  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setIsEditModalOpen(false);
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  }, []);

  const handleViewTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  }, []);

  const handleEditFromView = useCallback(() => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  }, []);

  const handleAddModalOpen = useCallback(() => setIsAddModalOpen(true), []);
  const handleAddModalClose = useCallback(() => setIsAddModalOpen(false), []);
  const handleEditModalClose = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  }, []);
  const handleViewModalClose = useCallback(() => setIsViewModalOpen(false), []);
  const handleSearchChange = useCallback((query: string) => setSearchQuery(query), []);
  const handleStatusChange = useCallback((status: TaskStatus | 'all') => setSelectedStatus(status), []);
  const handleCategoryChange = useCallback((category: TaskCategory | 'all') => setSelectedCategory(category), []);

  const handleEditFromCard = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      setIsEditModalOpen(true);
    },
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Tasks</h2>
        <Button
          variant="primary"
          onClick={handleAddModalOpen}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Task
        </Button>
      </div>

      <FilterSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-500 dark:text-neutral-400 text-lg">No tasks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditFromCard}
              onDelete={handleDeleteTask}
              onView={handleViewTask}
            />
          ))}
        </div>
      )}

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onAdd={handleAddTask}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={handleEditModalClose}
        onEdit={handleEditTask}
      />

      <ViewTaskModal
        isOpen={isViewModalOpen}
        task={selectedTask}
        onClose={handleViewModalClose}
        onEdit={handleEditFromView}
      />
    </div>
  );
};
