import { classNames } from 'shared/lib/classNames/classNames'
import cls from './BurgerMenu.module.scss'
import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/AppLink'
import { navIcons } from 'shared/config/routeConfig/routeConfig'
import { Switchers } from 'features/Switchers'
import { Typography } from 'shared/UI/Typography/Typography'
import { Icon } from 'shared/UI/Icon/Icon'
import { useState } from 'react'

interface BurgerMenuProps {
    navLinks: Record<string, string>,
    state: boolean,
    navigationStateSetter: () => void,
}
export default ({ navLinks, state, navigationStateSetter }: BurgerMenuProps) => {
    const [currentPageKey, setCurrentPageKey] = useState(window.location.pathname.split('/')[1]);

    const handleChangeCurrentPageKey = () => {
        setCurrentPageKey(window.location.pathname.split('/')[1]);
        navigationStateSetter();
    }
    return (
        <div className={classNames(cls.burgermenu, {[cls.collapsed]: state})}>
            <div className={cls.menu} >
                <ul className={cls.links}>
                    {
                        Object.keys(navLinks)
                            .map((key) =>
                            <li
                                className={cls.navItem}
                                key={key}
                                onClick={handleChangeCurrentPageKey}
                            >
                                <AppLink className={cls.link} theme={AppLinkTheme.PRIMARY} to={key}>
                                    <div className={classNames(cls.linkIcon, {[cls.linkIconCurrent]: key.split('/')[1] === currentPageKey}, [])}>
                                        <Icon Svg={navIcons[key]} size={20} />
                                    </div>
                                    <Typography variant='span' size='l'>{navLinks[key]}</Typography>
                                </AppLink>
                            </li>
                        )
                    }
                </ul>
                <hr />
                <Switchers />
            </div>
        </div>
    );
}
