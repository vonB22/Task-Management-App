import * as React from 'react';
import { cn } from '../lib/utils';

export interface LayoutProps {
  /** Child content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Root layout wrapper that provides the base styling and theme support
 */
const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased transition-colors duration-200',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = 'Layout';

export { Layout };
