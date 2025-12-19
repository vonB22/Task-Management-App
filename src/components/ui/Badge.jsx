import React from 'react';

/**
 * Reusable Badge Component
 */
const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full';
  
  const variants = {
    default: 'bg-amber-100 text-amber-800 border border-amber-200',
    primary: 'bg-orange-100 text-orange-800 border border-orange-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    danger: 'bg-red-100 text-red-800 border border-red-200',
    high: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm',
    medium: 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-sm',
    low: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
