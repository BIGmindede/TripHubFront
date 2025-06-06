import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Header } from 'widgets/Header'
import { Suspense, useEffect, useState } from 'react'
import { useTheme } from './providers/themeProvider'
import { AppRouter } from './providers/router'
import { Navigation } from 'widgets/Navigation/UI/Navigation'
import { refreshAuth } from 'shared/config/store/actionCreators/authActions'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ModalProvider } from 'shared/config/ModalContext/ModalContext'
import { authIsLoadingSelector, isAuthenticatedSelector } from 'shared/config/store/selectors/authSelectors'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { getCurrentTrip } from 'shared/config/store/actionCreators/tripActions'
import { getCurrentProfile } from 'shared/config/store/actionCreators/profileActions'

export const App = () => {
    const { theme } = useTheme()
    const dispatch = useAppDispatch();

    const [navigationCollapsed, setNavigationCollapsed] = useState(true)
    
    const isAuthenticated = useAppSelector(isAuthenticatedSelector);
    const isAuthLoading = useAppSelector(authIsLoadingSelector);

    const handleNavigationToggle = () => {
        setNavigationCollapsed((state) => !state)
    }

    useEffect(() => {
        dispatch(refreshAuth());
    }, [])

    useEffect(() => {
        if (isAuthenticated && !isAuthLoading) {
            dispatch(getCurrentTrip());
            dispatch(getCurrentProfile());
        }
    }, [isAuthLoading, isAuthenticated])

    return !isAuthLoading && (
        <ModalProvider>
            <div className={classNames('app', {}, [theme])}>
                <Suspense fallback="">
                    <Header navigationStateSetter={handleNavigationToggle} />
                    <div className="content-page">
                        <Navigation state={navigationCollapsed} navigationStateSetter={handleNavigationToggle}/>
                        {!isAuthLoading &&
                            <AppRouter />
                        }
                    </div>
                </Suspense>
            </div>
        </ModalProvider>
    )
}
