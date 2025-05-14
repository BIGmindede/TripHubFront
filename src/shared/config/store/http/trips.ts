import { api } from 'shared/config/store/http';
import { Participation, ParticipationAndNotificationInfo, Trip, TripStatistics } from '../types/tripSlice.types';
import { TripAndParticipationsDTO } from '../types/tripSlice.types';

export const tripApi = {
  createTrip: (tripData: TripAndParticipationsDTO) =>
    api.post<Trip>('/trips', tripData),

  getTripById: (id: string) =>
    api.get<Trip>(`/trips/${id}`),

  getCurrentTrip: () =>
    api.get<Trip>('/trips/current'),

  getTripsByProfileId: () =>
    api.get<Trip[]>(`/trips/by_profile`),

  getTripsStatisticsByProfileId: () =>
    api.get<TripStatistics>(`/trips/statistics`),

  getTripsByDestination: (destination: string) =>
    api.get<Trip[]>(`/trips/by_destination/${destination}`),

  updateTrip: (tripData: Trip) =>
    api.put<Trip>(`/trips/${tripData.id}`, tripData),

  deleteTrip: (id: string) =>
    api.delete(`/trips/${id}`),

  createParticipations: (tripId: string, participationData: ParticipationAndNotificationInfo) =>
    api.post(`/trips/${tripId}/participations`, participationData),

  getParticipationsByTripId: (tripId: string) =>
    api.get<Participation[]>(`/trips/${tripId}/participations`),

  setParticipationsOver: (participationsIds: string[]) => 
    api.put(`/trips/participations/setover`, participationsIds),

  acceptParticipation: (participationId: string) =>
    api.put(`/trips/participations/${participationId}/accept`),

  declineParticipation: (participationId: string) =>
    api.put(`/trips/participations/${participationId}/decline`),

  deleteParticipations: (participationId: string) =>
    api.delete(`/trips/participations/${participationId}`),
};