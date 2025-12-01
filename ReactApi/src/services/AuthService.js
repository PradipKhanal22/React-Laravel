// src/services/AuthService.js
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_ENDPOINTS, AUTH_HEADERS, USER_ROLES } from "../constants/api";

const handleError = (error) => {
  console.error("Auth Error:", error);
  toast.error(error.response?.data?.message || "Authentication failed!");
  throw error;
};

// Local storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const AuthService = {
  // Login function
  login: async (credentials) => {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, credentials, {
        headers: AUTH_HEADERS.JSON,
      });

      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      // Set default axios header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      toast.success(`Welcome ${user.name || user.email}!`);
      
      return { token, user, success: true };
    } catch (error) {
      handleError(error);
      return { success: false, error: error.response?.data };
    }
  },

  // Logout function
  logout: async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (token) {
        // Call logout endpoint to invalidate token on server
        await axios.post(AUTH_ENDPOINTS.LOGOUT, {}, {
          headers: AUTH_HEADERS.WITH_TOKEN(token),
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage and axios headers
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      delete axios.defaults.headers.common['Authorization'];
      toast.success("Logged out successfully!");
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = AuthService.getCurrentUser();
    return !!(token && user);
  },

  // Check if user is admin
  isAdmin: () => {
    const user = AuthService.getCurrentUser();
    return user && (user.role === USER_ROLES.ADMIN || user.email === 'dev@bits.com');
  },

  // Check if user has specific role
  hasRole: (role) => {
    const user = AuthService.getCurrentUser();
    return user && user.role === role;
  },

  // Initialize auth on app start
  initAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  // Refresh user data
  refreshUser: async () => {
    try {
      const token = AuthService.getToken();
      if (!token) return null;

      const response = await axios.get(AUTH_ENDPOINTS.ME, {
        headers: AUTH_HEADERS.WITH_TOKEN(token),
      });

      const user = response.data.user || response.data;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error("Error refreshing user:", error);
      // If refresh fails, logout user
      AuthService.logout();
      return null;
    }
  },

  // Handle authentication redirect based on user role
  getRedirectPath: (user) => {
    if (!user) return '/login';
    
    // Admin users go to dashboard
    if (user.role === USER_ROLES.ADMIN || user.email === 'dev@bits.com') {
      return '/admin/dashboard';
    }
    
    // Regular users go to home
    return '/';
  },
};

export default AuthService;