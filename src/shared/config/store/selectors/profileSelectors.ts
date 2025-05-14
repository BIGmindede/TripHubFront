import { AppState } from 'app/providers/storeProvider/config/appReducer';

export const selectProfiles = (state: AppState) => state.profilesReducer.profiles;
export const selectProfilesLoading = (state: AppState) => state.profilesReducer.isLoading;
export const selectProfilesError = (state: AppState) => state.profilesReducer.error;
export const selectProfileById = (id: string) => (state: AppState) => state.profilesReducer.profiles.find(profile => profile.id === id);
export const selectSearchProfiles = (state: AppState) => state.searchProfilesReducer.profiles;

export const selectProfile = (state: AppState) => state.profileReducer.profile;
export const selectProfileLoading = (state: AppState) => state.profileReducer.isLoading;
export const selectProfileError = (state: AppState) => state.profileReducer.error;
