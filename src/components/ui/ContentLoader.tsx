import { Loader2 } from 'lucide-react';

interface ContentLoaderProps {
  message?: string;
}

/**
 * Unified loading component for content areas.
 * Use this inside page components to show loading state while data loads.
 * The header/layout should remain visible.
 */
export function ContentLoader({ message = 'Loading...' }: ContentLoaderProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * Inline loading spinner for smaller areas
 */
export function InlineLoader({ message }: ContentLoaderProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 className="w-5 h-5 text-primary animate-spin" />
      {message && (
        <span className="text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );
}

/**
 * Skeleton card loader for grid layouts
 */
export function CardSkeleton() {
  return (
    <div className="bg-card border rounded-[14px] p-4 lg:p-5 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 bg-muted rounded w-24"></div>
        <div className="w-8 h-8 bg-muted rounded-lg"></div>
      </div>
      <div className="h-8 bg-muted rounded w-32 mb-2"></div>
      <div className="h-3 bg-muted rounded w-20"></div>
    </div>
  );
}

/**
 * List item skeleton for transaction/budget lists
 */
export function ListItemSkeleton() {
  return (
    <div className="bg-card border rounded-[14px] p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-muted rounded w-32 mb-2"></div>
          <div className="h-3 bg-muted rounded w-24"></div>
        </div>
        <div className="h-5 bg-muted rounded w-20"></div>
      </div>
    </div>
  );
}

/**
 * Dashboard skeleton loader
 */
export function DashboardSkeleton() {
  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8 space-y-6 animate-pulse">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border rounded-[14px] p-4 lg:p-6">
            <div className="h-4 bg-muted rounded w-32 mb-4"></div>
            <div className="h-10 bg-muted rounded w-48 mb-4"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </div>
        ))}
      </div>
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-[14px] p-6">
          <div className="h-4 bg-muted rounded w-32 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-4 bg-muted rounded w-32"></div>
                </div>
                <div className="h-2 bg-muted rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card border rounded-[14px] p-6">
          <div className="h-4 bg-muted rounded w-32 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
