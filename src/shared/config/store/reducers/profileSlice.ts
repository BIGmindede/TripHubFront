import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileState } from '../types/profileSlice.types';

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfileLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setProfileSuccess(state, action: PayloadAction<Profile>) {
        state.isLoading = false;
        state.profile = { ...state.profile, ...action.payload };
    },
    setProfileError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;