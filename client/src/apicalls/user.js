import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3000/api/users/register",
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
      "http://localhost:3000/api/users/login",
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
      "http://localhost:3000/api/users/getCurrentUser"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:3000/api/users/getUsers"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateUserStatus = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:3000/api/users/updateStatus/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
