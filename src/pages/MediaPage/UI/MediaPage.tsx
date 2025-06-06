import { memo, useEffect } from 'react';
import cls from './MediaPage.module.scss';
import { ImageGallery } from 'widgets/ImageGallery';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { mediaSelector } from 'shared/config/store/selectors/mediaSelectors';
import { useParams } from 'react-router-dom';
import { getMediaByTripId, uploadMedia } from 'shared/config/store/actionCreators/mediaActions';
import { getTripById } from 'shared/config/store/actionCreators/tripActions';
import { currentTripSelector, tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';
import dayjs from 'dayjs';
import { MediaGeodata } from 'shared/config/store/types/media';
import { currentProfileSelector } from 'shared/config/store/selectors/profileSelectors';

const MediaPage = memo(() => {
    const dispatch = useAppDispatch();

    const { tripId } = useParams();

    const tripMedia = useAppSelector(mediaSelector);
    const tripDetails = useAppSelector(tripDetailsSelector);
    const currentProfile = useAppSelector(currentProfileSelector);
    const currentTrip = useAppSelector(currentTripSelector);

    useEffect(() => {
        if (tripId) {
            dispatch(getTripById(tripId));
            dispatch(getMediaByTripId(tripId));
        }
    }, [tripId]);

    const handleAddImage = (data: {
        file: File;
        description: string;
        geodata: MediaGeodata;
    }) => {
        dispatch(uploadMedia(data.file, {
            description: data.description,
            geodata: data.geodata,
            authorId: currentProfile.id,
            tripId: currentProfile.id
        }));
    }

    return (
        <section className={cls.mediaPage}>
            <ImageGallery
                title={`Ваше путешествие в \"${tripDetails?.destination}\"`}
                description={`
                    ${dayjs(tripDetails?.startDate).format('DD.MM.YYYY').toString()} - 
                    ${dayjs(tripDetails?.endDate).format('DD.MM.YYYY').toString()}
                `}
                images={tripMedia}
                onImageAdd={currentTrip ? handleAddImage : undefined}
            />
        </section>
    );
});

export default MediaPage;
