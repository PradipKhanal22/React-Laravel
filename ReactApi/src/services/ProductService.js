import axios from "axios";
import { toast } from "react-toastify";
import { PRODUCT_ENDPOINTS, PRODUCT_HEADERS } from "../constants/api";

const handleError = (error) => {
  console.error(error);
  toast.error(error.response?.data?.message || "Something went wrong!");
};

export const getProducts = async () => {
  try {
    const res = await axios.get(PRODUCT_ENDPOINTS.GET_ALL, {
      headers: PRODUCT_HEADERS.JSON,
    });
    return res.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios.get(PRODUCT_ENDPOINTS.GET_BY_ID(id), {
      headers: PRODUCT_HEADERS.JSON,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const res = await axios.post(PRODUCT_ENDPOINTS.CREATE, formData, {
      headers: PRODUCT_HEADERS.MULTIPART,
    });
    toast.success("Product created successfully!");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    if (data.photo) {
      formData.append('photo', data.photo);
    }
    formData.append('_method', 'PUT');

    const res = await axios.post(PRODUCT_ENDPOINTS.UPDATE(id), formData, {
      headers: PRODUCT_HEADERS.MULTIPART,
    });
    toast.success("Product updated successfully!");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(PRODUCT_ENDPOINTS.DELETE(id), {
      headers: PRODUCT_HEADERS.JSON,
    });
    toast.success("Product deleted successfully!");
  } catch (error) {
    handleError(error);
  }
};
