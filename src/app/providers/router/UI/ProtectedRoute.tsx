import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'shared/config/store/selectors/authSelectors';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={RoutePath.main} replace />;
    }

    return <>{children}</>;
}; 