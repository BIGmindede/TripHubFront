import { useNavigate } from "react-router-dom";
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeConfig";
import { Button, ButtonTheme } from "shared/UI/Button/Button";
import { ProgressBar } from "features/ProgressBar/ProgressBar";
import { Typography } from "shared/UI/Typography/Typography";
import cls from './CurrentTrip.module.scss'
import { EdiTable } from "features/EdiTable/EdiTable";
import { useEffect, useState } from "react";
import { Trip } from "shared/config/store/types/tripSlice.types";
import { TableData } from "features/EdiTable/EdiTable.types";
import { HiddenInput } from "shared/UI/HiddenInput/HiddenInput";
import { DatePicker } from "shared/UI/DatePicker/DatePicker";
import { currentTripParticipationsSelector, currentTripSelector, tripDetailsSelector } from "shared/config/store/selectors/tripSelectors";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { setCurrentTripOver, updateCurrentTrip } from "shared/config/store/actionCreators/tripActions";
import { useToggle } from "shared/hooks/useToggle";
import { mediaSelector } from "shared/config/store/selectors/mediaSelectors";

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

interface CurrentTripProps {
  isEditable: boolean;
  isShownRedirectButton: boolean;
  onRedirectButtonClick?: () => void;
  isTitleShown?: boolean;
}

const CurrentTrip = ({
    isEditable = false,
    isShownRedirectButton,
    onRedirectButtonClick,
    isTitleShown = false,
}: CurrentTripProps) => {
  const dispatch = useAppDispatch();

  const currentTrip = useAppSelector(currentTripSelector);
  const currentParticipations = useAppSelector(currentTripParticipationsSelector);
  const currentTripMedia = useAppSelector(mediaSelector);

  const navigate = useNavigate();
  const [isModified, setIsModified] = useState<boolean>(false)
  
  const handleRedirectButtonClick = () => {
    onRedirectButtonClick?.();
    navigate(RoutePath[AppRoutes.CURRENT]);
  }

  const [trip, setTrip] = useState(currentTrip);

  useEffect(() => {
    if (isEditable && JSON.stringify(trip) !== JSON.stringify(currentTrip)) {
      setIsModified(true);
    } else {
      setIsModified(false)
    }
  }, [trip]);

  const handleTripDataChange = (data: TableData) => {
    if (isEditable) {
      setTrip(prev => {
        const updatedTrip = { ...prev };
        data.rows.forEach(([key, value]) => {
          updatedTrip[tripHeaderColumnDataMapReverse[key]] = value as string;
        });
        return updatedTrip;
      })
    }
  }

  const handleSaveTripData = () => {
    dispatch(updateCurrentTrip(trip))
  }

  const handleSetStages = (statuses: string[], statusId: number) => {
    dispatch(updateCurrentTrip({...currentTrip, statuses, statusId: statusId}))
  }

  const handleSetTripOver = () => {
    dispatch(updateCurrentTrip({ ...currentTrip, thumbnailUrl: currentTripMedia?.[0]?.mediaUrl ?? null }));
    dispatch(setCurrentTripOver(currentParticipations.map(p => p.id)));
    navigate(`${RoutePath[AppRoutes.REPORT]}/${currentTrip.id}`);
  }

  useEffect(() => {
    setTrip(currentTrip);
  }, [currentTrip])

  if (!trip) {
    return (
      <div className={cls.noTrip}>
        <Typography
          variant="span"
          size="m"
          className={cls.noTripText}
        >
          Нет активного путешествия
        </Typography>
      </div>
    );
  }

  return (
    <div className={cls.currentTrip}>
      {isTitleShown &&
        <Typography variant="heading" size="s">
          Текущее путешествие
        </Typography>
      }
      <div className={cls.container}>
        <EdiTable
          isHeaderColumnEditable={false}
          inputFields={[HiddenInput, DatePicker, DatePicker]}
          setTableData={isEditable ? handleTripDataChange : null}
          tableData={{
            rows: Object.keys(tripHeaderColumnDataMap).map((key: TripKeys) => {
              return [tripHeaderColumnDataMap[key], trip[key]]
            })
          }}
        />
        {isModified &&
          <Button
            className={cls.saveTripDataButton}
            theme={ButtonTheme.BASIC}
            onClick={handleSaveTripData}
          >
            Сохранить
          </Button>
        }
        <ProgressBar
          stages={trip.statuses}
          currentStageIndex={trip.statusId}
          setStages={isEditable ? handleSetStages : null}
        />
      </div>
      {isShownRedirectButton && (
        <Button
          theme={ButtonTheme.BASIC}
          onClick={handleRedirectButtonClick}
        >
          Перейти
        </Button>
      )}
      {currentTrip.statuses &&
        currentTrip.statusId === currentTrip.statuses.length - 1 &&
        currentTrip.statuses.length > 1 &&
        isEditable &&
        <Button
          onClick={handleSetTripOver}
          theme={ButtonTheme.BASIC}
        >
          Завершить
        </Button>
      }
    </div>
  );
};

export default CurrentTrip;