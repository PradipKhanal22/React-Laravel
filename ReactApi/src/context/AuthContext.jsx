// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize axios headers with stored token
        AuthService.initAuth();
        
        // Check if user is authenticated
        if (AuthService.isAuthenticated()) {
          const currentUser = AuthService.getCurrentUser();
          setUser(currentUser);
          
          // Optional: Refresh user data from server
          try {
            const refreshedUser = await AuthService.refreshUser();
            if (refreshedUser) {
              setUser(refreshedUser);
            }
          } catch {
            console.log('Could not refresh user data');
            // Keep the cached user data
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await AuthService.login(credentials);
      if (result.success) {
        setUser(result.user);
        return result;
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user && AuthService.isAuthenticated();
  };

  const isAdmin = () => {
    return user && (AuthService.isAdmin() || user.email === 'dev@bits.com');
  };

  const hasRole = (role) => {
    return user && AuthService.hasRole(role);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;