import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingOverlayProps {
  isProcessing: boolean;
  message?: string;
}

/**
 * Processing overlay component that shows when data is being fetched
 * (e.g., when changing filters). Displays a floating pill with spinner.
 */
export function ProcessingOverlay({ 
  isProcessing, 
  message = "Processing..." 
}: ProcessingOverlayProps) {
  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-20 inset-x-0 mx-auto w-fit z-50 bg-card border rounded-full px-4 py-2 shadow-lg flex items-center justify-center gap-2"
        >
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <span className="text-sm text-primary font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Content wrapper that dims when processing
 */
interface ProcessingContentProps {
  isProcessing: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ProcessingContent({ 
  isProcessing, 
  children, 
  className = "" 
}: ProcessingContentProps) {
  return (
    <div 
      className={`transition-opacity duration-150 ${isProcessing ? 'opacity-70' : 'opacity-100'} ${className}`}
    >
      {children}
    </div>
  );
}
