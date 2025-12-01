import axios from "axios";
import { toast } from "react-toastify";
import { CATEGORY_ENDPOINTS, CATEGORY_HEADERS } from "../constants/api";

const handleError = (error) => {
  console.error(error);
  toast.error(error.response?.data?.message || "Something went wrong!");
};

// Get all categories
export const getCategories = async () => {
  try {
    const res = await axios.get(CATEGORY_ENDPOINTS.GET_ALL, {
      headers: CATEGORY_HEADERS.JSON,
    });
    return res.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

// Get a single category by ID
export const getCategory = async (id) => {
  try {
    const res = await axios.get(CATEGORY_ENDPOINTS.GET_BY_ID(id), {
      headers: CATEGORY_HEADERS.JSON,
    });
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('priority', categoryData.priority);

    const res = await axios.post(CATEGORY_ENDPOINTS.CREATE, formData, {
      headers: CATEGORY_HEADERS.MULTIPART,
    });
    
    toast.success("Category created successfully!");
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Update an existing category
export const updateCategory = async (id, categoryData) => {
  try {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('priority', categoryData.priority);
    formData.append('_method', 'PUT');

    const res = await axios.post(CATEGORY_ENDPOINTS.UPDATE(id), formData, {
      headers: CATEGORY_HEADERS.MULTIPART,
    });
    
    toast.success("Category updated successfully!");
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    await axios.delete(CATEGORY_ENDPOINTS.DELETE(id), {
      headers: CATEGORY_HEADERS.JSON,
    });
    toast.success("Category deleted successfully!");
  } catch (error) {
    handleError(error);
    throw error;
  }
};