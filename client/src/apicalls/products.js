import { message } from "antd";
import { axiosInstance } from "./axiosInstance";
import { baseURL } from "./axiosInstance";



export const addProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/products/addProduct`,
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
      `${baseURL}/api/products/getProducts`,
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
      `${baseURL}/api/products/editProduct/${id}`,
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
      `${baseURL}/api/products/deleteProduct/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/api/products/getProduct/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const uploadImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/products/uploadImage`,
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
      `${baseURL}/api/products//updateStatus/${id}`,
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
      `${baseURL}/api/bids/placeNewBid`,
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
      `${baseURL}/api/bids/getAllBids`,
      filter
    );
    return response.data;
  }catch(error){
    return error.message;
  }
}
