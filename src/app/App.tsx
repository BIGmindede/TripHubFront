import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Header } from 'widgets/Header'
import { Suspense, useEffect, useState } from 'react'
import { useTheme } from './providers/themeProvider'
import { AppRouter } from './providers/router'
import { Navigation } from 'widgets/Navigation/UI/Navigation'
import { isMobile } from 'shared/lib/isMobile/isMobile'
import { refreshAuth } from 'shared/config/store/actionCreators/authActions'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { ModalProvider } from 'shared/config/ModalContext/ModalContext'
import { selectAuthIsLoading } from 'shared/config/store/selectors/authSelectors'
import { useSelector } from 'react-redux'

export const App = () => {
    const { theme } = useTheme()

    const dispatch = useAppDispatch();

    const [navigationCollapsed, setNavigationCollapsed] = useState(true)

    const handleNavigationToggle = () => {
        setNavigationCollapsed((state) => !state)
    }

    const isAuthLoading = useSelector(selectAuthIsLoading);

    useEffect(() => {
        dispatch(refreshAuth());
    }, [])

    return (
        <ModalProvider>
            <div className={classNames('app', {}, [theme])}>
                <Suspense fallback="">
                    <Header isMobile={isMobile()} navigationStateSetter={handleNavigationToggle} />
                    <div className="content-page">
                        <Navigation state={navigationCollapsed} navigationStateSetter={handleNavigationToggle}/>
                        {!isAuthLoading && <AppRouter />}
                    </div>
                </Suspense>
            </div>
        </ModalProvider>
    )
}
