export enum NotificationStatuses {
    NEW = 'NEW',
    READ = 'READ'
}
  
export enum NotificationTypes {
    TRIP_KANBAN_UPDATE = 'TRIP_KANBAN_UPDATE',
    TRIP_INVITATION = 'TRIP_INVITATION'
}
  
export enum HtmlButtonsTypes {
    ACCEPT = 'ACCEPT',
    DECLINE = 'DECLINE'
}
  
export interface Notification {
    id: string;
    profileId: string;
    senderTag?: string;
    sentAt: string;
    content: string;
    status: NotificationStatuses;
    notificationType: NotificationTypes;
    actions: string;
}

export interface HtmlTemplateAction {
    text: string;
    url: string;
    type: HtmlButtonsTypes;
}

export interface HtmlTemplateDTO {
    title: string;
    text: string;
    actions: string;
}

export interface ExtendedNotificationDTO {
    notification: Notification;
    email: string;
    htmlTemplateDTO: HtmlTemplateDTO;
}