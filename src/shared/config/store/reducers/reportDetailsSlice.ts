import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, ReportDetailsState } from "../types/reportSlice.types";

const initialState: ReportDetailsState = {
  report: null,
  isLoading: false,
  error: null,
};

const reportDetailsSlice = createSlice({
  name: 'reportDetails',
  initialState,
  reducers: {
    setReportDetailsLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setReportDetailsSuccess(state, action: PayloadAction<Partial<Report>>) {
        state.isLoading = false;
        state.report = { ...state.report, ...action.payload };
    },
    setReportDetailsError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
});

export const reportDetailsActions = reportDetailsSlice.actions;
export const reportDetailsReducer = reportDetailsSlice.reducer;