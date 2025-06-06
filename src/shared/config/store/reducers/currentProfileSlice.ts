import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentProfileState, Profile } from '../types/profileSlice.types';

const initialState: CurrentProfileState = {
  currentProfile: null,
  isLoading: false,
  error: null,
};

const currentProfileSlice = createSlice({
  name: 'currentProfile',
  initialState,
  reducers: {
    setCurrentProfileLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setCurrentProfileSuccess(state, action: PayloadAction<Profile>) {
        state.isLoading = false;
        state.currentProfile = action.payload;
    },
    setCurrentProfileError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
});

export const currentProfileActions = currentProfileSlice.actions;
export const currentProfileReducer = currentProfileSlice.reducer;