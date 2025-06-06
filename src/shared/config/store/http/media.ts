import { api } from ".";
import { Media, MediaReqRes } from "../types/media";


export const mediaApi = {
  uploadFile: (file: File, metadata: Partial<MediaReqRes>) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    return api.post<Media>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getMediaByTrip: (tripId: string) => 
    api.get<MediaReqRes[]>(`/media/trip/${tripId}`),
};