import { AppState } from 'app/providers/storeProvider/config/appReducer';

export const selectAuthIsLoading = (state: AppState) => state.authReducer.isLoading;
export const selectIsAuthenticated = (state: AppState) => state.authReducer.isAuthenticated;
export const selectAuthError = (state: AppState) => state.authReducer.error;