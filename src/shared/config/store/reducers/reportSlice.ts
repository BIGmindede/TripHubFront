import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, ReportReqRes, ReportState } from "../types/reportSlice.types";

const initialState: ReportState = {
  reports: [],
  report: null,
  isLoading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportLoading(state) {
        state.isLoading = true;
        state.error = null;
    },
    setReportSuccess(state, action: PayloadAction<Partial<Report>>) {
        state.isLoading = false;
        state.report = { ...state.report, ...action.payload };
    },
    setReportError(state, action: PayloadAction<string | null>) {
        state.isLoading = false;
        state.error = action.payload;
    },
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

export const reportActions = reportSlice.actions;
export const reportReducer = reportSlice.reducer;