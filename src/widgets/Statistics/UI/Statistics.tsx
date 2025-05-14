import { WidgetWrapper } from "features/WidgetWrapper/WidgetWrapper"
import { Typography } from "shared/UI/Typography/Typography"
import cls from './Statistics.module.scss'
import { useAppSelector } from "shared/hooks/useAppSelector"
import { tripDetailsSelector, tripStatisticsSelector } from "shared/config/store/selectors/tripSelectors"
import { EdiTable } from "features/EdiTable/EdiTable"

export const Statistics = () => {
    const tripsStatistics = useAppSelector(tripStatisticsSelector);
    const currentTrip = useAppSelector(tripDetailsSelector);
    return (
        <WidgetWrapper className={cls.statistics} heading="Статистика ваших путешествий">
            <Typography variant="paragraph" size="m">
                Ваша статистика путешествий в цифрах и фактах.
            </Typography>
            {tripsStatistics && tripsStatistics.lastTrip
                && tripsStatistics.longestTrip && tripsStatistics.totalDaysInTrips 
                && tripsStatistics.totalTrips && tripsStatistics.uniqueDestinations
                && tripsStatistics.lastTrip.id !== currentTrip?.id
                ? <>
                    <div className={cls.numerableStats}>
                        <WidgetWrapper.Sector className={cls.statCell}>
                            <Typography variant="span" size="s">
                                Всего путешествий:
                            </Typography>
                            <Typography variant="superspan" size="xl">
                                {tripsStatistics.totalTrips}
                            </Typography>
                        </WidgetWrapper.Sector>
                        <WidgetWrapper.Sector className={cls.statCell}>
                            <Typography variant="span" size="s">
                                Уникальных поездок:
                            </Typography>
                            <Typography variant="superspan" size="xl">
                                {tripsStatistics.uniqueDestinations}
                            </Typography>
                        </WidgetWrapper.Sector>
                        <WidgetWrapper.Sector className={cls.statCell}>
                            <Typography variant="span" size="s">
                                Дней проведено в путешествиях:
                            </Typography>
                            <Typography variant="superspan" size="xl">
                                {tripsStatistics.totalDaysInTrips}
                            </Typography>
                        </WidgetWrapper.Sector>
                    </div>
                    <div className={cls.objectStats}>
                        <WidgetWrapper.Sector
                            className={cls.statCell}
                            heading="Самое длительное путешествие"
                        >
                            <EdiTable
                                tableData={{
                                    rows: [
                                        ["Куда", tripsStatistics.longestTrip.destination],
                                        ["Начало", tripsStatistics.longestTrip.startDate],
                                        ["Конец", tripsStatistics.longestTrip.endDate]
                                    ]
                                }}
                            />
                        </WidgetWrapper.Sector>
                            <WidgetWrapper.Sector
                            className={cls.statCell}
                            heading="Последнее путешествие"
                        >
                            <EdiTable
                                tableData={{
                                    rows: [
                                        ["Куда", tripsStatistics.lastTrip.destination],
                                        ["Начало", tripsStatistics.lastTrip.startDate],
                                        ["Конец", tripsStatistics.lastTrip.endDate]
                                    ]
                                }}
                            />
                        </WidgetWrapper.Sector>
                    </div>
                </>
                : <Typography className={cls.emptyStub} variant="span" size="l">
                    Пока что нет завершенных путешествий
                </Typography>
            }
        </WidgetWrapper>
    )
}
