import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/authSlice.types';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setAuthSuccess(state) {
        state.isLoading = false;
        state.isAuthenticated = true;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
    setUnauth(state) {
        state.isLoading = false;
        state.isAuthenticated = false;
    },
  }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;