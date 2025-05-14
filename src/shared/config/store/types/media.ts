export interface MediaMetadata {
  id: string;
  authorId: string;
  mediaUrl: string;
  tripId: string;
  isOpenedForPublish: boolean;
  geodata: string;
  description: string;
  createdAt: string;
  contentType: string;
  fileSize: number;
}

export interface MediaState {
  currentTripMedia: MediaMetadata[];
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}