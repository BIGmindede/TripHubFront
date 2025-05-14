
import { BurgerMenu } from 'features/BurgerMenu'
import { Sidebar } from 'features/Sidebar'
import { useEffect, useState } from 'react'
import { navLinks } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { isMobile } from 'shared/lib/isMobile/isMobile'

interface NavigationProps {
    state: boolean,
    navigationStateSetter: () => void,
}

export const Navigation = ({ state, navigationStateSetter }: NavigationProps) => {

    const [mobileMode, setMobileMode] = useState(false)

    useEffect(() => {
        setMobileMode(isMobile())
    }, [])


    return (
        mobileMode
            ? <BurgerMenu
                navLinks={navLinks}
                state={state}
                navigationStateSetter={navigationStateSetter}
            />
            : <Sidebar
                navLinks={navLinks}
                state={state}  
            />
    )
}
