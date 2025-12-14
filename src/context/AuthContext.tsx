import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
  promptLogin: () => void;
  dismissLoginPrompt: () => void;
  showLoginPrompt: boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Mock user database (in real app, this would be backend)
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@taskflow.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'user@taskflow.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as UserRole,
    createdAt: '2024-01-15',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('taskapp_user', null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [guestActionCount, setGuestActionCount] = useState(0);

  const isAuthenticated = !!user && user.role !== 'guest';
  const isGuest = user?.role === 'guest';

  // Prompt login after certain actions as guest
  useEffect(() => {
    if (isGuest && guestActionCount >= 5 && !showLoginPrompt) {
      setShowLoginPrompt(true);
    }
  }, [guestActionCount, isGuest, showLoginPrompt]);

  const login = useCallback(
    async (email: string, password: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword as User);
      setShowLoginPrompt(false);
    },
    [setUser]
  );

  const signup = useCallback(
    async (email: string, _password: string, name: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if email already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setUser(newUser);
      setShowLoginPrompt(false);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    setGuestActionCount(0);
  }, [setUser]);

  const continueAsGuest = useCallback(() => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@local',
      name: 'Guest User',
      role: 'guest',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(guestUser);
    setShowLoginPrompt(false);
  }, [setUser]);

  const promptLogin = useCallback(() => {
    if (isGuest) {
      setGuestActionCount((prev) => prev + 1);
    }
  }, [isGuest]);

  const dismissLoginPrompt = useCallback(() => {
    setShowLoginPrompt(false);
  }, []);

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      if (user) {
        setUser({ ...user, ...updates });
      }
    },
    [user, setUser]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        login,
        signup,
        logout,
        continueAsGuest,
        promptLogin,
        dismissLoginPrompt,
        showLoginPrompt,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
