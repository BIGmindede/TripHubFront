import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportReqRes, ReportsState } from "../types/reportSlice.types";

const initialState: ReportsState = {
  reports: [],
  isLoading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportsLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setReportsSuccess(state, action: PayloadAction<ReportReqRes[]>) {
        state.isLoading = false;
        state.reports = action.payload;
    },
    setReportsError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
});

export const reportsActions = reportsSlice.actions;
export const reportsReducer = reportsSlice.reducer;