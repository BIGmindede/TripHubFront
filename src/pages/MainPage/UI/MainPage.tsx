import { memo, useEffect } from 'react';
import { CreateTripInvitation } from 'widgets/CreateTripInvitation/UI/CreateTripInvitation';
import cls from './MainPage.module.scss';
import { Statistics } from 'widgets/Statistics';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getTripStatistics } from 'shared/config/store/actionCreators/tripActions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { currentTripSelector, tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';
import { CurrentTrip } from 'widgets/CurrentTrip';
import { getReports } from 'shared/config/store/actionCreators/reportActions';
import { useSelector } from 'react-redux';
import { ReportCard } from 'features/ReportCard/ReportCard';
import { isAuthenticatedSelector } from 'shared/config/store/selectors/authSelectors';
import { reportsSelector } from 'shared/config/store/selectors/reportSelectors';
import { Slider } from 'widgets/Slider/UI/Slider';

const MainPage = memo(() => {
    const dispatch = useAppDispatch();

    const currentTrip = useAppSelector(currentTripSelector);
    const isAuthenticated = useAppSelector(isAuthenticatedSelector);
    const reports = useSelector(reportsSelector);

    useEffect(() => {
        dispatch(getTripStatistics());
        dispatch(getReports());
    }, []);

    const publishedReports = reports.filter(report => report.isPublished === true);
    
    return (
        <>
            <section className={cls.reportsSection}>
                <Slider
                    slides={publishedReports.map(report =>
                        <ReportCard report={report}/>
                    )}
                />
            </section>
            {isAuthenticated &&
                <section className={cls.userSection}>
                    {currentTrip
                        ? <WidgetWrapper
                            className={cls.currentTripWidget}
                            heading='Текущее путешествие'
                        >
                            <CurrentTrip isEditable={false} isShownRedirectButton/>
                        </WidgetWrapper>
                        : <CreateTripInvitation />
                    }
                    <Statistics />
                </section>
            }
        </>
    );
});

export default MainPage;
