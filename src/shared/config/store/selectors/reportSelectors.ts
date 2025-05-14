import { AppState } from "app/providers/storeProvider/config/appReducer";

export const selectReports = (state: AppState) => state.reportReducer.reports;
export const selectReport = (state: AppState) => state.reportReducer.report;
