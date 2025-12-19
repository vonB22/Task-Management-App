import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { getPriorityColor } from '../../utils/taskHelpers';

/**
 * TaskCard Component - Displays individual task
 */
const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const priorityColors = getPriorityColor(task.priority);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('currentStatus', task.status);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      'High': 'high',
      'Medium': 'medium',
      'Low': 'low'
    };
    return variants[priority] || 'default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'Done' && task.status !== 'done';

  const getDueDateText = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    if (isToday(date)) return 'Due today';
    if (isTomorrow(date)) return 'Due tomorrow';
    if (isPast(date) && task.status !== 'Done' && task.status !== 'done') {
      return `Overdue by ${formatDistanceToNow(date)}`;
    }
    return `Due ${formatDistanceToNow(date, { addSuffix: true })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`p-4 cursor-move transition-all ${
          isDragging ? 'opacity-50 scale-95' : 'opacity-100'
        } ${task.status === 'Done' || task.status === 'done' ? 'bg-amber-50' : ''} ${
          isOverdue ? 'border-2 border-red-400 shadow-red-100' : ''
        }`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
      {/* Header with Priority Badge */}
      <div className="flex items-start justify-between mb-3">
        <Badge variant={getPriorityBadgeVariant(task.priority)} size="sm">
          {task.priority}
        </Badge>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-orange-600 hover:text-orange-800 transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-lg font-semibold mb-2 ${
        task.status === 'Done' ? 'text-amber-500 line-through' : 'text-amber-950'
      }`}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className={`text-sm mb-3 ${
          task.status === 'Done' ? 'text-amber-400' : 'text-amber-700'
        }`}>
          {task.description}
        </p>
      )}

      {/* Footer with Status Dropdown and Dates */}
      <div className="space-y-2">
        {task.dueDate && (
          <div className={`flex items-center gap-2 text-xs ${
            isOverdue ? 'text-red-600 font-semibold' : 'text-amber-600'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{getDueDateText(task.dueDate)}</span>
            {isOverdue && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">!</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-amber-200">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-sm px-2 py-1 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-amber-900"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="Backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="inProgress">In Progress</option>
            <option value="Done">Done</option>
            <option value="done">Done</option>
          </select>
          
          <span className="text-xs text-amber-500">
            {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
    </Card>
    </motion.div>
  );
};

export default TaskCard;
