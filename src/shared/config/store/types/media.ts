export interface MediaGeodata {
    lat: number;
    lon: number;
}

export interface MediaReqRes {
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

export interface Media {
  id: string;
  authorId: string;
  mediaUrl: string;
  tripId: string;
  isOpenedForPublish: boolean;
  geodata: MediaGeodata;
  description: string;
  createdAt: string;
  contentType: string;
  fileSize: number;
}

export interface MediaState {
  media: Media[];
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}