// src/constants/api/productApi.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Product API Endpoints
export const PRODUCT_ENDPOINTS = {
  // Base endpoint
  BASE: `${BASE_URL}/products`,
  
  // CRUD operations
  GET_ALL: `${BASE_URL}/products`,
  GET_BY_ID: (id) => `${BASE_URL}/products/${id}`,
  CREATE: `${BASE_URL}/products`,
  UPDATE: (id) => `${BASE_URL}/products/${id}`,
  DELETE: (id) => `${BASE_URL}/products/${id}`,
  
  // Additional product operations (for future use)
  SEARCH: `${BASE_URL}/products/search`,
  FILTER_BY_CATEGORY: (categoryId) => `${BASE_URL}/products/category/${categoryId}`,
  FEATURED: `${BASE_URL}/products/featured`,
  LATEST: `${BASE_URL}/products/latest`,
};

// Product-specific headers
export const PRODUCT_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  MULTIPART: {
    'Accept': 'application/json',
    // Don't set Content-Type for FormData, let browser set it with boundary
  },
};

export default PRODUCT_ENDPOINTS;