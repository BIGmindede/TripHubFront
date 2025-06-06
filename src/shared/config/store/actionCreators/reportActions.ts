import { AppDispatch } from "app/providers/storeProvider/config/store";
import { reportApi } from "../http/report";
import { budgetTables, Report, ReportReqRes } from "../types/reportSlice.types";
import { RefObject } from "react";
import { reportsActions } from "../reducers/reportsSlice";
import { reportDetailsActions } from "../reducers/reportDetailsSlice";

export const getReports = () => async (dispatch: AppDispatch) => {
  dispatch(reportsActions.setReportsLoading());
  try {
    const response = await reportApi.getReports();
    dispatch(reportsActions.setReportsSuccess(response.data));
  } catch (error) {
    dispatch(reportsActions.setReportsError(error.response?.data?.message || 'Reports fetch failed'));
  }
};

export const getReportById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(reportDetailsActions.setReportDetailsLoading());
    try {
        const response = await reportApi.getReportById(id);
        dispatch(reportDetailsActions.setReportDetailsSuccess({
            ...response.data,
            plannedBudget: JSON.parse(response.data.plannedBudget) as budgetTables,
            totalBudget: JSON.parse(response.data.totalBudget) as budgetTables,
            equipmentTaken: JSON.parse(response.data.equipmentTaken) as string[],
        }));
    } catch (error) {
        dispatch(reportDetailsActions.setReportDetailsError(error.response?.data?.message || 'Report fetch failed'));
    }
};

export const getReportByTripId = (tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(reportDetailsActions.setReportDetailsLoading());
    try {
        const response = await reportApi.getReportByTripId(tripId);
        dispatch(reportDetailsActions.setReportDetailsSuccess({
            ...response.data,
            plannedBudget: JSON.parse(response.data.plannedBudget) as budgetTables,
            totalBudget: JSON.parse(response.data.totalBudget) as budgetTables,
            equipmentTaken: JSON.parse(response.data.equipmentTaken) as string[],
        }));
    } catch (error) {
        dispatch(reportDetailsActions.setReportDetailsError(error.response?.data?.message || 'Report fetch failed'));
    }
};

export const updateReport = (id: string, report: Partial<Report>, timerRef?: RefObject<NodeJS.Timeout>, debouncer?: (inner: () => void) => void) => async (dispatch: AppDispatch) => {
    dispatch(reportDetailsActions.setReportDetailsLoading());
    try {
        dispatch(reportDetailsActions.setReportDetailsSuccess(report));
        if (!timerRef) {
            await reportApi.updateReport(id, {
                ...report,
                plannedBudget: JSON.stringify(report.plannedBudget),
                totalBudget: JSON.stringify(report.totalBudget),
                equipmentTaken: JSON.stringify(report.equipmentTaken)
            });
        }
        else {
            debouncer(
                async () => await reportApi.updateReport(id, {
                    ...report,
                    plannedBudget: JSON.stringify(report.plannedBudget),
                    totalBudget: JSON.stringify(report.totalBudget),
                    equipmentTaken: JSON.stringify(report.equipmentTaken)
                })
            )
        }
    } catch (error) {
        dispatch(reportDetailsActions.setReportDetailsError(error.response?.data?.message || 'Report update failed'));
    }
};

export const updateReportByTripId = (id: string, report: Partial<ReportReqRes>) => async (dispatch: AppDispatch) => {
    dispatch(reportDetailsActions.setReportDetailsLoading());
    try {
        dispatch(reportDetailsActions.setReportDetailsSuccess(report));
        await reportApi.updateReportByTripId(id, report);
    } catch (error) {
        dispatch(reportDetailsActions.setReportDetailsError(error.response?.data?.message || 'Report update failed'));
    }
};