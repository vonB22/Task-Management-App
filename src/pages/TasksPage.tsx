import React, { useState, useMemo, useCallback } from 'react';
import { Plus, ListFilter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Task, TaskStatus, TaskCategory, TaskPriority } from '../types';
import { Button } from '../components/Button';
import { TaskCard } from '../components/TaskCard';
import { FilterSection } from '../components/FilterSection';
import { AddTaskModal } from '../components/AddTaskModal';
import { EditTaskModal } from '../components/EditTaskModal';
import { ViewTaskModal } from '../components/ViewTaskModal';
import { useLocalStorage, useKeyboardShortcuts } from '../hooks';
import { useToast } from '../context/ToastContext';
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish and submit the quarterly project proposal for the new initiative.',
    category: 'work',
    status: 'in-progress',
    priority: 'high',
    order: 0,
    attachments: [],
    createdAt: new Date('2025-12-05'),
    updatedAt: new Date('2025-12-05'),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Get milk, eggs, bread, and vegetables from the supermarket.',
    category: 'shopping',
    status: 'todo',
    priority: 'medium',
    order: 1,
    attachments: [],
    createdAt: new Date('2025-12-08'),
    updatedAt: new Date('2025-12-08'),
  },
  {
    id: '3',
    title: 'Schedule doctor appointment',
    description: 'Book an appointment with Dr. Smith for the annual checkup.',
    category: 'health',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    order: 2,
    attachments: [],
    createdAt: new Date('2025-12-09'),
    updatedAt: new Date('2025-12-09'),
  },
  {
    id: '4',
    title: 'Review team feedback',
    description: 'Go through the feedback from the team meeting and prepare action items.',
    category: 'work',
    status: 'done',
    priority: 'medium',
    order: 3,
    attachments: [],
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2025-12-03'),
  },
];

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { success } = useToast();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrl: true,
      action: () => setIsAddModalOpen(true),
      description: 'New task',
    },
    {
      key: 'Escape',
      action: () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsViewModalOpen(false);
      },
      description: 'Close modals',
    },
    {
      key: 'f',
      ctrl: true,
      action: () => setShowFilters((prev) => !prev),
      description: 'Toggle filters',
    },
  ]);
  
  // Memoize filtered tasks to prevent recalculation on every render
  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((task: Task) => {
          const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
          const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
          const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
          return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
        })
        .sort((a: Task, b: Task) => a.order - b.order),
    [tasks, searchQuery, selectedStatus, selectedCategory, selectedPriority]
  );

  // Memoize callbacks to prevent unnecessary prop changes
  const handleAddTask = useCallback(
    (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
      setTasks((prev: Task[]) => {
        const task: Task = {
          ...newTask,
          id: Date.now().toString(),
          order: prev.length,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return [...prev, task];
      });
      success('Task created successfully');
    },
    [setTasks, success]
  );

  const handleEditTask = useCallback((updatedTask: Task) => {
    setTasks((prev: Task[]) => prev.map((t: Task) => (t.id === updatedTask.id ? updatedTask : t)));
    setIsEditModalOpen(false);
    success('Task updated successfully');
  }, [success]);

  const handleDeleteTask = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== id));
      success('Task deleted');
    }
  }, [success]);

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
  const handlePriorityChange = useCallback((priority: TaskPriority | 'all') => setSelectedPriority(priority), []);

  const handleEditFromCard = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      setIsEditModalOpen(true);
    },
    []
  );

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedStatus !== 'all') count++;
    if (selectedCategory !== 'all') count++;
    if (selectedPriority !== 'all') count++;
    return count;
  }, [selectedStatus, selectedCategory, selectedPriority]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">Tasks</h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(prev => !prev)}
            className="flex items-center gap-2 sm:hidden relative"
            size="sm"
          >
            <ListFilter size={18} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={handleAddModalOpen}
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus size={18} />
            <span className="hidden xs:inline">Add Task</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Desktop filters always visible, mobile collapsible */}
      <div className="hidden sm:block">
        <FilterSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedPriority={selectedPriority}
          onPriorityChange={handlePriorityChange}
        />
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden sm:hidden"
          >
            <FilterSection
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedStatus={selectedStatus}
              onStatusChange={handleStatusChange}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedPriority={selectedPriority}
              onPriorityChange={handlePriorityChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {filteredTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 sm:py-12"
        >
          <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">No tasks found</p>
          <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-1">Try adjusting your filters or add a new task</p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task: Task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <TaskCard
                  task={task}
                  onEdit={handleEditFromCard}
                  onDelete={handleDeleteTask}
                  onView={handleViewTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
