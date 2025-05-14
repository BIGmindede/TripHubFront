import { memo, useEffect } from 'react';
import { CreateTripInvitation } from 'widgets/CreateTripInvitation/UI/CreateTripInvitation';
import cls from './MainPage.module.scss';
import { Statistics } from 'widgets/Statistics';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getCurrentTrip, getTripStatistics } from 'shared/config/store/actionCreators/tripActions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper';
import { CurrentTrip } from 'widgets/CurrentTrip';
import { selectIsAuthenticated } from 'shared/config/store/selectors/authSelectors';
import { getReportById, getReports } from 'shared/config/store/actionCreators/reportActions';
import { useSelector } from 'react-redux';
import { selectReports } from 'shared/config/store/selectors/reportSelectors';
import { report } from 'process';
import { ReportCard } from 'features/ReportCard/ReportCard';

const MainPage = memo(() => {
    const dispatch = useAppDispatch();

    const currentTrip = useAppSelector(tripDetailsSelector);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const reports = useSelector(selectReports);

    useEffect(() => {
        dispatch(getCurrentTrip());
        dispatch(getTripStatistics());
        dispatch(getReports());
    }, []);

    const publishedReports = reports.filter(report => report.isPublished === true);
    
    return (
        <>
            <section className={cls.userSection}>
                {publishedReports.map(report =>
                    <ReportCard report={report}/>
                )}
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
