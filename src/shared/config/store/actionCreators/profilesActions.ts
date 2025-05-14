import { AppDispatch } from "app/providers/storeProvider/config/store";
import { profilesActions } from "../reducers/profilesSlice";
import { profileApi } from "../http/profiles";
import { searchProfilesActions } from "../reducers/searchProfilesSlice";

export const getProfilesByIds = (ids: string[]) => async (dispatch: AppDispatch) => {
    dispatch(profilesActions.setProfilesLoading());
    try {
        const response = await profileApi.getProfilesByIds(ids);
        dispatch(profilesActions.setProfilesSuccess(response.data));
        // const profiles = mockProfiles.filter((p: Profile) => ids.includes(p.id));
        // dispatch(profilesActions.setProfilesSuccess(profiles));
    } catch (error) {
        dispatch(profilesActions.setProfilesError(error.response?.data?.message || 'Failed to fetch profiles'));
    }
};

export const getSearchProfilesByTagName = (tagName: string) => async (dispatch: AppDispatch) => {
    dispatch(searchProfilesActions.setSearchProfilesLoading());
    try {
        const response = await profileApi.getProfilesByTagName(tagName);
        dispatch(searchProfilesActions.setSearchProfilesSuccess(response.data));
        // const profiles = mockProfiles.filter((p: Profile) => p.tagName.toLowerCase().includes(tagName.toLowerCase()));
        // dispatch(searchProfilesActions.setSearchProfilesSuccess(profiles));
    } catch (error) {
        dispatch(searchProfilesActions.setSearchProfilesError(error.response?.data?.message || 'Failed to fetch profiles by tag'));
    }
};

export const getSearchProfilesByName = (name: string) => async (dispatch: AppDispatch) => {
    dispatch(searchProfilesActions.setSearchProfilesLoading());
    try {
        const response = await profileApi.getProfilesByName(name);
        dispatch(searchProfilesActions.setSearchProfilesSuccess(response.data));
        // const profiles = mockProfiles.filter((p: Profile) => p.name.toLowerCase().includes(name.toLowerCase()));
        // dispatch(searchProfilesActions.setSearchProfilesSuccess(profiles));
    } catch (error) {
        dispatch(searchProfilesActions.setSearchProfilesError(error.response?.data?.message || 'Failed to fetch profiles by name'));
    }
};

export const getSearchProfilesByEmail = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(searchProfilesActions.setSearchProfilesLoading());
    try {
        const response = await profileApi.getProfilesByEmail(email);
        dispatch(searchProfilesActions.setSearchProfilesSuccess(response.data));
        // const profiles = mockProfiles.filter((p: Profile) => p.email.toLowerCase().includes(email.toLowerCase()));
        // dispatch(searchProfilesActions.setSearchProfilesSuccess(profiles));
    } catch (error) {
        dispatch(searchProfilesActions.setSearchProfilesError(error.response?.data?.message || 'Failed to fetch profiles by email'));
    }
};
