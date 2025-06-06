import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Skeleton } from 'shared/UI/Skeleton/Skeleton'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { ProtectedRoute } from './ProtectedRoute'
import { NotFoundPage } from 'pages/NotFoundPage'

const AppRouter = () => {

    return (
        <Routes>
            {
                routeConfig.map(({ path, element, authOnly }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense fallback={ <Skeleton /> }>
                                <main className='page-wrapper'>
                                    <div className='page-content-wrapper'>
                                        <ProtectedRoute path={path} authOnly={authOnly}>
                                            {element}
                                        </ProtectedRoute>
                                    </div>
                                </main>
                            </Suspense>
                        }
                    />
                ))
            }
            <Route
                path={"*"}
                element={
                    <main className='page-wrapper'>
                        <div className='page-content-wrapper'>
                            <NotFoundPage />
                        </div>
                    </main>
                }
            />
        </Routes>
    )
}

export default AppRouter
