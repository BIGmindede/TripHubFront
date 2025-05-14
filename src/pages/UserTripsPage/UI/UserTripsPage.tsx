import { memo, useEffect } from 'react';
import cls from './UserTripsPage.module.scss';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getCurrentTrip, getTripsByProfileId } from 'shared/config/store/actionCreators/tripActions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { tripDetailsSelector, tripsListSelector } from 'shared/config/store/selectors/tripSelectors';
import { TripCard } from 'features/TripCard/UI/TripCard';

const UserTripsPage = memo(() => {
    const dispatch = useAppDispatch();

    const userTrips = useAppSelector(tripsListSelector);
    const currentTrip = useAppSelector(tripDetailsSelector);

    useEffect(() => {
        dispatch(getCurrentTrip);
        dispatch(getTripsByProfileId());
    }, []);
    
    return (
        <>
            <section className={cls.userTripsSection}>
                {userTrips && userTrips.map(trip =>
                    <TripCard tripData={trip} isCurrent={currentTrip?.id === trip.id}/>
                )}
            </section>
        </>
    );
});

export default UserTripsPage;
