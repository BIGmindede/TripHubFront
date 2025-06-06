import { AppDispatch } from "app/providers/storeProvider/config/store";
import { LoginRequest, RegisterRequest } from "shared/config/store/types/authSlice.types";
import { authActions } from "../reducers/authSlice";
import { authApi } from "shared/config/store/http/auth";
import Cookies from "universal-cookie";
import { getProfileById } from "./profileActions";

export const register = (profileData: RegisterRequest) => async (dispatch: AppDispatch) => {
    dispatch(authActions.setAuthLoading());
    try {
        await authApi.register(profileData);
        dispatch(authActions.setUnauth());
    } catch (error) {
        dispatch(authActions.setAuthError(error.response?.data?.message || 'Registration failed'));
    }
};
  
export const login = (credentials: LoginRequest) => async (dispatch: AppDispatch) => {
    dispatch(authActions.setAuthLoading());
    try {
        await authApi.login(credentials);
        const cookies = new Cookies();
        const profileId = cookies.get('profile_id');
        dispatch(getProfileById(profileId));
        dispatch(authActions.setAuthSuccess());
    } catch (error) {
        dispatch(authActions.setAuthError(error.response?.data?.message || 'Login failed'));
    }
};
  
export const refreshAuth = () => async (dispatch: AppDispatch) => {
    dispatch(authActions.setAuthLoading());
    const cookies = new Cookies();
    try {
        await authApi.refresh();
        dispatch(authActions.setAuthSuccess());
    } catch (error) {
        cookies.remove('profile_id')
        dispatch(authActions.setAuthError(error.response?.data?.message || 'Session expired'));
    }
};

export const unauth = () => async (dispatch: AppDispatch) => {
    dispatch(authActions.setAuthLoading());
    try {
        await authApi.logout();
        dispatch(authActions.setUnauth());
    } catch (error) {
        dispatch(authActions.setAuthError(error.response?.data?.message || 'Session already closed'));
        dispatch(authActions.setUnauth());
    }
};