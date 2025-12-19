import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import DateTimePicker from '../ui/DateTimePicker';

/**
 * TaskForm Component - Form for creating/editing tasks
 */
const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Backlog',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Backlog',
        dueDate: task.dueDate || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // If editing, include the original task data
      if (task) {
        onSubmit({
          ...task,
          ...formData
        });
      } else {
        onSubmit(formData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-amber-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.title ? 'border-red-500' : 'border-amber-200'
          }`}
          placeholder="Enter task title"
          maxLength={100}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-amber-500">
          {formData.title.length}/100 characters
        </p>
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-amber-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
            errors.description ? 'border-red-500' : 'border-amber-200'
          }`}
          placeholder="Enter task description (optional)"
          maxLength={500}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-amber-500">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Priority and Status Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Priority Field */}
        <div>
          <label htmlFor="priority" className="block text-sm font-semibold text-amber-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status Field */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-amber-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Backlog">Backlog</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {/* Due Date Field */}
      <DateTimePicker
        label="Due Date"
        value={formData.dueDate}
        onChange={(value) => setFormData(prev => ({ ...prev, dueDate: value }))}
        showTime={true}
        error={errors.dueDate}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
