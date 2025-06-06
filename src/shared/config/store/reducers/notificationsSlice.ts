import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationsState, NotificationStatuses } from '../types/notificationSlice.types';

const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setNotificationsSuccess(state, action: PayloadAction<Notification[]>) {
      state.isLoading = false;
      state.error = null;
      state.notifications = action.payload;
    },
    setNotificationsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    markNotificationAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.status = NotificationStatuses.READ;
      }
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
