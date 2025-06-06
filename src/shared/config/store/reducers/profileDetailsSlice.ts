import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileDetailsState } from '../types/profileSlice.types';

const initialState: ProfileDetailsState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileDetailsSlice = createSlice({
  name: 'profileDetails',
  initialState,
  reducers: {
    setProfileDetailsLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setProfileDetailsSuccess(state, action: PayloadAction<Profile>) {
        state.isLoading = false;
        state.profile = action.payload;
    },
    setProfileDetailsError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
});

export const profileDetailsActions = profileDetailsSlice.actions;
export const profileDetailsReducer = profileDetailsSlice.reducer;