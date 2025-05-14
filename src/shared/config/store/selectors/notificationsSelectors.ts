import { AppState } from "app/providers/storeProvider/config/appReducer";

export const selectNotifications = (state: AppState) => state.notificationsReducer.notifications;
