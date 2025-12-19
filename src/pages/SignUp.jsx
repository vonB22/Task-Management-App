import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

/**
 * SignUp Component
 * Frontend-only sign up page with local storage
 */
const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'TeamMember', // Default role
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'Admin', label: 'Admin', description: 'Full system access' },
    { value: 'Manager', label: 'Manager', description: 'Team management' },
    { value: 'TeamMember', label: 'Team Member', description: 'Create and manage tasks' },
    { value: 'Viewer', label: 'Viewer', description: 'View only access' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // Get existing users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if email already exists
      if (storedUsers.some((u) => u.email === formData.email)) {
        setErrors({ general: 'An account with this email already exists' });
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In production, this would be hashed
        role: formData.role,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Log in the user (without password)
      const { password, ...userWithoutPassword } = newUser;
      login(userWithoutPassword);

      // Navigate to dashboard
      navigate('/dashboard');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
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
              <span className="text-white font-bold text-xl">TK</span>
            </div>
            <span className="text-2xl font-bold text-amber-950 dark:text-dark-text">Taskler</span>
          </Link>
          <h1 className="text-3xl font-bold text-amber-950 dark:text-dark-text mb-2">Create Account</h1>
          <p className="text-amber-600 dark:text-dark-muted">Join Taskler today</p>
        </div>

        {/* Sign Up Form */}
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

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-amber-700 dark:text-dark-text mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-amber-200 dark:border-dark-border focus:ring-orange-500'
                } dark:bg-dark-bg dark:text-dark-text focus:outline-none focus:ring-2 transition-all`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>

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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-700 dark:text-dark-text mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-amber-200 dark:border-dark-border focus:ring-orange-500'
                } dark:bg-dark-bg dark:text-dark-text focus:outline-none focus:ring-2 transition-all`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-amber-700 dark:text-dark-text mb-3">
                Select Role <span className="text-xs text-amber-500 dark:text-dark-muted">(For demo purposes)</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={`relative flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.role === role.value
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-amber-200 dark:border-dark-border hover:border-orange-300 dark:hover:border-orange-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-semibold text-amber-950 dark:text-dark-text">{role.label}</span>
                    <span className="text-xs text-amber-600 dark:text-dark-muted">{role.description}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-amber-600 dark:text-dark-muted">
            Already have an account?{' '}
            <Link to="/signin" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">
              Sign in
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

export default SignUp;
