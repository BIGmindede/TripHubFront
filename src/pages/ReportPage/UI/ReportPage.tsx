import { useLocation, useParams } from 'react-router-dom';
import cls from './ReportPage.module.scss';
import { ImageGallery } from 'widgets/ImageGallery';
import { Report } from 'widgets/Report';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getMediaByTripId, uploadMedia } from 'shared/config/store/actionCreators/mediaActions';
import { selectReport } from 'shared/config/store/selectors/reportSelectors';
import { selectProfile } from 'shared/config/store/selectors/profileSelectors';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { selectTripMedia } from 'shared/config/store/selectors/mediaSelectors';
import { getReportByTripId, updateReportByTripId } from 'shared/config/store/actionCreators/reportActions';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { getTripById } from 'shared/config/store/actionCreators/tripActions';
import { tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';

const ReportPage = () => {
    const dispatch = useAppDispatch();
    const  { tripId } = useParams();

    const currentReport = useAppSelector(selectReport);
    const currentProfile = useAppSelector(selectProfile);
    const trip = useAppSelector(tripDetailsSelector);
    const images = useAppSelector(selectTripMedia);

    useEffect(() => {
        dispatch(getTripById(tripId));
        dispatch(getMediaByTripId(tripId));
        dispatch(getReportByTripId(tripId));
    }, []);

    const isEditable = !currentReport?.isPublished && currentReport?.authorId === currentProfile?.id

    const handleAddImage = (data: {
        file: File;
        description: string;
        geodata: { lat: number; lon: number };
    }) => {
        dispatch(uploadMedia(data.file, {
            description: data.description,
            geodata: JSON.stringify(data.geodata),
            authorId: currentProfile.id,
            tripId: currentProfile.id
        }));
    }

    const handlePublishTrip = () => {
        dispatch(updateReportByTripId(trip.id, {isPublished: true}));
    };

    return (
        <>
            {isEditable &&
                <Button onClick={handlePublishTrip} className={cls.publishReportButton} theme={ButtonTheme.BASIC}>Опубликовать отчет</Button>
            }
            <section className={cls.secondRow}>
                <Report isEditable={isEditable} heading="Отчет по путешествию"/>
            </section>
            <section className={cls.thirdRow}>
                <ImageGallery onImageAdd={isEditable ? handleAddImage : undefined} images={images}/>
            </section>
        </>
    )
}

export default ReportPage;
