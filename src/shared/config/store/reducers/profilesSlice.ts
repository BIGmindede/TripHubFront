import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileRoles, ProfilesState } from '../types/profileSlice.types';

// export const mockProfiles: Profile[] = [
//     {
//         id: "1",
//         email: "alex@example.com",
//         name: "Alex Smith",
//         country: "Russia",
//         birthDate: "1990-01-01",
//         tagName: "alexsmith",
//         role: ProfileRoles.ACTIVE,
//         enabled: true
//     },
//     {
//         id: "2",
//         email: "maria@example.com",
//         name: "Maria Ivanova",
//         country: "Russia",
//         birthDate: "1992-05-15",
//         tagName: "mariaivanova",
//         role: ProfileRoles.ACTIVE,
//         enabled: true
//     },
//     {
//         id: "3",
//         email: "john@example.com",
//         name: "John Doe",
//         country: "USA",
//         birthDate: "1988-11-23",
//         tagName: "johndoe",
//         role: ProfileRoles.INACTIVE,
//         enabled: true
//     },
//     {
//         id: "4",
//         email: "anna@example.com",
//         name: "Anna Petrova",
//         country: "Russia",
//         birthDate: "1995-03-10",
//         tagName: "annapetrova",
//         role: ProfileRoles.ACTIVE,
//         enabled: true
//     },
//     {
//         id: "5",
//         email: "michael@example.com",
//         name: "Michael Brown",
//         country: "UK",
//         birthDate: "1991-07-30",
//         tagName: "michaelbrown",
//         role: ProfileRoles.ACTIVE,
//         enabled: true
//     }
// ];

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
        },
        updateProfileSuccess(state, action: PayloadAction<Profile>) {
            state.isLoading = false;
            state.profiles = state.profiles.map(profile => 
                profile.id === action.payload.id ? action.payload : profile
            );
        },
        deleteProfileSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
        }
    }
});

export const profilesActions = profilesSlice.actions;
export const profilesReducer = profilesSlice.reducer;
