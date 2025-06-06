import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, TripsState } from '../types/tripSlice.types';

const initialState: TripsState = {
  trips: [],
  isLoading: false,
  error: null,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTripsLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setTripsSuccess(state, action: PayloadAction<Trip[]>) {
      state.isLoading = false;
      state.trips = action.payload;
    },
    setTripsError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const tripsActions = tripsSlice.actions;
export const tripsReducer = tripsSlice.reducer; 