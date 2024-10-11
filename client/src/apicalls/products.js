import { message } from "antd";
import { axiosInstance } from "./axiosInstance";



export const addProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/products/addProduct`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      `/api/products/getProducts`,
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/editProduct/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/products/deleteProduct/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/getProduct/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const uploadImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/products/uploadImage`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/products//updateStatus/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/bids/placeNewBid`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllBids = async(filter)=>{
  try{
    const response = await axiosInstance.post(
      `/api/bids/getAllBids`,
      filter
    );
    return response.data;
  }catch(error){
    return error.message;
  }
}
