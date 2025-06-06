import { AppDispatch } from "app/providers/storeProvider/config/store";
import { profileApi } from "../http/profiles";
import { Profile } from "../types/profileSlice.types";
import { profilesActions } from "../reducers/profilesSlice";
import { searchProfilesActions } from "../reducers/searchProfilesSlice";
import { profileDetailsActions } from "../reducers/profileDetailsSlice";
import { currentProfileActions } from "../reducers/currentProfileSlice";
import Cookies from "universal-cookie";

export const getProfilesByIds = (ids: string[]) => async (dispatch: AppDispatch) => {
    dispatch(profilesActions.setProfilesLoading());
    try {
        const response = await profileApi.getProfilesByIds(ids);
        dispatch(profilesActions.setProfilesSuccess(response.data));
    } catch (error) {
        dispatch(profilesActions.setProfilesError(error.response?.data?.message || 'Failed to fetch profiles'));
    }
};

export const getSearchProfilesByTagName = (tagName: string) => async (dispatch: AppDispatch) => {
    dispatch(searchProfilesActions.setSearchProfilesLoading());
    try {
        const response = await profileApi.getProfilesByTagName(tagName);
        dispatch(searchProfilesActions.setSearchProfilesSuccess(response.data));
    } catch (error) {
        dispatch(searchProfilesActions.setSearchProfilesError(error.response?.data?.message || 'Failed to fetch profiles by tag'));
    }
};

export const getSearchProfilesByName = (name: string) => async (dispatch: AppDispatch) => {
    dispatch(searchProfilesActions.setSearchProfilesLoading());
    try {
        const response = await profileApi.getProfilesByName(name);
        dispatch(searchProfilesActions.setSearchProfilesSuccess(response.data));
    } catch (error) {
        dispatch(searchProfilesActions.setSearchProfilesError(error.response?.data?.message || 'Failed to fetch profiles by name'));
    }
};

export const getSearchProfilesByEmail = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(searchProfilesActions.setSearchProfilesLoading());
    try {
        const response = await profileApi.getProfilesByEmail(email);
        dispatch(searchProfilesActions.setSearchProfilesSuccess(response.data));
    } catch (error) {
        dispatch(searchProfilesActions.setSearchProfilesError(error.response?.data?.message || 'Failed to fetch profiles by email'));
    }
};

export const getProfileById = (profileId: string) => async (dispatch: AppDispatch) => {
  dispatch(profileDetailsActions.setProfileDetailsLoading());
  try {
    const response = await profileApi.getProfileById(profileId);
    dispatch(profileDetailsActions.setProfileDetailsSuccess(response.data));
  } catch (error) {
    dispatch(profileDetailsActions.setProfileDetailsError(error.response?.data?.message || 'Profile fetch failed'));
  }
};

export const getCurrentProfile = () => async (dispatch: AppDispatch) => {
  dispatch(currentProfileActions.setCurrentProfileLoading());
  try {
    const cookies = new Cookies();
    const profileId = cookies.get("profile_id");
    const response = await profileApi.getProfileById(profileId);
    dispatch(currentProfileActions.setCurrentProfileSuccess(response.data));
  } catch (error) {
    dispatch(currentProfileActions.setCurrentProfileError(error.response?.data?.message || 'Profile fetch failed'));
  }
};

export const updateCurrentProfile = (profile: Profile) => async (dispatch: AppDispatch) => {
  dispatch(currentProfileActions.setCurrentProfileLoading());
  try {
    await profileApi.updateProfile(profile);
    dispatch(currentProfileActions.setCurrentProfileSuccess(profile));
  } catch (error) {
    dispatch(currentProfileActions.setCurrentProfileError(error.response?.data?.message || 'Profile update failed'));
  }
};
