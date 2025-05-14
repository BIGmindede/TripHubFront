import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, TripState } from '../types/tripSlice.types';

const initialState: Omit<TripState, 'participations'> = {
  trip: null,
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
      state.trip = action.payload;
    },
    setCurrentTripError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearCurrentTrip(state) {
      state.trip = null;
      state.error = null;
    }
  }
});

export const currentTripActions = currentTripSlice.actions;
export const currentTripReducer = currentTripSlice.reducer; 