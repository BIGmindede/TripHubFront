import { AppDispatch } from "app/providers/storeProvider/config/store";
import { mediaActions } from "../reducers/mediaSlice";
import { mediaApi } from "../http/media";
import { Media } from "../types/media";

export const uploadMedia = (file: File, metadata: Partial<Media>) => 
  async (dispatch: AppDispatch) => {
    dispatch(mediaActions.setMediaLoading());
    try {
      const { data } = await mediaApi.uploadFile(
        file,
        {...metadata, geodata: JSON.stringify(metadata.geodata)}
      );
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
      dispatch(mediaActions.setMediaSuccess(data.map(meta =>({
        ...meta,
        geodata: JSON.parse(meta.geodata)
      }))));
    } catch (error) {
      dispatch(mediaActions.setMediaError(error.response?.data?.message || 'Failed to load media'));
      throw error;
    }
  };