import React from 'react';
import { format } from 'date-fns';

/**
 * DateTimePicker Component
 * Simple date and time input with date-fns formatting
 */
const DateTimePicker = ({ 
  value,
  onChange,
  label,
  required = false,
  showTime = false,
  min,
  max,
  className = '',
  error = '',
  ...props 
}) => {
  // Convert ISO string to datetime-local format
  const formatForInput = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    if (showTime) {
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return `${year}-${month}-${day}`;
  };

  // Convert datetime-local format to ISO string
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      onChange('');
      return;
    }
    const isoString = new Date(inputValue).toISOString();
    onChange(isoString);
  };

  const inputType = showTime ? 'datetime-local' : 'date';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-amber-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          value={formatForInput(value)}
          onChange={handleChange}
          min={min ? formatForInput(min) : undefined}
          max={max ? formatForInput(max) : undefined}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            error ? 'border-red-500' : 'border-amber-200'
          }`}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {value && (
        <p className="mt-1 text-xs text-amber-500">
          {format(new Date(value), showTime ? 'PPp' : 'PP')}
        </p>
      )}
    </div>
  );
};

export default DateTimePicker;
