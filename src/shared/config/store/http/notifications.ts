import { api } from ".";
import { ExtendedNotificationDTO, Notification } from "../types/notificationSlice.types";

export const notificationsApi = {
    // Create and send a notification
    createAndSend: (notificationData: ExtendedNotificationDTO) =>
      api.post('/notifications', notificationData),
  
    // Send email notification
    sendEmail: (notificationData: ExtendedNotificationDTO) =>
      api.post('/notifications/email', notificationData),

    // Get notifications for a specific profile
    getByProfileId: (profileId: string) =>
      api.get<Notification[]>(`/notifications/by_profile/${profileId}`),

    // Handle notification buttons action
    handleNotificationAction: (url: string) =>
      api.put(url),

    // Mark notification as read
    markAsRead: (notificationId: string) =>
      api.put(`/notifications/${notificationId}`),
  
    // Delete notification
    delete: (notificationId: string) =>
      api.delete(`/notifications/${notificationId}`),
  }; 