import { AppState } from "app/providers/storeProvider/config/appReducer";

export const reportsIsLoadingSelector = (state: AppState) => state.reportsReducer.isLoading;
export const reportsSelector = (state: AppState) => state.reportsReducer.reports;
export const reportsErrorSelector = (state: AppState) => state.reportsReducer.error;

export const reportDetailsIsLoadingSelector = (state: AppState) => state.reportDetailsReducer.isLoading;
export const reportDetailsSelector = (state: AppState) => state.reportDetailsReducer.report;
export const reportDetailsErrorSelector = (state: AppState) => state.reportDetailsReducer.error;
