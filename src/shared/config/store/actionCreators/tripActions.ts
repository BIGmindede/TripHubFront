import { AppDispatch } from "app/providers/storeProvider/config/store";
import { tripApi } from "shared/config/store/http/trips";
import { tripsListActions } from "../reducers/tripsListSlice";
import { tripDetailsActions } from "../reducers/tripDetailsSlice";
import { Trip, TripAndParticipationsDTO, Participation, ParticipationAndNotificationInfo } from "../types/tripSlice.types";
import { tripStatisticsActions } from "../reducers/tripStatisticsSlice";

// Actions for trips list page
export const getTripsByProfileId = () => 
    async (dispatch: AppDispatch) => {
        dispatch(tripsListActions.setTripsListLoading());
        try {
            const response = await tripApi.getTripsByProfileId();
            dispatch(tripsListActions.setTripsListSuccess(response.data));
        } catch (error) {
            dispatch(tripsListActions.setTripsListError(
                error.response?.data?.message || 'Failed to get trips'
            ));
        }
    };

export const getTripsByDestination = (destination: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripsListActions.setTripsListLoading());
        try {
            const response = await tripApi.getTripsByDestination(destination);
            dispatch(tripsListActions.setTripsListSuccess(response.data));
        } catch (error) {
            dispatch(tripsListActions.setTripsListError(
                error.response?.data?.message || 'Failed to get trips'
            ));
        }
    };

// Actions for trip details page
export const createTrip = (tripData: TripAndParticipationsDTO) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            const tripCreateResponse = await tripApi.createTrip(tripData);
            const tripParticipationsResponse = await tripApi.getParticipationsByTripId(tripCreateResponse.data.id);
            dispatch(tripDetailsActions.setTripDetailsSuccess(tripCreateResponse.data));
            dispatch(tripDetailsActions.setParticipationsSuccess(tripParticipationsResponse.data));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to create trip'
            ));
        }
    };

export const getTripStatistics = () => 
    async (dispatch: AppDispatch) => {
        dispatch(tripStatisticsActions.setTripStatisticsLoading());
        try {
            const response = await tripApi.getTripsStatisticsByProfileId();
            dispatch(tripStatisticsActions.setTripStatisticsSuccess(response.data));
        } catch (error) {
            dispatch(tripStatisticsActions.setTripStatisticsError(
                error.response?.data?.message || 'Failed to fetch current trip'
            ));
        }
    };

export const getCurrentTrip = () => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            const response = await tripApi.getCurrentTrip();
            dispatch(tripDetailsActions.setTripDetailsSuccess(response.data));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to fetch current trip'
            ));
        }
    };

export const getTripById = (id: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            const response = await tripApi.getTripById(id);
            dispatch(tripDetailsActions.setTripDetailsSuccess(response.data));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to get trip'
            ));
        }
    };

export const updateTrip = (tripData: Trip) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            const response = await tripApi.updateTrip(tripData);
            dispatch(tripDetailsActions.setTripDetailsSuccess(response.data));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to update trip'
            ));
        }
    };

export const setTripOver = (participationsIds: string[]) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            await tripApi.setParticipationsOver(participationsIds);
            dispatch(tripDetailsActions.setParticipationsOver());
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to update trip'
            ));
        }
    };

export const deleteTrip = (id: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            await tripApi.deleteTrip(id);
            dispatch(tripDetailsActions.clearTripDetails());
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to delete trip'
            ));
        }
    };

// Actions for participations
export const createParticipations = (tripId: string, participationData: ParticipationAndNotificationInfo) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            await tripApi.createParticipations(tripId, participationData)
            dispatch(getParticipationsByTripId(tripId));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to create participations'
            ));
        }
    };

export const getParticipationsByTripId = (tripId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            const response = await tripApi.getParticipationsByTripId(tripId);
            dispatch(tripDetailsActions.setParticipationsSuccess(response.data));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to get participations'
            ));
        }
    };

export const acceptParticipation = (tripId: string) => 
    async () => {
        try {
            await tripApi.acceptParticipation(tripId)
        } catch (error) {
            console.error(error.response?.data?.message || 'Failed to accept participation');
        }
    };

export const declineParticipation = (tripId: string) => 
    async () => {
        try {
            await tripApi.declineParticipation(tripId);
        } catch (error) {
            console.error(error.response?.data?.message || 'Failed to decline participation');
        }
    };

export const deleteParticipations = (participationId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            await tripApi.deleteParticipations(participationId);
            dispatch(tripDetailsActions.deleteParticipationSuccess(participationId));
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to delete participations'
            ));
        }
    }; 

export const leaveTrip = (participationId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripDetailsActions.setTripDetailsLoading());
        try {
            await tripApi.deleteParticipations(participationId);
            dispatch(tripDetailsActions.clearTripDetails());
        } catch (error) {
            dispatch(tripDetailsActions.setTripDetailsError(
                error.response?.data?.message || 'Failed to leave trip'
            ));
        }
    };
