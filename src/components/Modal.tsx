import * as React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { fadeVariants, scaleVariants, springTransition, easeOutTransition } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: React.ReactNode;
  /** Optional description for screen readers */
  description?: string;
  /** Additional class names for the modal container */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, description, className, size = 'lg' }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const titleId = React.useId();
    const descriptionId = React.useId();
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);
    const previousActiveElement = React.useRef<HTMLElement | null>(null);

    // Focus management
    React.useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        // Focus close button after animation
        const timer = setTimeout(() => {
          closeButtonRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }, [isOpen]);

    // Escape key handler
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          e.preventDefault();
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Lock body scroll
    React.useEffect(() => {
      if (isOpen) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [isOpen]);

    // Trap focus within modal
    const handleTabKey = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const modal = e.currentTarget;
        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      },
      []
    );

    const overlayTransition = prefersReducedMotion ? { duration: 0 } : easeOutTransition;
    const modalTransition = prefersReducedMotion ? { duration: 0 } : springTransition;

    return (
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="presentation"
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50 dark:bg-black/70"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={overlayTransition}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal panel */}
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descriptionId : undefined}
              className={cn(
                'relative z-10 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 focus:outline-none',
                sizeClasses[size],
                className
              )}
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={modalTransition}
              onKeyDown={handleTabKey}
              tabIndex={-1}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="space-y-1">
                  <h2
                    id={titleId}
                    className="text-xl font-bold text-neutral-900 dark:text-white"
                  >
                    {title}
                  </h2>
                  {description && (
                    <p
                      id={descriptionId}
                      className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      {description}
                    </p>
                  )}
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close modal"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
