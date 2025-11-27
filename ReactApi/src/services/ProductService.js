import axios from "axios";
import { toast } from "react-toastify";

const API = "http://127.0.0.1:8000/api/products";

const handleError = (error) => {
  console.error(error);
  toast.error(error.response?.data?.message || "Something went wrong!");
};

export const getProducts = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post(API, data);
    toast.success("Product created successfully!");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`${API}/${id}`, data);
    toast.success("Product updated successfully!");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);
    toast.success("Product deleted successfully!");
  } catch (error) {
    handleError(error);
  }
};
