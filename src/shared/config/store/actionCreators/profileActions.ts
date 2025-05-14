import { AppDispatch } from "app/providers/storeProvider/config/store";
import { profileActions } from "../reducers/profileSlice";
import { profileApi } from "../http/profiles";
import { Profile } from "../types/profileSlice.types";

export const getProfileById = (profileId: string) => async (dispatch: AppDispatch) => {
  dispatch(profileActions.setProfileLoading());
  try {
    const response = await profileApi.getProfileById(profileId);
    dispatch(profileActions.setProfileSuccess(response.data));
  } catch (error) {
    dispatch(profileActions.setProfileError(error.response?.data?.message || 'Profile fetch failed'));
  }
};

export const updateProfile = (profile: Profile) => async (dispatch: AppDispatch) => {
  dispatch(profileActions.setProfileLoading());
  try {
    await profileApi.updateProfile(profile);
    dispatch(profileActions.setProfileSuccess(profile));
  } catch (error) {
    dispatch(profileActions.setProfileError(error.response?.data?.message || 'Profile update failed'));
  }
};

export const deleteProfile = (profileId: string) => async (dispatch: AppDispatch) => {
  dispatch(profileActions.setProfileLoading());
  try {
    await profileApi.deleteProfile(profileId);
  } catch (error) {
    dispatch(profileActions.setProfileError(error.response?.data?.message || 'Profile delete failed'));
  }
};
