import { AppDispatch } from "app/providers/storeProvider/config/store";
import { tripApi } from "shared/config/store/http/trips";
import { tripsActions } from "../reducers/tripsSlice";
import { currentTripActions } from "../reducers/currentTripSlice";
import { Trip, TripAndParticipationsDTO, Participation, ParticipationAndNotificationInfo } from "../types/tripSlice.types";
import { tripStatisticsActions } from "../reducers/tripStatisticsSlice";
import { tripDetailsActions } from "../reducers/tripDetailsSlice";

export const getTripsByProfileId = () => 
    async (dispatch: AppDispatch) => {
        dispatch(tripsActions.setTripsLoading());
        try {
            const response = await tripApi.getTripsByProfileId();
            dispatch(tripsActions.setTripsSuccess(response.data));
        } catch (error) {
            dispatch(tripsActions.setTripsError(
                error.response?.data?.message || 'Failed to fetch'
            ));
        }
    };

export const getTripsByDestination = (destination: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripsActions.setTripsLoading());
        try {
            const response = await tripApi.getTripsByDestination(destination);
            dispatch(tripsActions.setTripsSuccess(response.data));
        } catch (error) {
            dispatch(tripsActions.setTripsError(
                error.response?.data?.message || 'Failed to fetch'
            ));
        }
    };

export const getTrips = (destination: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(tripsActions.setTripsLoading());
        try {
            const response = await tripApi.getTripsByDestination(destination);
            dispatch(tripsActions.setTripsSuccess(response.data));
        } catch (error) {
            dispatch(tripsActions.setTripsError(
                error.response?.data?.message || 'Failed to fetch'
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
                error.response?.data?.message || 'Failed to fetch'
            ));
        }
    };


export const createCurrentTrip = (tripData: TripAndParticipationsDTO) => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            const tripCreateResponse = await tripApi.createTrip(tripData);
            const tripParticipationsResponse = await tripApi.getParticipationsByTripId(tripCreateResponse.data.id);
            dispatch(currentTripActions.setCurrentTripSuccess(tripCreateResponse.data));
            dispatch(currentTripActions.setCurrentTripParticipationsSuccess(tripParticipationsResponse.data));
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to create'
            ));
        }
    };

export const getCurrentTrip = () => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            const response = await tripApi.getCurrentTrip();
            dispatch(currentTripActions.setCurrentTripSuccess(response.data));
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to fetch'
            ));
        }
    };

export const updateCurrentTrip = (tripData: Trip) => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            const response = await tripApi.updateTrip(tripData);
            dispatch(currentTripActions.setCurrentTripSuccess(response.data));
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to update'
            ));
        }
    };

export const createCurrentTripParticipations = (tripId: string, participationData: ParticipationAndNotificationInfo) => 
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

export const getCurrentTripParticipations = (tripId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            const response = await tripApi.getParticipationsByTripId(tripId);
            dispatch(currentTripActions.setCurrentTripParticipationsSuccess(response.data));
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to get participations'
            ));
        }
    };

export const setCurrentTripOver = (participationsIds: string[]) => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            await tripApi.setParticipationsOver(participationsIds);
            dispatch(currentTripActions.clearCurrentTrip());
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to update trip'
            ));
        }
    };


export const deleteParticipations = (participationId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            await tripApi.deleteParticipations(participationId);
            dispatch(currentTripActions.deleteCurrentTripParticipationSuccess(participationId));
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to delete participations'
            ));
        }
    };

export const leaveTrip = (participationId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(currentTripActions.setCurrentTripLoading());
        try {
            await tripApi.deleteParticipations(participationId);
            dispatch(currentTripActions.clearCurrentTrip());
        } catch (error) {
            dispatch(currentTripActions.setCurrentTripError(
                error.response?.data?.message || 'Failed to leave trip'
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
                error.response?.data?.message || 'Failed to fetch'
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

