import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleInVariants } from '../lib/animations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

const Modal = React.memo(
  React.forwardRef<HTMLDivElement, ModalProps>(
    ({ isOpen, onClose, title, children, description, className = '', size = 'lg' }, ref) => {
      const titleId = React.useId();
      const descriptionId = React.useId();
      const closeButtonRef = React.useRef<HTMLButtonElement>(null);
      const previousActiveElement = React.useRef<HTMLElement | null>(null);

      React.useEffect(() => {
        if (isOpen) {
          previousActiveElement.current = document.activeElement as HTMLElement;
          closeButtonRef.current?.focus();
        } else if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      }, [isOpen]);

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

      React.useEffect(() => {
        if (isOpen) {
          const originalOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          return () => {
            document.body.style.overflow = originalOverflow;
          };
        }
      }, [isOpen]);

      if (!isOpen) return null;

      return (
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                ref={ref}
                className={`relative bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full mx-4 ${sizeClasses[size]} ${className}`.trim()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
                variants={scaleInVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h2 id={titleId} className="text-xl font-semibold text-neutral-900 dark:text-white">
                  {title}
                </h2>
                {description && (
                  <p id={descriptionId} className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X size={20} className="text-neutral-900 dark:text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6">{children}</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      );
    }
  )
);

Modal.displayName = 'Modal';

export { Modal };
export type { ModalProps };
