
import { BurgerMenu } from 'features/BurgerMenu'
import { Sidebar } from 'features/Sidebar'
import { navLinks } from 'shared/config/routeConfig/routeConfig'
import { useBreakpointDown } from 'shared/hooks/useBreakpoint';

interface NavigationProps {
    state: boolean,
    navigationStateSetter: () => void,
}

export const Navigation = ({ state, navigationStateSetter }: NavigationProps) => {
    const isMobileDown = useBreakpointDown('mobile');

    return (
        isMobileDown
            ? <BurgerMenu
                toggle={navigationStateSetter}
                navLinks={navLinks}
                state={state}
            />
            : <Sidebar
                navLinks={navLinks}
                state={state}  
            />
    )
}
