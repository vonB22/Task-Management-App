import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * ErrorPage Component (500)
 * Generic error page for unexpected errors
 */
const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Error Illustration */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <svg
            className="w-64 h-64 mx-auto text-red-300 dark:text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4"
        >
          500
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-amber-950 dark:text-dark-text mb-4"
        >
          Something Went Wrong
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-amber-600 dark:text-dark-muted mb-8"
        >
          We encountered an unexpected error. Don't worry, your data is safe. Try refreshing the page or going back to the dashboard.
        </motion.p>

        {/* Error Details (Development Only) */}
        {error && process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left"
          >
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
              Error Details (Development Mode):
            </p>
            <p className="text-xs text-red-600 dark:text-red-500 font-mono break-all">
              {error.toString()}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="px-6 py-3 bg-amber-100 dark:bg-dark-surface text-amber-700 dark:text-dark-text rounded-lg hover:bg-amber-200 dark:hover:bg-dark-border transition-all font-medium"
            >
              🔄 Try Again
            </button>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-100 dark:bg-dark-surface text-amber-700 dark:text-dark-text rounded-lg hover:bg-amber-200 dark:hover:bg-dark-border transition-all font-medium"
          >
            ↻ Refresh Page
          </button>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium"
          >
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-amber-200 dark:border-dark-border"
        >
          <p className="text-sm text-amber-600 dark:text-dark-muted">
            If this problem persists, please clear your browser cache or contact support.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
