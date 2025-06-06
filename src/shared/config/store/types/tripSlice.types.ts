import { ReportReqRes } from "./reportSlice.types";

export interface Trip {
  id?: string;
  statusId?: number;
  statuses?: string[];
  authorId?: string;
  destination: string;
  startDate?: string;
  thumbnailUrl?: string;
  endDate?: string;
}

export enum ParticipationStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED'
}

export interface Participation {
  id: string;
  tripId: string;
  profileId: string;
  status: ParticipationStatus;
  isCurrent: boolean;
  // Add other participation properties as needed
}

export interface ParticipationAndNotificationInfo {
  participations: Array<{ participantId: string, email: string }>;
  authorTag: string;
  // Add other notification info properties as needed
}

export interface TripAndParticipationsDTO {
  report?: Partial<ReportReqRes>,
  trip: Trip;
  participationAndNotificationInfo: ParticipationAndNotificationInfo;
}

export interface CurrentTripState {
  currentTrip: Trip | null;
  participations: Participation[];
  isLoading: boolean;
  error: string | null;
}

export interface TripDetailsState {
  trip: Trip | null;
  participations: Participation[];
  isLoading: boolean;
  error: string | null;
}

export interface TripsState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
}

export interface TripStatistics {
    totalTrips: number;
    uniqueDestinations: number;
    longestTrip: Trip;
    totalDaysInTrips: number;
    lastTrip: Trip;
}

export interface TripStatisticsState {
  statistics: TripStatistics;
  isLoading: boolean;
  error: string | null;
}