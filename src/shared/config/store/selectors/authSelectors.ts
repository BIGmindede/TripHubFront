import { AppState } from 'app/providers/storeProvider/config/appReducer';

export const authIsLoadingSelector = (state: AppState) => state.authReducer.isLoading;
export const isAuthenticatedSelector = (state: AppState) => state.authReducer.isAuthenticated;
export const authErrorSelector = (state: AppState) => state.authReducer.error;