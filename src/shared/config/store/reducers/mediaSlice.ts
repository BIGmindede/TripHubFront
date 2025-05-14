import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaMetadata, MediaState } from '../types/media';

const initialState: MediaState = {
  currentTripMedia: [],
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
    setMediaSuccess(state, action: PayloadAction<MediaMetadata[]>) {
      state.isLoading = false;
      state.currentTripMedia = action.payload;
    },
    setUploadMediaSuccess(state, action: PayloadAction<MediaMetadata>) {
      state.isLoading = false;
      state.currentTripMedia = [...state.currentTripMedia, action.payload];
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