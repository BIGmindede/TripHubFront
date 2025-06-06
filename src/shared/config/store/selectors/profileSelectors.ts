import { AppState } from 'app/providers/storeProvider/config/appReducer';

export const currentProfileIsLoadingSelector = (state: AppState) => state.currentProfileReducer.isLoading;
export const currentProfileSelector = (state: AppState) => state.currentProfileReducer.currentProfile;
export const currentProfileErrorSelector = (state: AppState) => state.currentProfileReducer.error;

export const profilesIsLoadingSelector = (state: AppState) => state.profilesReducer.isLoading;
export const profilesSelector = (state: AppState) => state.profilesReducer.profiles;
export const profilesErrorSelector = (state: AppState) => state.profilesReducer.error;

export const profileDetailsIsLoadingSelector = (state: AppState) => state.profileDetailsReducer.isLoading;
export const profileDetailsSelector = (state: AppState) => state.profileDetailsReducer.profile;
export const profileDetailsErrorSelector = (state: AppState) => state.profileDetailsReducer.error;

export const searchProfilesIsLoadingSelector = (state: AppState) => state.searchProfilesReducer.isLoading;
export const searchProfilesSelector = (state: AppState) => state.searchProfilesReducer.profiles;
export const searchProfilesErrorSelector = (state: AppState) => state.searchProfilesReducer.error;
