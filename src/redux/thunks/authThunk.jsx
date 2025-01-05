import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axioConfiguration";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/register/", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const emailVerification = createAsyncThunk(
  "auth/verification",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/verification/", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/login/", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.log(error);
      
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({
          error: "An unexpected error occured",
        });
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/forgot-password/", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch("auth/set-password/", data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(
          error.response.data.detail || "Failed to reset password"
        );
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occured");
      }
    }
  }
);
