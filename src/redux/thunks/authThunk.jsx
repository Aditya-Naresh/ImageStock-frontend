import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axioConfiguration";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/register/", userData);
        return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const emailVerification = createAsyncThunk(
  "auth/verification",
  async(data, thunkAPI) => {
    try {
      const response =await axiosInstance.post("auth/verification/", data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)