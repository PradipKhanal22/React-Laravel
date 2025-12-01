// src/constants/api/index.js
// Import all API endpoints
export { 
  PRODUCT_ENDPOINTS, 
  PRODUCT_HEADERS,
  default as productApi 
} from './productApi';

export { 
  CATEGORY_ENDPOINTS, 
  CATEGORY_HEADERS,
  default as categoryApi 
} from './categoryApi';

export { 
  AUTH_ENDPOINTS, 
  AUTH_HEADERS,
  USER_ROLES,
  default as authApi 
} from './authApi';

// Common API configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Common endpoints (auth, user, etc.)
export const COMMON_ENDPOINTS = {
  // Authentication
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  LOGOUT: `${BASE_URL}/logout`,
  REFRESH: `${BASE_URL}/refresh`,
  
  // User management
  USER_PROFILE: `${BASE_URL}/user`,
  UPDATE_PROFILE: `${BASE_URL}/user/profile`,
  CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
  
  // File uploads
  UPLOAD: `${BASE_URL}/upload`,
  UPLOAD_IMAGE: `${BASE_URL}/upload/image`,
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Common headers
export const COMMON_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  MULTIPART: {
    'Accept': 'application/json',
    // Don't set Content-Type for FormData
  },
};

// Export base URL for other uses
export { BASE_URL };