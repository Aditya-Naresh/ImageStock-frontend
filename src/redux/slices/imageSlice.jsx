import { createSlice } from "@reduxjs/toolkit";
import { deleteImage, fetchImages, updateImage, updateImageOrder, uploadImages } from "../thunks/imageThunk";

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = Array.isArray(action.payload)
          ? [...state.images, ...action.payload].sort(
              (a, b) => a.order - b.order
            )
          : [...state.images, action.payload].sort((a, b) => a.order - b.order);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
        
      })
      .addCase(updateImageOrder.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
            state.images =action.payload.map(img => ({
                ...img,
                id: String(img.id)
            }))
        }
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        const index = state.images.findIndex(img => img.id === String(action.payload.id))
        if(index !== -1){
            state.images[index] = {
                ...action.payload,
                id: String(action.payload.id)
            }
        }
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter(img => img.id !== String(action.payload))
      })
  },
});


export default imageSlice.reducer
