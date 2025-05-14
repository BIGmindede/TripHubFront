import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Header.module.scss'
import AccountIcon from 'shared/assets/IonPerson.svg'
import LoginIcon from 'shared/assets/IonLogin.svg'
import NotificationIcon from 'shared/assets/IonNotification.svg'
import MenuToggler from 'shared/assets/IonMenu.svg'
import { Button, ButtonTheme } from 'shared/UI/Button/Button'
import { AppLink } from 'shared/UI/AppLink/AppLink'
import { Typography } from 'shared/UI/Typography/Typography'
import { useRef, useState } from 'react'
import { Icon } from 'shared/UI/Icon/Icon'
import { AuthDialog } from 'widgets/AuthDialog'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { selectIsAuthenticated } from 'shared/config/store/selectors/authSelectors'
import { NotificationsDialog } from 'widgets/NotificationsDialog'
import { ProfileDialog } from 'widgets/ProfileDialog/UI/ProfileDialog'

interface HeaderProps {
    navigationStateSetter: () => void,
    isMobile: boolean
}

export const Header = ({ isMobile, navigationStateSetter }: HeaderProps) => {

    const notificationsDialogAnchorRef = useRef<HTMLButtonElement>(null);
    const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false);
    
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const authDialogAnchorRef = useRef<HTMLButtonElement>(null);

    const profileDialogAnchorRef = useRef<HTMLButtonElement>(null);
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

    const isAuth = useAppSelector(selectIsAuthenticated);

    return (
        <header className={classNames(cls.header, {[cls.mobile]: isMobile})}>
            <div className={cls.navs}>
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={cls.icon}
                    onClick={navigationStateSetter}
                    data-testid="sidebar-toggler"
                    icon={<Icon Svg={MenuToggler} size={40}/>}
                />
                <AppLink to="/">
                    <Typography variant='heading' size='l'>TripHub</Typography>
                </AppLink>
            </div>
            <div className={cls.authbtns}>
                {isAuth
                    ? <>
                        <Button
                            ref={notificationsDialogAnchorRef}
                            theme={ButtonTheme.ROUND}
                            icon={<Icon Svg={NotificationIcon} size={20}/>}
                            onClick={() => setIsNotificationsDialogOpen(state => !state)}
                        />
                        <NotificationsDialog
                            isOpen={isNotificationsDialogOpen}
                            onClose={() => setIsNotificationsDialogOpen(false)}
                            anchorEl={notificationsDialogAnchorRef.current}
                        />
                        <Button
                            ref={profileDialogAnchorRef}
                            theme={ButtonTheme.ROUND}
                            icon={<Icon Svg={AccountIcon} size={20}/>}
                            onClick={() => setIsProfileDialogOpen(state => !state)}
                        />
                        <ProfileDialog
                            isOpen={isProfileDialogOpen}
                            onClose={() => setIsProfileDialogOpen(false)}
                            anchorEl={profileDialogAnchorRef.current}
                        />
                    </>
                    : <>
                        <Button
                            ref={authDialogAnchorRef}
                            theme={ButtonTheme.ROUND}
                            icon={<Icon Svg={LoginIcon} size={20}/>}
                            onClick={() => setIsAuthDialogOpen(state => !state)}
                        />
                        {isAuthDialogOpen && 
                            <AuthDialog
                                isOpen={isAuthDialogOpen}
                                onClose={() => setIsAuthDialogOpen(false)}
                                anchorEl={authDialogAnchorRef.current}
                            />
                        }
                    </>
                }
            </div>
        </header>
    )
}
