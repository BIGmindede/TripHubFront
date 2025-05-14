import { api } from ".";
import { MediaMetadata } from "../types/media";


export const mediaApi = {
  uploadFile: (file: File, metadata: Partial<MediaMetadata>) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    return api.post<MediaMetadata>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getMediaByTrip: (tripId: string) => 
    api.get<MediaMetadata[]>(`/media/trip/${tripId}`),
};