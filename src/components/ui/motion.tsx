import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants, HTMLMotionProps } from "framer-motion";
import { forwardRef, createContext, useContext } from "react";
import type { ReactNode } from "react";

// ============================================
// Reduced Motion Context & Hook
// ============================================
const ReducedMotionContext = createContext(false);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion ?? false}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useMotionSafe() {
  const prefersReducedMotion = useContext(ReducedMotionContext);
  return !prefersReducedMotion;
}

// ============================================
// Animation Variants
// ============================================
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: {
      duration: 0.15,
    }
  },
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    }
  },
  exit: { opacity: 0, y: -10 },
};

export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    }
  },
};

// ============================================
// Spring Configurations
// ============================================
export const springConfig = {
  gentle: { type: "spring" as const, damping: 20, stiffness: 200 },
  snappy: { type: "spring" as const, damping: 25, stiffness: 400 },
  bouncy: { type: "spring" as const, damping: 15, stiffness: 300 },
  slow: { type: "spring" as const, damping: 30, stiffness: 150 },
};

// ============================================
// Motion Components
// ============================================

// Animated container with fade
interface FadeProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(
  ({ children, delay = 0, ...props }, ref) => {
    const shouldAnimate = useMotionSafe();
    
    return (
      <motion.div
        ref={ref}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        exit="exit"
        variants={fadeVariants}
        transition={{ duration: 0.2, delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Fade.displayName = "Fade";

// Animated container with fade up
export const FadeUp = forwardRef<HTMLDivElement, FadeProps>(
  ({ children, delay = 0, ...props }, ref) => {
    const shouldAnimate = useMotionSafe();
    
    return (
      <motion.div
        ref={ref}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        exit="exit"
        variants={fadeUpVariants}
        transition={{ duration: 0.3, delay, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeUp.displayName = "FadeUp";

// Staggered list container
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ children, staggerDelay = 0.05, ...props }, ref) => {
    const shouldAnimate = useMotionSafe();
    
    return (
      <motion.div
        ref={ref}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        exit="exit"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: 0.1,
            },
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerContainer.displayName = "StaggerContainer";

// Staggered list item
export const StaggerItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={listItemVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerItem.displayName = "StaggerItem";

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const shouldAnimate = useMotionSafe();
  
  return (
    <motion.div
      initial={shouldAnimate ? "hidden" : false}
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Modal wrapper with animations
interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function AnimatedModal({ isOpen, onClose, children, className }: AnimatedModalProps) {
  const shouldAnimate = useMotionSafe();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"
            initial={shouldAnimate ? "hidden" : false}
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />
          {/* Modal Content */}
          <motion.div
            className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 ${className}`}
            initial={shouldAnimate ? "hidden" : false}
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export AnimatePresence for convenience
export { AnimatePresence };
