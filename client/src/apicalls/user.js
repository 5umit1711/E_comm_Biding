import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/login",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/users/getCurrentUser"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/users/getUsers"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateUserStatus = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/updateStatus/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
