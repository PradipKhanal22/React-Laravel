// src/constants/api/categoryApi.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Category API Endpoints
export const CATEGORY_ENDPOINTS = {
  // Base endpoint
  BASE: `${BASE_URL}/categories`,
  
  // CRUD operations
  GET_ALL: `${BASE_URL}/categories`,
  GET_BY_ID: (id) => `${BASE_URL}/categories/${id}`,
  CREATE: `${BASE_URL}/categories`,
  UPDATE: (id) => `${BASE_URL}/categories/${id}`,
  DELETE: (id) => `${BASE_URL}/categories/${id}`,
  
  // Category-specific operations
  GET_WITH_PRODUCTS: (id) => `${BASE_URL}/categories/${id}/products`,
  GET_POPULAR: `${BASE_URL}/categories/popular`,
  GET_TREE: `${BASE_URL}/categories/tree`, // for hierarchical categories
};

// Category-specific headers
export const CATEGORY_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  MULTIPART: {
    'Accept': 'application/json',
    // For category images if needed
  },
};

export default CATEGORY_ENDPOINTS;