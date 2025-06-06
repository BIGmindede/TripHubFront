import { AppState } from "app/providers/storeProvider/config/appReducer";

export const notificationsIsLoadingSelector = (state: AppState) => state.notificationsReducer.isLoading;
export const notificationsSelector = (state: AppState) => state.notificationsReducer.notifications;
export const notificationsErrorSelector = (state: AppState) => state.notificationsReducer.error;
