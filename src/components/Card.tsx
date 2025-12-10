import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = React.memo(({ children, className }) => {
  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-md border border-neutral-200 dark:border-neutral-800 p-6 transition-colors duration-200 ${className || ''}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

Card.displayName = 'Card';
