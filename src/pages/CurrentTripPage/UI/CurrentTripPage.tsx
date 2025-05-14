import { memo, useEffect } from 'react';
import cls from './CurrentTripPage.module.scss';
import { CurrentTrip } from 'widgets/CurrentTrip';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';
import { tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectProfile } from 'shared/config/store/selectors/profileSelectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getCurrentTrip, getParticipationsByTripId } from 'shared/config/store/actionCreators/tripActions';
import { TripParties } from 'widgets/TripParties';
import { getKanbanTasksByImplAndTrip } from 'shared/config/store/actionCreators/kanbanActions';
import { UserTasks } from 'widgets/UserTasks/UI/UserTasks';
import { Report } from 'widgets/Report';
import { getReportByTripId } from 'shared/config/store/actionCreators/reportActions';
import { selectTripMedia } from 'shared/config/store/selectors/mediaSelectors';
import { ImageGallery } from 'widgets/ImageGallery';
import { getMediaByTripId, uploadMedia } from 'shared/config/store/actionCreators/mediaActions';

const CurrentTripPage = memo(() => {
    const dispatch = useAppDispatch();

    const currentTrip = useAppSelector(tripDetailsSelector);
    const currentUser = useAppSelector(selectProfile);
    const images = useAppSelector(selectTripMedia);

    useEffect(() => {
        dispatch(getCurrentTrip());
    }, []);

    useEffect(() => {
        if (currentTrip && currentUser) {
            dispatch(getParticipationsByTripId(currentTrip.id));
            dispatch(getKanbanTasksByImplAndTrip(currentUser.id, currentTrip.id));
            dispatch(getReportByTripId(currentTrip.id));
            dispatch(getMediaByTripId(currentTrip.id))
        }
    }, [currentTrip, currentUser]);

    // onImageAdd?: (data: {
    //     file: File;
    //     description: string;
    //     geodata?: { lat: number; lon: number };
    // }) => void;

    const handleAddImage = (data: {
        file: File;
        description: string;
        geodata?: { lat: number; lon: number };
    }) => {
        dispatch(uploadMedia(data.file, {
            description: data.description,
            geodata: JSON.stringify(data.geodata),
            authorId: currentUser.id,
            tripId: currentTrip.id
        }));
    }

    return (
        <>
            <section className={cls.firstRow}>
                <WidgetWrapper
                    className={cls.currentTripWidget}
                    heading="Текущее путешествие"
                >
                    <CurrentTrip
                        isEditable={currentUser?.id === currentTrip?.authorId}
                        isShownRedirectButton={false}
                    />
                </WidgetWrapper>
                <TripParties />
                <UserTasks />
            </section>
            <section className={cls.secondRow}>
                <Report isEditable heading="Текущий отчет по путешествию"/>
            </section>
            <section className={cls.thirdRow}>
                <ImageGallery onImageAdd={handleAddImage} images={images}/>
            </section>
        </>
    );
});

export default CurrentTripPage;
