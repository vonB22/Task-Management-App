import type { Variants, Transition } from 'framer-motion';

/**
 * Standard spring transition for micro-interactions
 */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

/**
 * Quick spring for snappy feedback
 */
export const quickSpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

/**
 * Smooth ease-out for entrances
 */
export const easeOutTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
};

/**
 * Fade in/out variants
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide up with fade variants
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/**
 * Slide in from left variants (for sidebar)
 */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * Scale with fade variants (for modals, popups)
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Pop in variants (for badges, tags)
 */
export const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/**
 * List item variant for staggered lists
 */
export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Button hover/tap animation props
 */
export const buttonMotionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: quickSpring,
};

/**
 * Card hover animation props
 */
export const cardHoverProps = {
  whileHover: { y: -2 },
  transition: springTransition,
};

/**
 * Reduced motion fallback - returns empty object when reduced motion is preferred
 */
export function getMotionProps<T extends object>(
  motionProps: T,
  prefersReducedMotion: boolean
): T | Record<string, never> {
  return prefersReducedMotion ? {} : motionProps;
}
