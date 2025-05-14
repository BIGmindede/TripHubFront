import { AppDispatch } from "app/providers/storeProvider/config/store";
import { reportApi } from "../http/report";
import { reportActions } from "../reducers/reportSlice";
import { budgetTables, Report, ReportReqRes } from "../types/reportSlice.types";
import { RefObject } from "react";

export const getReports = () => async (dispatch: AppDispatch) => {
  dispatch(reportActions.setReportsLoading());
  try {
    const response = await reportApi.getReports();
    dispatch(reportActions.setReportsSuccess(response.data));
  } catch (error) {
    dispatch(reportActions.setReportsError(error.response?.data?.message || 'Reports fetch failed'));
  }
};

export const getReportById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(reportActions.setReportLoading());
    try {
        const response = await reportApi.getReportById(id);
        dispatch(reportActions.setReportSuccess({
            ...response.data,
            plannedBudget: JSON.parse(response.data.plannedBudget) as budgetTables,
            totalBudget: JSON.parse(response.data.totalBudget) as budgetTables
        }));
    } catch (error) {
        dispatch(reportActions.setReportError(error.response?.data?.message || 'Report fetch failed'));
    }
};

export const getReportByTripId = (tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(reportActions.setReportLoading());
    try {
        const response = await reportApi.getReportByTripId(tripId);
        dispatch(reportActions.setReportSuccess({
            ...response.data,
            plannedBudget: JSON.parse(response.data.plannedBudget) as budgetTables,
            totalBudget: JSON.parse(response.data.totalBudget) as budgetTables
        }));
    } catch (error) {
        dispatch(reportActions.setReportError(error.response?.data?.message || 'Report fetch failed'));
    }
};

export const updateReport = (id: string, report: Partial<Report>, timerRef?: RefObject<NodeJS.Timeout>, debouncer?: (inner: () => void) => void) => async (dispatch: AppDispatch) => {
    dispatch(reportActions.setReportLoading());
    try {
        dispatch(reportActions.setReportSuccess(report));
        if (!timerRef) {
            await reportApi.updateReport(id, {
                ...report,
                plannedBudget: JSON.stringify(report.plannedBudget),
                totalBudget: JSON.stringify(report.totalBudget)
            });
        }
        else {
            debouncer(
                async () => await reportApi.updateReport(id, {
                    ...report,
                    plannedBudget: JSON.stringify(report.plannedBudget),
                    totalBudget: JSON.stringify(report.totalBudget)
                })
            )
        }
    } catch (error) {
        dispatch(reportActions.setReportError(error.response?.data?.message || 'Report update failed'));
    }
};

export const updateReportByTripId = (id: string, report: Partial<ReportReqRes>) => async (dispatch: AppDispatch) => {
    dispatch(reportActions.setReportLoading());
    try {
        dispatch(reportActions.setReportSuccess(report));
        await reportApi.updateReportByTripId(id, report);
    } catch (error) {
        dispatch(reportActions.setReportError(error.response?.data?.message || 'Report update failed'));
    }
};