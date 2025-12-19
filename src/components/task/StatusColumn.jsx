import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { getStatusColor } from '../../utils/taskHelpers';

/**
 * StatusColumn Component - Column for tasks by status
 */
const StatusColumn = ({ 
  status, 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('taskId');
    const currentStatus = e.dataTransfer.getData('currentStatus');

    if (currentStatus !== status) {
      onStatusChange(taskId, status);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'In Progress':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Done':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColumnColor = (status) => {
    switch (status) {
      case 'Backlog':
      case 'todo':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'In Progress':
      case 'inProgress':
        return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'Done':
      case 'done':
        return 'text-green-700 bg-green-100 border-green-200';
      default:
        return 'text-amber-700 bg-amber-100 border-amber-200';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`flex items-center justify-between p-4 rounded-t-lg ${getColumnColor(status)}`}>
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <h2 className="text-lg font-bold">{status}</h2>
        </div>
        <span className="px-2 py-1 text-sm font-semibold bg-white rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 p-4 space-y-3 bg-orange-50 rounded-b-lg min-h-[600px] transition-all ${
          isDragOver ? 'bg-orange-100 border-2 border-dashed border-orange-400' : 'border-2 border-transparent'
        }`}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-amber-400">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm font-medium">No tasks</p>
            <p className="text-xs">Drag tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StatusColumn;
