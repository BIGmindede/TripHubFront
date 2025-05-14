import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfilesState } from '../types/profileSlice.types';

const initialState: ProfilesState = {
    profiles: [],
    isLoading: false,
    error: null,
};

const searchProfilesSlice = createSlice({
    name: 'profiles',
    initialState: {
        ...initialState
    },
    reducers: {
        setSearchProfilesLoading(state) {
            state.isLoading = true;
            state.error = null;
        },
        setSearchProfilesSuccess(state, action: PayloadAction<Profile[]>) {
            state.isLoading = false;
            state.profiles = action.payload;
        },
        setSearchProfilesError(state, action: PayloadAction<string | null>) {
            state.isLoading = false;
            state.profiles = [];
            state.error = action.payload;
        },
        clearSearchProfiles(state) {
            state.isLoading = false;
            state.error = null;
            state.profiles = [];
        }
    }
});

export const searchProfilesActions = searchProfilesSlice.actions;
export const searchProfilesReducer = searchProfilesSlice.reducer;
