import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileRoles, ProfilesState } from '../types/profileSlice.types';

const initialState: ProfilesState = {
    profiles: [],
    isLoading: false,
    error: null,
};

const profilesSlice = createSlice({
    name: 'profiles',
    initialState: {
        ...initialState
    },
    reducers: {
        setProfilesLoading(state) {
            state.isLoading = true;
            state.error = null;
        },
        setProfilesSuccess(state, action: PayloadAction<Profile[]>) {
            state.isLoading = false;
            state.profiles = action.payload;
        },
        setProfilesError(state, action: PayloadAction<string | null>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const profilesActions = profilesSlice.actions;
export const profilesReducer = profilesSlice.reducer;
