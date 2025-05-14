import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, TripsListState } from '../types/tripSlice.types';

const initialState: TripsListState = {
  trips: [],
  isLoading: false,
  error: null,
};

const tripsListSlice = createSlice({
  name: 'tripsList',
  initialState,
  reducers: {
    setTripsListLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setTripsListSuccess(state, action: PayloadAction<Trip[]>) {
      state.isLoading = false;
      state.trips = action.payload;
    },
    setTripsListError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTripInList(state, action: PayloadAction<Trip>) {
      state.trips = state.trips.map(trip => 
        trip.id === action.payload.id ? action.payload : trip
      );
    },
    deleteTripFromList(state, action: PayloadAction<string>) {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
    }
  }
});

export const tripsListActions = tripsListSlice.actions;
export const tripsListReducer = tripsListSlice.reducer; 