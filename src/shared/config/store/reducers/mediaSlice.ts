import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, MediaState } from '../types/media';

const initialState: MediaState = {
  media: [],
  isLoading: false,
  error: null,
  uploadProgress: 0,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMediaLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setMediaSuccess(state, action: PayloadAction<Media[]>) {
      state.isLoading = false;
      state.media = action.payload;
    },
    setUploadMediaSuccess(state, action: PayloadAction<Media>) {
      state.isLoading = false;
      state.media = [...state.media, action.payload];
    },
    setMediaError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    resetUploadProgress(state) {
      state.uploadProgress = 0;
    },
  },
});

export const mediaActions = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;