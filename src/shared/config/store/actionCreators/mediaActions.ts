import { AppDispatch } from "app/providers/storeProvider/config/store";
import { mediaActions } from "../reducers/mediaSlice";
import { mediaApi } from "../http/media";
import { MediaMetadata } from "../types/media";

export const uploadMedia = (file: File, metadata: Partial<MediaMetadata>) => 
  async (dispatch: AppDispatch) => {
    dispatch(mediaActions.setMediaLoading());
    try {
      const { data } = await mediaApi.uploadFile(file, metadata);
      dispatch(mediaActions.setUploadMediaSuccess(data));
    } catch (error) {
      dispatch(mediaActions.setMediaError(error.response?.data?.message || 'Upload failed'));
      throw error;
    }
  };

export const getMediaByTripId = (tripId: string) => 
  async (dispatch: AppDispatch) => {
    dispatch(mediaActions.setMediaLoading());
    try {
      const { data } = await mediaApi.getMediaByTrip(tripId);
      dispatch(mediaActions.setMediaSuccess(data));
    } catch (error) {
      dispatch(mediaActions.setMediaError(error.response?.data?.message || 'Failed to load media'));
      throw error;
    }
  };