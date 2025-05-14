import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Skeleton } from 'shared/UI/Skeleton/Skeleton'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { ProtectedRoute } from './ProtectedRoute'

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
                                        {authOnly ? (
                                            <ProtectedRoute>
                                                {element}
                                            </ProtectedRoute>
                                        ) : element}
                                    </div>
                                </main>
                            </Suspense>
                        }
                    />
                ))
            }
        </Routes>
    )
}

export default AppRouter
