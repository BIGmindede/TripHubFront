import { AppState } from "app/providers/storeProvider/config/appReducer";

export const mediaIsLoadingSelector = (state: AppState) => state.mediaReducer.isLoading;
export const mediaSelector = (state: AppState) => state.mediaReducer.media;
export const mediaErrorSelector = (state: AppState) => state.mediaReducer.error;