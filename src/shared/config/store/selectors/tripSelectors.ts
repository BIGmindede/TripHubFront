import { AppState } from "app/providers/storeProvider/config/appReducer";

export const tripsListSelector = (state: AppState) => state.tripsListReducer.trips;
export const tripDetailsSelector = (state: AppState) => state.tripDetailsReducer.trip;
export const tripParticipationsSelector = (state: AppState) => state.tripDetailsReducer.participations;

export const tripStatisticsSelector = (state: AppState) => state.tripStatisticsReducer.statistics