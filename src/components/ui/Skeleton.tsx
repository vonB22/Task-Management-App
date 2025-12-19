import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-neutral-200 dark:bg-neutral-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 bg-[length:200%_100%]',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Task Card Skeleton
export const TaskCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 space-y-3">
    <div className="flex items-start justify-between gap-2">
      <Skeleton variant="text" className="h-5 w-3/4" />
      <Skeleton variant="circular" width={20} height={20} />
    </div>
    <Skeleton variant="text" className="h-4 w-full" />
    <Skeleton variant="text" className="h-4 w-2/3" />
    <div className="flex items-center gap-2 pt-2">
      <Skeleton variant="rounded" width={60} height={22} />
      <Skeleton variant="rounded" width={80} height={22} />
    </div>
    <div className="flex items-center justify-between pt-2">
      <Skeleton variant="text" width={100} height={16} />
      <div className="flex gap-1">
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton variant="circular" width={28} height={28} />
      </div>
    </div>
  </div>
);

// Task Grid Skeleton
export const TaskGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <TaskCardSkeleton key={i} />
    ))}
  </div>
);

// Stats Dashboard Skeleton
export const StatsDashboardSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex items-center gap-3">
          <Skeleton variant="rounded" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="h-3 w-16" />
            <Skeleton variant="text" className="h-6 w-12" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Page Loading Skeleton
export const PageLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton variant="text" className="h-8 w-48" />
        <Skeleton variant="text" className="h-4 w-64" />
      </div>
      <Skeleton variant="rounded" width={120} height={40} />
    </div>
    <StatsDashboardSkeleton />
    <TaskGridSkeleton />
  </div>
);
