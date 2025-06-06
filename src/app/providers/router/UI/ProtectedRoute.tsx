import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authIsLoadingSelector, isAuthenticatedSelector } from 'shared/config/store/selectors/authSelectors';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { currentTripIsLoadingSelector, currentTripSelector } from 'shared/config/store/selectors/tripSelectors';
import { getCurrentProfile } from 'shared/config/store/actionCreators/profileActions';
import { getCurrentTrip } from 'shared/config/store/actionCreators/tripActions';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

interface ProtectedRouteProps {
    children: React.ReactNode;
    path: string;
    authOnly: boolean;
}

export const ProtectedRoute = ({ children, path, authOnly }: ProtectedRouteProps) => {
    const dispatch = useAppDispatch();

    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const currentTrip = useAppSelector(currentTripSelector);

    const [userHasRights, setUserHasRights] = useState(true);
    
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getCurrentProfile());
            dispatch(getCurrentTrip());
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!currentTrip && (path === "/current" || path === "/kanban")) {
            setUserHasRights(false);
        }
    }, [currentTrip]);

    if (authOnly && !isAuthenticated) {
        return <Navigate to={RoutePath.main} />;
    }

    if (!userHasRights) {
        return <Navigate to={RoutePath.notfound} />;
    }

    return <>{children}</>;
}; 