import { EdiTable } from "features/EdiTable/EdiTable";
import { WidgetWrapper } from "features/WidgetWrapper/WidgetWrapper";
import { Trip } from "shared/config/store/types/tripSlice.types";
import cls from './TripCard.module.scss';
import { Button, ButtonTheme } from "shared/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeConfig";
import { Typography } from "shared/UI/Typography/Typography";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { updateReportByTripId } from "shared/config/store/actionCreators/reportActions";

type TripKeys = keyof Pick<Trip, "destination" | "startDate" | "endDate">

const tripHeaderColumnDataMap: Record<TripKeys, string> = {
  destination: "Куда",
  startDate: "Начало",
  endDate: "Конец"
} as const;

const tripHeaderColumnDataMapReverse: Record<string, TripKeys> = {
  "Куда": "destination",
  "Начало": "startDate",
  "Конец": "endDate"
} as const;

interface TripCardProps {
    tripData: Trip;
    isCurrent: boolean;
}

export const TripCard = ({tripData, isCurrent}: TripCardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleRedirectTrip = () => {
        if (isCurrent) {
            navigate(`${RoutePath[AppRoutes.CURRENT]}`);
        }
        else {
            navigate(`${RoutePath[AppRoutes.REPORT]}/${tripData.id}`);
        }
    };

    const handlePublishTrip = () => {
        dispatch(updateReportByTripId(tripData.id, {isPublished: true}));
    };

  return (
    <WidgetWrapper className={cls.tripCard}>
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
                theme={ButtonTheme.BASIC}
                onClick={handleRedirectTrip}
            >
                Перейти
            </Button>
            {!isCurrent &&
                <Button
                    theme={ButtonTheme.BASIC}
                    onClick={handlePublishTrip}
                >
                    Опубликовать
                </Button>
            }
            
        </div>
    </WidgetWrapper>
  )
}
