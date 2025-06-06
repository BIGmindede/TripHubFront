import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, Participation, ParticipationStatus, CurrentTripState } from '../types/tripSlice.types';

const initialState: CurrentTripState = {
  currentTrip: null,
  participations: [],
  isLoading: false,
  error: null,
};

const currentTripSlice = createSlice({
  name: 'currentTrip',
  initialState,
  reducers: {
    setCurrentTripLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setCurrentTripSuccess(state, action: PayloadAction<Trip>) {
      state.isLoading = false;
      state.currentTrip = action.payload;
    },
    setCurrentTripError(state, action: PayloadAction<string | null>) {
      state.currentTrip = null;
      state.participations = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentTripParticipationsSuccess(state, action: PayloadAction<Participation[]>) {
      state.isLoading = false;
      state.participations = action.payload.filter(participation => participation.status !== ParticipationStatus.INVITED);
    },
    setCurrentTripParticipationsOver(state) {
      state.isLoading = false;
      state.participations = state.participations.map(participation => ({...participation, isCurrent: false}));
    },
    deleteCurrentTripParticipationSuccess(state, action: PayloadAction<string>) {
      state.participations = state.participations.filter(
        participation => participation.id !== action.payload
      );
    },
    clearCurrentTrip(state) {
      state.currentTrip = null;
      state.participations = [];
      state.error = null;
    },
  }
});

export const currentTripActions = currentTripSlice.actions;
export const currentTripReducer = currentTripSlice.reducer; 