import { AppDispatch } from "app/providers/storeProvider/config/store";
import { ExtendedNotificationDTO, Notification } from "shared/config/store/types/notificationSlice.types";
import { notificationsActions } from "../reducers/notificationsSlice";
import { notificationsApi } from "shared/config/store/http/notifications";

export const fetchNotificationsByProfile = (profileId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(notificationsActions.setNotificationsLoading());
        try {
            const response = await notificationsApi.getByProfileId(profileId);
            const notifications: Notification[] = response.data;
            dispatch(notificationsActions.setNotificationsSuccess(notifications));
        } catch (error) {
            dispatch(notificationsActions.setNotificationsError(
                error.response?.data?.message || 'Failed to fetch notifications'
            ));
        }
    };

export const markNotificationAsRead = (notificationId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(notificationsActions.setNotificationsLoading());
        try {
            await notificationsApi.markAsRead(notificationId);
            dispatch(notificationsActions.markNotificationAsRead(notificationId));
        } catch (error) {
            dispatch(notificationsActions.setNotificationsError(
                error.response?.data?.message || 'Failed to mark notification as read'
            ));
        }
    };

export const handleNotificationAction = (url: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(notificationsActions.setNotificationsLoading());
        try {
            await notificationsApi.handleNotificationAction(url);
        } catch (error) {
            dispatch(notificationsActions.setNotificationsError(
                error.response?.data?.message || 'Failed to handle notification buttons action'
            ));
        }
    };

export const deleteNotification = (notificationId: string) => 
    async (dispatch: AppDispatch) => {
        dispatch(notificationsActions.setNotificationsLoading());
        try {
            await notificationsApi.delete(notificationId);
            dispatch(notificationsActions.deleteNotification(notificationId));
        } catch (error) {
            dispatch(notificationsActions.setNotificationsError(
                error.response?.data?.message || 'Failed to delete notification'
            ));
        }
    };
