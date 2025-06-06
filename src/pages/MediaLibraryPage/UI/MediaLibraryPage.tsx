import { memo, useEffect } from 'react';
import cls from './MediaLibraryPage.module.scss';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { currentProfileSelector } from 'shared/config/store/selectors/profileSelectors';
import { tripsSelector } from 'shared/config/store/selectors/tripSelectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getTripsByProfileId } from 'shared/config/store/actionCreators/tripActions';
import { MediaFolder } from 'features/MediaFolder/MediaFolder';
import { Typography } from 'shared/UI/Typography/Typography';
import dayjs from 'dayjs';
import { WidgetWrapper, WidgetWrapperSectorTheme } from 'features/WidgetWrapper/WidgetWrapper';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

const MediaLibraryPage = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userTrips = useAppSelector(tripsSelector);
  
  const handleRedirectFolder = (tripId: string) => {
    console.log("Вызывается")
    navigate(`${RoutePath[AppRoutes.MEDIA_FOLDER]}/${tripId}`);
  };

  useEffect(() => {
    dispatch(getTripsByProfileId());
  }, []);

  return (
    <section className={cls.mediaLibraryPage}>
      <WidgetWrapper
        heading='Ваша библиотека медиа'
        className={cls.mediaLibrary}
      >
        <WidgetWrapper.Sector
          theme={WidgetWrapperSectorTheme.CLEAR}
          className={cls.foldersWrapper}
        >
          {userTrips.map(trip =>
            <MediaFolder
              onClick={() => handleRedirectFolder(trip.id)}
              key={trip.id}
              thumbnailUrl={trip.thumbnailUrl}
              title={
                <>
                  <Typography variant='span' size='m'>
                    {trip.destination}
                  </Typography>
                  <Typography variant='span' size='m'>
                    {dayjs(trip.startDate).format('DD.MM.YYYY').toString()}&nbsp;-&nbsp;
                    {dayjs(trip.endDate).format('DD.MM.YYYY').toString()}
                  </Typography>
                </>
              }
            />
          ).reverse()}
        </WidgetWrapper.Sector>
      </WidgetWrapper>
    </section>
  );
});

export default MediaLibraryPage; 