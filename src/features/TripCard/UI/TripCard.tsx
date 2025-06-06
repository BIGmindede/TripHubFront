import { EdiTable } from "features/EdiTable/EdiTable";
import { WidgetWrapper } from "features/WidgetWrapper/WidgetWrapper";
import { Trip } from "shared/config/store/types/tripSlice.types";
import cls from './TripCard.module.scss';
import { Button, ButtonTheme } from "shared/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeConfig";
import { Typography } from "shared/UI/Typography/Typography";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { getReportByTripId, updateReportByTripId } from "shared/config/store/actionCreators/reportActions";
import { useEffect } from "react";
import { getParticipationsByTripId } from "shared/config/store/actionCreators/tripActions";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { participationsSelector } from "shared/config/store/selectors/tripSelectors";
import { reportDetailsSelector } from "shared/config/store/selectors/reportSelectors";
import { calculateAvgExpenses, calculateSumExpenses } from "shared/lib/calculateExpenses/calculateExpenses";
import { Image } from "shared/UI/Image/Image";

type TripKeys = keyof Pick<Trip, "destination" | "startDate" | "endDate">

const tripHeaderColumnDataMap: Record<TripKeys, string> = {
  destination: "Куда",
  startDate: "Начало",
  endDate: "Конец"
} as const;

interface TripCardProps {
    tripData: Trip;
    isCurrent: boolean;
}

export const TripCard = ({ tripData, isCurrent }: TripCardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tripParties = useAppSelector(participationsSelector);
    const tripReport = useAppSelector(reportDetailsSelector);

    const handleRedirectTrip = () => {
        if (isCurrent) {
            navigate(`${RoutePath[AppRoutes.CURRENT]}`);
        }
        else {
            navigate(`${RoutePath[AppRoutes.REPORT]}/${tripData.id}`);
        }
    };

    const handlePublishTrip = () => {
        dispatch(updateReportByTripId(
            tripData.id,
            {
                isPublished: true,
                participantsAmount: tripParties.length + 1,
                sumExpenses: calculateSumExpenses(tripReport.totalBudget),
                avgExpenses: calculateAvgExpenses(tripReport.totalBudget, tripParties.length + 1),
                thumbnailUrl: tripData.thumbnailUrl,
                startDate: tripData.startDate,
                endDate: tripData.endDate,
            }
        ));
        navigate(`${RoutePath[AppRoutes.REPORT]}/${tripData.id}`);
    };

    useEffect(() => {
        if (tripData && isCurrent) {
            dispatch(getParticipationsByTripId(tripData.id))
            dispatch(getReportByTripId(tripData.id))
        }
    }, [tripData, isCurrent]);

  return (
    <WidgetWrapper className={cls.tripCard}>
        <Image
            className={cls.tripThumbnail}
            src={`${process.env.MEDIA_STORAGE_URL}/${tripData.thumbnailUrl}`}
        />
        <div className={cls.tripInfo}>
            {isCurrent &&
                <div className={cls.activeMarker}>
                    <Typography variant="span" size="m">Активно</Typography>
                </div>
            }
            <EdiTable
                tableData={{
                    rows: Object.keys(tripHeaderColumnDataMap).map((key: TripKeys) => {
                        return [tripHeaderColumnDataMap[key], tripData[key]]
                    })
                }}
            />
            <div className={cls.buttonsBlock}>
                <Button
                    className={cls.tripCardButton}
                    theme={ButtonTheme.BASIC}
                    onClick={handleRedirectTrip}
                >
                    Перейти
                </Button>
                {isCurrent &&
                    <Button
                        className={cls.tripCardButton}
                        theme={ButtonTheme.BASIC}
                        onClick={handlePublishTrip}
                    >
                        Опубликовать
                    </Button>
                }
                
            </div>
        </div>
    </WidgetWrapper>
  )
}
