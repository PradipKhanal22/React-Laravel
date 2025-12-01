// src/constants/api/authApi.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Auth API Endpoints
export const AUTH_ENDPOINTS = {
  // Authentication
  LOGIN: `${BASE_URL}/login`,
  LOGOUT: `${BASE_URL}/logout`,
  REGISTER: `${BASE_URL}/register`,
  REFRESH: `${BASE_URL}/refresh-token`,
  
  // User info
  ME: `${BASE_URL}/me`, // Get current user info
  PROFILE: `${BASE_URL}/profile`,
  
  // Password management
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,
  CHANGE_PASSWORD: `${BASE_URL}/change-password`,
};

// Auth-specific headers
export const AUTH_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  WITH_TOKEN: (token) => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }),
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
};

export default AUTH_ENDPOINTS;