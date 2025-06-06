import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/AppLink'
import { navIcons } from 'shared/config/routeConfig/routeConfig'
import { Switchers } from 'features/Switchers'
import { Typography } from 'shared/UI/Typography/Typography'
import { Icon } from 'shared/UI/Icon/Icon'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface SidebarProps {
    className?: string,
    navLinks: Record<string, string>,
    state: boolean
}

export default ({ className, navLinks, state }: SidebarProps) => {

    const location = useLocation();
    const [currentPageKey, setCurrentPageKey] = useState(location.pathname.split('/')[1]);

    useEffect(() => {
        setCurrentPageKey(location.pathname.split('/')[1])
    }, [location.pathname]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: state }, [className])}
        >
            <ul>
                {
                    Object.keys(navLinks).map((key) =>
                        <li 
                            className={classNames(
                                cls.navItem,
                                {[cls.currentNavItem]: key.split('/')[1] === currentPageKey}
                            )} 
                            key={key}
                        >
                            <AppLink className={cls.link} theme={AppLinkTheme.PRIMARY} to={key}>
                                <div
                                    className={classNames(
                                        cls.linkIcon,
                                        {[cls.linkIconCurrent]: key.split('/')[1] === currentPageKey}
                                    )}
                                >
                                    <Icon Svg={navIcons[key]} size={20} />
                                </div>
                                <Typography className={cls.linkText} variant='span' size='s'>{navLinks[key]}</Typography>
                            </AppLink>
                        </li>
                    )
                }
                
            </ul>
            <Switchers />
        </div>
    )
}
