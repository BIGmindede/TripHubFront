import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participation, ParticipationStatus, Trip, TripDetailsState } from '../types/tripSlice.types';

const initialState: TripDetailsState = {
  participations: [],
  trip: null,
  isLoading: false,
  error: null,
};

const tripDetailsSlice = createSlice({
  name: 'tripDetails',
  initialState,
  reducers: {
    setTripDetailsLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setTripDetailsSuccess(state, action: PayloadAction<Trip>) {
      state.isLoading = false;
      state.trip = action.payload;
    },
    setTripDetailsError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setParticipationsSuccess(state, action: PayloadAction<Participation[]>) {
        state.isLoading = false;
        state.participations = action.payload.filter(participation => participation.status !== ParticipationStatus.INVITED);
    },
    setParticipationsOver(state) {
        state.isLoading = false;
        state.participations = state.participations.map(participation => ({...participation, isCurrent: false}));
    },
    deleteParticipationSuccess(state, action: PayloadAction<string>) {
        state.participations = state.participations.filter(
            participation => participation.id !== action.payload
        );
    }
  }
});

export const tripDetailsActions = tripDetailsSlice.actions;
export const tripDetailsReducer = tripDetailsSlice.reducer; 