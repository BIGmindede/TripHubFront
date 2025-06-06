import { AppState } from "app/providers/storeProvider/config/appReducer";

export const currentTripIsLoadingSelector = (state: AppState) => state.currentTripReducer.isLoading;
export const currentTripSelector = (state: AppState) => state.currentTripReducer.currentTrip;
export const currentTripErrorSelector = (state: AppState) => state.currentTripReducer.error;

export const currentTripParticipationsSelector = (state: AppState) => state.currentTripReducer.participations;

export const tripsIsLoadingSelector = (state: AppState) => state.tripsReducer.isLoading;
export const tripsSelector = (state: AppState) => state.tripsReducer.trips;
export const tripsErrorSelector = (state: AppState) => state.tripsReducer.error;

export const tripDetailsIsLoadingSelector = (state: AppState) => state.tripDetailsReducer.isLoading;
export const tripDetailsSelector = (state: AppState) => state.tripDetailsReducer.trip;
export const tripDetailsErrorSelector = (state: AppState) => state.tripDetailsReducer.error;

export const tripParticipationsSelector = (state: AppState) => state.tripDetailsReducer.participations;


export const participationsSelector = (state: AppState) => state.tripDetailsReducer.participations;

export const tripStatisticsSelector = (state: AppState) => state.tripStatisticsReducer.statistics;
