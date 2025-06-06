import { api } from ".";
import { updateReportByTripId } from "../actionCreators/reportActions";
import { Report, ReportReqRes } from "../types/reportSlice.types";

export const reportApi = {
    getReports: () => 
        api.get<ReportReqRes[]>('/reports'),

    getReportById: (id: string) =>
        api.get<ReportReqRes>(`/reports/${id}`),

    getReportByTripId: (tripId: string) =>
        api.get<ReportReqRes>(`/reports/by_trip/${tripId}`),

    getReportsByArrivalTo: (arrivalTo: string) =>
        api.get<ReportReqRes[]>(`/reports/by_arrivalto${arrivalTo}`),

    updateReport: (id: string, report: Partial<ReportReqRes>) =>
        api.put(`/reports/${id}`, report),

    updateReportByTripId: (tripId: string, report: Partial<ReportReqRes>) =>
        api.put(`/reports/by_trip/${tripId}`, report),
};