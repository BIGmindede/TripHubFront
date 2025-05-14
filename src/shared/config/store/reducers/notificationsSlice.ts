import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationStatuses, HtmlButtonsTypes, NotificationTypes } from '../types/notificationSlice.types';

// export const notificationsMock: Notification[] = [
//     {
//         id: '1',
//         profileId: 'user1',
//         senderTag: 'system',
//         sentAt: '2021-01-01T00:00:00Z',
//         content: 'New trip invitation',
//         status: NotificationStatuses.NEW,
//         notificationType: NotificationTypes.TRIP_INVITATION,
//         actions: [
//             {
//                 text: 'Accept',
//                 url: '/accept',
//                 type: HtmlButtonsTypes.ACCEPT,
//             },
//             {
//                 text: 'Decline',
//                 url: '/decline',
//                 type: HtmlButtonsTypes.DECLINE,
//             }
//         ]
//     },
//     {
//         id: '2',
//         profileId: 'user1',
//         senderTag: 'user2',
//         sentAt: '2021-01-02T00:00:00Z',
//         content: 'Trip status updated',
//         status: NotificationStatuses.READ,
//         notificationType: NotificationTypes.TRIP_KANBAN_UPDATE,
//         actions: [
//             {
//                 text: 'View',
//                 url: '/view',
//                 type: HtmlButtonsTypes.ACCEPT,
//             }
//         ]
//     },
//     {
//         id: '3',
//         profileId: 'user1',
//         senderTag: 'user3',
//         sentAt: '2021-01-03T00:00:00Z',
//         content: 'New trip invitation with custom message',
//         status: NotificationStatuses.NEW,
//         notificationType: NotificationTypes.TRIP_INVITATION,
//         actions: [
//             {
//                 text: 'Accept',
//                 url: '/accept',
//                 type: HtmlButtonsTypes.ACCEPT,
//             },
//             {
//                 text: 'Decline',
//                 url: '/decline',
//                 type: HtmlButtonsTypes.DECLINE,
//             }
//         ]
//     }
// ];

interface NotificationsState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

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
    setNotificationsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.isLoading = false;
      state.error = null;
      state.notifications = action.payload;
    },
    markNotificationAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.status = NotificationStatuses.READ;
      }
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
      state.error = null;
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
