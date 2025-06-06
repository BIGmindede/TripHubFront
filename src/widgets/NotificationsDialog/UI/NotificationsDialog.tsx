import { Dialog } from 'features/Dialog';
import { Typography } from 'shared/UI/Typography/Typography';
import cls from './NotificationsDialog.module.scss';
import TrashIcon from 'shared/assets/IonTrash.svg';
import AcceptIcon from 'shared/assets/IonCheck.svg';
import DeclineIcon from 'shared/assets/IonCrest.svg';
import ViewIcon from 'shared/assets/IonView.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { deleteNotification, fetchNotificationsByProfile, handleNotificationAction, markNotificationAsRead } from 'shared/config/store/actionCreators/notificationsAction';
import { HtmlButtonsTypes, HtmlTemplateAction, Notification, NotificationStatuses, NotificationTypes } from 'shared/config/store/types/notificationSlice.types';
import { useEffect } from 'react';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { currentProfileSelector } from 'shared/config/store/selectors/profileSelectors';
import { notificationsSelector } from 'shared/config/store/selectors/notificationsSelectors';

interface NotificationsDialogProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

export const NotificationsDialog = (props: NotificationsDialogProps) => {
    const {
        className,
        isOpen,
        onClose,
        anchorEl
    } = props;
    
    const currentProfile = useAppSelector(currentProfileSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(notificationsSelector);

    const handleDeleteNotification = (notificationId: string) => {
        dispatch(deleteNotification(notificationId));
    };

    const handleNotificationClick = (notificationId: string) => {
        dispatch(markNotificationAsRead(notificationId));
    };

    const handleNotificationButtonsAction = (notificationId: string, url?: string) => {
        if (url) {
            dispatch(handleNotificationAction(url));
        }
        else {
            navigate(RoutePath[AppRoutes.KANBAN]);
        }
        dispatch(markNotificationAsRead(notificationId));
        onClose();
    };

    const getNotificationActions = (notification: Notification) => {
        const getActionIcon = (action: HtmlButtonsTypes) => {
            if (notification.notificationType === NotificationTypes.TRIP_INVITATION) {
                if (action === HtmlButtonsTypes.ACCEPT) {
                    return AcceptIcon;
                }
                else {
                    return DeclineIcon;
                }
            }
            else {
                return ViewIcon;
            }
        }

        const getButtonHandler = (action: HtmlTemplateAction) => {
            if (notification.notificationType === NotificationTypes.TRIP_INVITATION) {
                return () => handleNotificationButtonsAction(notification.id, action.url);
            }
            else {
                return () => handleNotificationButtonsAction(notification.id);
            }
        }
        return (<>
            {JSON.parse(notification.actions).map((action: HtmlTemplateAction) => (
                <Button
                    className={cls.notificationActionsButton}
                    key={action.type}
                    theme={ButtonTheme.ROUND}
                    icon={<Icon Svg={getActionIcon(action.type)}
                    size={20} />}
                    onClick={getButtonHandler(action)} />
            ))}
            <Button
                className={cls.notificationActionsButton}
                theme={ButtonTheme.ROUND}
                icon={<Icon Svg={TrashIcon} size={20} />}
                onClick={() => handleDeleteNotification(notification.id)}
            />
        </>);
    };

    useEffect(() => {
        if (currentProfile?.id) {
            dispatch(fetchNotificationsByProfile(currentProfile?.id));
        }
    }, [currentProfile]);

    return (
        <Dialog
            className={classNames(cls.notificationsDialog, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
            title="Уведомления"
        >
            <div className={cls.notificationsList}>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            onClick={() => handleNotificationClick(notification.id)}
                            key={notification.id}
                            className={classNames(cls.notification, {[cls.notificationIsRead]: notification.status === NotificationStatuses.READ})}
                        >
                            {notification.status === NotificationStatuses.NEW && <div className={cls.notificationIsReadMark} />}
                            <div className={cls.notificationHeader}>
                                <Typography variant="heading" size="s" className={cls.notificationTitle}>
                                    {notification.senderTag || 'System'}
                                </Typography>
                                <Typography variant="span" size="s" className={cls.timestamp}>
                                    {new Date(notification.sentAt).toLocaleDateString()}
                                </Typography>
                            </div>
                            <Typography variant="paragraph" size="s">
                                {notification.content}
                            </Typography>
                            <div className={cls.notificationActions}>
                                {getNotificationActions(notification)}
                            </div>
                        </div>
                    ))
                ) : (
                    <Typography variant="span" size="m" className={cls.emptyMessage}>
                        Нет новых уведомлений
                    </Typography>
                )}
            </div>
        </Dialog>
    );
}; 