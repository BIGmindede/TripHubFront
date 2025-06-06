import { memo, useEffect } from 'react';
import { getCurrentTrip, getParticipationsByTripId } from 'shared/config/store/actionCreators/tripActions';
import { currentTripSelector } from 'shared/config/store/selectors/tripSelectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { KanbanBoard } from 'widgets/KanbanBoard';

const KanbanPage = memo(() => {
    const dispatch = useAppDispatch();

    const currentTrip = useAppSelector(currentTripSelector);

    useEffect(() => {
        dispatch(getCurrentTrip);
    }, []);

    useEffect(() => {
        if (currentTrip?.id) {
            dispatch(getParticipationsByTripId(currentTrip.id))
        }
    }, [currentTrip]);

    return (
        <section>
            <KanbanBoard tripId={currentTrip?.id}/>
        </section>
    );
}); 

export default KanbanPage;