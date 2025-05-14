import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripStatistics, TripStatisticsState } from "../types/tripSlice.types";

const initialState: TripStatisticsState = {
  statistics: null,
  isLoading: false,
  error: null,
};

const tripStatisticsSlice = createSlice({
  name: 'tripStatistics',
  initialState,
  reducers: {
    setTripStatisticsLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setTripStatisticsSuccess(state, action: PayloadAction<TripStatistics>) {
      state.isLoading = false;
      state.statistics = action.payload;
    },
    setTripStatisticsError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearTripDetails(state) {
      state.statistics = null;
      state.error = null;
    }
  }
});

export const tripStatisticsActions = tripStatisticsSlice.actions;
export const tripStatisticsReducer = tripStatisticsSlice.reducer; 