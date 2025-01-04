import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axioConfiguration";

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/images/");
      console.log(response.data);
      if (Array.isArray(response.data)) {
        
        return response.data;
      } else {
        console.error("Unexpected API response: ", response.data);
        return [];
      }
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(
        error.response?.data || "An error occured while fetching images"
      );
    }
  }
);

export const uploadImages = createAsyncThunk(
  "images/uploadImages",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/images/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(fetchImages());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occured while uploading images"
      );
    }
  }
);

export const updateImageOrder = createAsyncThunk(
  "images/updateImageOrder",
  async (orderedImages, { rejectWithValue }) => {
    console.log(orderedImages);
    
    try {
      const response = await axiosInstance.patch("api/images/reorder/", {
        ordered_images: orderedImages,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateImage = createAsyncThunk(
  "images/updateImage",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `api/images/${id}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (imageId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`api/images/${imageId}/`);
      return imageId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
