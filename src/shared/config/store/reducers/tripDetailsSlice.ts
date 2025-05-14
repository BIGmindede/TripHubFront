import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, Participation, ParticipationStatus, TripState } from '../types/tripSlice.types';

const initialState: TripState = {
  trip: null,
  participations: [],
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
      state.trip = null;
      state.participations = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    clearTripDetails(state) {
      state.trip = null;
      state.participations = [];
      state.error = null;
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