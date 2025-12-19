import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

/**
 * SignIn Component
 * Frontend-only sign in page with local storage auth
 */
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Get users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword);
        navigate('/dashboard');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }

      setIsLoading(false);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Quick demo login
  const handleDemoLogin = (role) => {
    const demoUser = {
      id: Date.now().toString(),
      name: `Demo ${role}`,
      email: `demo${role.toLowerCase()}@taskflow.app`,
      role: role,
    };
    login(demoUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">TF</span>
            </div>
            <span className="text-2xl font-bold text-amber-950 dark:text-dark-text">TaskFlow Pro</span>
          </Link>
          <h1 className="text-3xl font-bold text-amber-950 dark:text-dark-text mb-2">Welcome Back</h1>
          <p className="text-amber-600 dark:text-dark-muted">Sign in to your account</p>
        </div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border border-amber-200 dark:border-dark-border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                {errors.general}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-700 dark:text-dark-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-amber-200 dark:border-dark-border focus:ring-orange-500'
                } dark:bg-dark-bg dark:text-dark-text focus:outline-none focus:ring-2 transition-all`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-700 dark:text-dark-text mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-amber-200 dark:border-dark-border focus:ring-orange-500'
                } dark:bg-dark-bg dark:text-dark-text focus:outline-none focus:ring-2 transition-all`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Logins */}
          <div className="mt-6 pt-6 border-t border-amber-200 dark:border-dark-border">
            <p className="text-sm text-amber-600 dark:text-dark-muted mb-3 text-center">Quick Demo Access:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin('Admin')}
                className="px-3 py-2 text-sm bg-amber-100 dark:bg-dark-bg text-amber-700 dark:text-dark-text rounded-lg hover:bg-amber-200 dark:hover:bg-dark-border transition-all"
              >
                Admin
              </button>
              <button
                onClick={() => handleDemoLogin('Manager')}
                className="px-3 py-2 text-sm bg-amber-100 dark:bg-dark-bg text-amber-700 dark:text-dark-text rounded-lg hover:bg-amber-200 dark:hover:bg-dark-border transition-all"
              >
                Manager
              </button>
              <button
                onClick={() => handleDemoLogin('TeamMember')}
                className="px-3 py-2 text-sm bg-amber-100 dark:bg-dark-bg text-amber-700 dark:text-dark-text rounded-lg hover:bg-amber-200 dark:hover:bg-dark-border transition-all"
              >
                Team Member
              </button>
              <button
                onClick={() => handleDemoLogin('Viewer')}
                className="px-3 py-2 text-sm bg-amber-100 dark:bg-dark-bg text-amber-700 dark:text-dark-text rounded-lg hover:bg-amber-200 dark:hover:bg-dark-border transition-all"
              >
                Viewer
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-amber-600 dark:text-dark-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-amber-600 dark:text-dark-muted hover:text-orange-600 dark:hover:text-orange-400">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
