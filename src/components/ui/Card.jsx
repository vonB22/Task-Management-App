import React from 'react';

/**
 * Reusable Card Component
 */
const Card = ({ 
  children, 
  className = '',
  onClick,
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg border border-amber-200 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.01] hover:border-orange-300 transition-all duration-200 cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
