import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import ErrorPage from '../pages/ErrorPage'; // Keep as static import (used by ErrorBoundary)

// Lazy load page components for code splitting
const LandingPage = lazy(() => import('../pages/LandingPage'));
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const TasksPage = lazy(() => import('../pages/TasksPage'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-orange-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-amber-700 font-medium">Loading...</p>
    </div>
  </div>
);

// Wrapper component with Suspense
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

/**
 * Application Routes Configuration
 * Using lazy loading for code splitting to reduce initial bundle size
 */
export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <LandingPage />
      </SuspenseWrapper>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/signin',
    element: (
      <SuspenseWrapper>
        <SignIn />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <SuspenseWrapper>
        <SignUp />
      </SuspenseWrapper>
    ),
  },
  
  // Protected Routes (Requires Authentication)
  {
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      },
      {
        path: '/tasks',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      },
      {
        path: '/analytics',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      },
      {
        path: '/profile',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      },
      {
        path: '/settings',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      },
      {
        path: '/admin',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute requiredRole="Admin">
              <AdminPanel />
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      },
      {
        path: '/team',
        element: (
          <SuspenseWrapper>
            <ProtectedRoute requiredRole={['Admin', 'Manager']}>
              <Dashboard /> {/* Team tasks view - can be separate later */}
            </ProtectedRoute>
          </SuspenseWrapper>
        )
      }
    ]
  },
  
  // Catch all - 404
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    )
  }
]);

export default router;
