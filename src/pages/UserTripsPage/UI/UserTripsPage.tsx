import { memo, useEffect } from 'react';
import cls from './UserTripsPage.module.scss';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getTripsByProfileId } from 'shared/config/store/actionCreators/tripActions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { currentTripSelector, tripsSelector } from 'shared/config/store/selectors/tripSelectors';
import { TripCard } from 'features/TripCard/UI/TripCard';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';

const UserTripsPage = memo(() => {
    const dispatch = useAppDispatch();

    const userTrips = useAppSelector(tripsSelector);
    const currentTrip = useAppSelector(currentTripSelector);

    useEffect(() => {
        dispatch(getTripsByProfileId());
    }, []);

    return (
        <>
            <section>
                <WidgetWrapper heading='Ваши поездки'>
                    {null}
                    {/* TODO Сделать поиск по поездкам */}
                </WidgetWrapper>
            </section>
            <section className={cls.userTripsSection}>
                {userTrips && userTrips.map(trip =>
                    <TripCard tripData={trip} isCurrent={currentTrip?.id === trip.id}/>
                ).reverse()}
            </section>
        </>
    );
});

export default UserTripsPage;
