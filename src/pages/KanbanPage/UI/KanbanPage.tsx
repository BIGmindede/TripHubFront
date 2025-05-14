import { memo, useEffect } from 'react';
import { getCurrentTrip, getParticipationsByTripId } from 'shared/config/store/actionCreators/tripActions';
import { tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { KanbanBoard } from 'widgets/KanbanBoard';

const KanbanPage = memo(() => {
    const dispatch = useAppDispatch();

    const tripDetails = useAppSelector(tripDetailsSelector);

    useEffect(() => {
        dispatch(getCurrentTrip);
    }, []);

    useEffect(() => {
        if (tripDetails?.id) {
            dispatch(getParticipationsByTripId(tripDetails.id))
        }
    }, [tripDetails]);

    return (
        <section>
            <KanbanBoard tripId={tripDetails?.id}/>
        </section>
    );
}); 

export default KanbanPage;