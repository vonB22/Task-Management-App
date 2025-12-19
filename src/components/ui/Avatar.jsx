import React from 'react';
import { motion } from 'framer-motion';

/**
 * Avatar Component
 * Displays user avatar with initials or image
 */
const Avatar = ({ 
  name = 'User',
  src = null,
  size = 'md',
  status = null,
  className = '',
  onClick,
  ...props 
}) => {
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4'
  };

  const statusColors = {
    online: 'bg-green-500 ring-green-200',
    offline: 'bg-gray-400 ring-gray-200',
    busy: 'bg-red-500 ring-red-200',
    away: 'bg-yellow-500 ring-yellow-200'
  };

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      className={`relative inline-flex items-center justify-center ${sizes[size]} rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="font-semibold text-white select-none">
          {getInitials(name)}
        </span>
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full ring-2 ring-white`}
          aria-label={`Status: ${status}`}
        />
      )}
    </motion.div>
  );
};

export default Avatar;
