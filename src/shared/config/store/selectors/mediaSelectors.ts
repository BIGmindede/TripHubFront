import { AppState } from "app/providers/storeProvider/config/appReducer";

export const selectTripMedia = (state: AppState) => state.mediaReducer.currentTripMedia;
