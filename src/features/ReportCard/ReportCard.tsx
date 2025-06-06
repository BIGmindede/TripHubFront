import { EdiTable } from "features/EdiTable/EdiTable";
import { JourneyTrack } from "features/JourneyTrack/JourneyTrack";
import { ReportCopy, reportCopyKeys, ReportReqRes } from "shared/config/store/types/reportSlice.types";
import cls from './ReportCard.module.scss';
import { Image } from "shared/UI/Image/Image";
import { Button, ButtonTheme } from "shared/UI/Button/Button";
import { AppRoutes } from "shared/config/routeConfig/routeConfig";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "features/Modal";
import { MODAL_IDS } from "shared/config/ModalContext/modalIds";
import { useToggle } from "shared/hooks/useToggle";
import { Form } from "features/Form";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { isAuthenticatedSelector } from "shared/config/store/selectors/authSelectors";
import { currentTripSelector, tripDetailsSelector } from "shared/config/store/selectors/tripSelectors";
import { useEffect, useRef, useState } from "react";
import { Input } from "shared/UI/Input/Input";
import { DatePicker } from "shared/UI/DatePicker/DatePicker";
import { SearchInput } from "features/SearchInput";
import { Typography } from "shared/UI/Typography/Typography";
import { ToggleLabel } from "shared/UI/ToggleLabel/ToggleLabel";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { Profile } from "shared/config/store/types/profileSlice.types";
import { Trip } from "shared/config/store/types/tripSlice.types";
import { createCurrentTrip, getTripById } from "shared/config/store/actionCreators/tripActions";
import { currentProfileSelector, searchProfilesSelector } from "shared/config/store/selectors/profileSelectors";
import { getSearchProfilesByEmail, getSearchProfilesByName, getSearchProfilesByTagName } from "shared/config/store/actionCreators/profileActions";
import { searchProfilesActions } from "shared/config/store/reducers/searchProfilesSlice";
import { UserCard } from "features/UserCard";

const PARAM_STUB = "Не указано";

type newTripKeys = keyof Trip;
type newTripVals = Trip[newTripKeys];

interface ReportCardProps {
    report: ReportReqRes;
}

export const ReportCard = ({
    report
}: ReportCardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isToggleUp, toggle } = useToggle();
    const containerRef = useRef<HTMLDivElement>();

    const [newTrip, setNewTrip] = useState<Trip>(null);
    const [reportCopy, setReportCopy] = useState<ReportCopy>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<Profile[]>([]);

    const searchedProfiles = useAppSelector(searchProfilesSelector);
    const isAuth = useAppSelector(isAuthenticatedSelector);
    const currentProfile = useAppSelector(currentProfileSelector);
    const currentTrip = useAppSelector(currentTripSelector);
    const trip = useAppSelector(tripDetailsSelector);

    const handleOpenCopyTripModal = () => {
        dispatch(getTripById(report.tripId));
        toggle();
    }

    const handleRedirectReport = () => {
        navigate(`${RoutePath[AppRoutes.REPORT]}/${report.tripId}`);
    }

    const handleSetNewTripData = (key: newTripKeys, value: newTripVals) => {
        setNewTrip({
            ...newTrip,
            [key]: value
        })
    };

    const handleSetReportCopyData = (key: reportCopyKeys) => {
        setReportCopy({
            ...reportCopy,
            [key]: reportCopy && reportCopy[key] ? null : report[key]
        })
    };

    useEffect(() => {
        if (isToggleUp) {
            setReportCopy({
                arrivalTo: report.arrivalTo,
                forwardVehicle: report.forwardVehicle,
                backVehicle: report.backVehicle,
                plannedBudget: JSON.stringify(report.plannedBudget),
                equipmentTaken: JSON.stringify(report.equipmentTaken)
            })
        }
    }, [isToggleUp]);

    const getDaysBetween = (start: string, end: string) => {
        return start && end 
            ? `${dayjs(end).diff(dayjs(start), "day")} дн.`
            : PARAM_STUB;
    }

    const handleSearchProfiles = () => {
        if (searchTerm.startsWith('@')) {
            const tagName = searchTerm.substring(1);
            dispatch(getSearchProfilesByTagName(tagName));
        }
        else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(searchTerm)) {
            dispatch(getSearchProfilesByEmail(searchTerm));
        }
        else {
            dispatch(getSearchProfilesByName(searchTerm));
        }
    };

    const handleAddParticipant = (profile: Profile) => {
        setSelectedParticipants([...selectedParticipants, profile]);
        setSearchTerm("");
        dispatch(searchProfilesActions.clearSearchProfiles());
    }

    const handleDeleteParticipant = (participant: Profile) => {
        setSelectedParticipants(selectedParticipants.filter(currentParticipant =>
            currentParticipant.id !== participant.id
        ));
    }

    const handleScrollCalendarIntoView = () => {
        setTimeout(() => containerRef.current?.scrollTo({
            behavior: "smooth",
            top: 250
        }), 0)
    }

    const handleCopyTripSubmit = () => {
        dispatch(createCurrentTrip({
            trip: { ...newTrip, authorId: currentProfile.id, statuses: trip.statuses },
            participationAndNotificationInfo: {
                participations: [
                    ...selectedParticipants.map(participant => ({
                        participantId: participant.id,
                        email: participant.email
                    })),
                    {
                        participantId: currentProfile.id,
                        email: currentProfile.email
                    }
                ],
                authorTag: currentProfile.tagName
            },
            report: reportCopy
        }));

        navigate("/current");
    }

    const searchedFilteredProfiles = searchedProfiles.filter(profile =>
        profile.id !== currentProfile.id &&
        selectedParticipants.findIndex(p => p.id === profile.id) === -1
    )

    return (
        <div className={cls.reportCard}>
            <Image
                src={`${process.env.MEDIA_STORAGE_URL}/${report.thumbnailUrl}`}
                className={cls.reportThumbnail}
            />
            <div className={cls.reportInfo}>
                <JourneyTrack
                    className={cls.journeyTrack}
                    vehicleForward={report.forwardVehicle}
                    vehicleBack={report.backVehicle}
                />
                <EdiTable
                    className={cls.reportTable}
                    tableData={{
                        rows: [
                            ["Откуда", report.departureFrom ?? PARAM_STUB],
                            ["Куда", report.arrivalTo ?? PARAM_STUB],
                            ["Длительность", getDaysBetween(report.startDate, report.endDate)],
                            ["Участников", report.participantsAmount ?? PARAM_STUB],
                            ["Затраты", report.sumExpenses ? `${report.sumExpenses} руб.` : PARAM_STUB],
                        ]
                    }}
                />
                <div className={cls.reportButtons}>
                    <Button
                        theme={ButtonTheme.BASIC}
                        onClick={handleRedirectReport}
                        className={cls.reportButton}
                    >
                        Перейти
                    </Button>
                    {!currentTrip && isAuth &&
                        <>
                            <Button
                                theme={ButtonTheme.BASIC}
                                onClick={handleOpenCopyTripModal}
                                className={cls.reportButton}
                            >
                                Скопировать
                            </Button>
                            <Modal
                                title='Создание путешествия'
                                className={cls.createTripModal}
                                modalId={MODAL_IDS.COPY_TRIP}
                                isOpen={isToggleUp}
                                onClose={toggle}
                                scrollableElementRef={containerRef}
                            >
                                <Form
                                    submitText="Скопировать"
                                    className={cls.createTripForm}
                                    onSubmit={handleCopyTripSubmit}
                                >
                                    <div className={cls.tripDataInputs}>
                                        <Input
                                            className={cls.destinationInput}
                                            label='Куда отправимся*'
                                            placeholder='Поехали в...'
                                            value={newTrip?.destination}
                                            onChange={(value) =>
                                                handleSetNewTripData('destination', value)
                                            }
                                        />
                                        <DatePicker
                                            onCalendarOpen={handleScrollCalendarIntoView}
                                            label='Дата отправления'
                                            onChange={(value) =>
                                                handleSetNewTripData('startDate', value)
                                            }
                                            value={newTrip?.startDate ?? ''}
                                        />
                                        <DatePicker
                                            onCalendarOpen={handleScrollCalendarIntoView}
                                            label='Дата возвращения'
                                            onChange={(value) =>
                                                handleSetNewTripData('endDate', value)
                                            }
                                            value={newTrip?.endDate ?? ''}
                                        />
                                    </div>
                                    <div className={cls.participationInputs}>
                                        <SearchInput
                                            label='Поиск участников'
                                            value={searchTerm}
                                            onChange={setSearchTerm}
                                            placeholder="Тег, почта или имя"
                                            className={cls.searchInput}
                                            searchAction={handleSearchProfiles}
                                        />
                                        {searchedFilteredProfiles.length > 0
                                            ? <div className={cls.searchedProfiles}>
                                                {searchedFilteredProfiles.map(profile =>
                                                    <div
                                                        onClick={() => handleAddParticipant(profile)}
                                                    >
                                                        <UserCard
                                                            className={cls.searchedProfilesCard}
                                                            key={profile.tagName}
                                                            userName={profile.name}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            : <div className={cls.profilesNotFound}>
                                                <Typography variant='span' size='s'>
                                                    Нет результатов поиска
                                                </Typography>
                                            </div>
                                        }
                                        {selectedParticipants.map(participant =>
                                            <ToggleLabel
                                                className={cls.selectedParticipantsCard}
                                                key={participant.tagName}
                                                initialState={true}
                                                action={() => handleDeleteParticipant(participant)}
                                            >
                                                <UserCard 
                                                    className={cls.selectedParticipantsCardUserCard}
                                                    userName={participant.name}
                                                />
                                            </ToggleLabel>
                                        )}
                                    </div>
                                    {(report.arrivalTo
                                    || report.forwardVehicle
                                    || report.backVehicle
                                    || report.plannedBudget
                                    || report.equipmentTaken) &&
                                        <div className={cls.copyTripSection}>
                                            <Typography
                                                variant='heading' size='m'
                                            >
                                                Скопировать пункты отчета
                                            </Typography>
                                            <div className={cls.selectParts}>
                                                {report.arrivalTo &&
                                                    <ToggleLabel
                                                        className={cls.selectPartCard}
                                                        initialState={true}
                                                        action={() => handleSetReportCopyData('arrivalTo')}
                                                    >
                                                        Место прибытия
                                                    </ToggleLabel>
                                                }
                                                {report.forwardVehicle &&
                                                    <ToggleLabel
                                                        className={cls.selectPartCard}
                                                        initialState={true}
                                                        action={() => handleSetReportCopyData('forwardVehicle')}
                                                    >
                                                        Транспорт туда
                                                    </ToggleLabel>
                                                }
                                                {report.backVehicle &&
                                                    <ToggleLabel
                                                        className={cls.selectPartCard}
                                                        initialState={true}
                                                        action={() => handleSetReportCopyData('backVehicle')}
                                                    >
                                                        Транспорт оттуда
                                                    </ToggleLabel>
                                                }
                                                {report.plannedBudget &&
                                                    <ToggleLabel
                                                        className={cls.selectPartCard}
                                                        initialState={true}
                                                        action={() => handleSetReportCopyData('plannedBudget')}
                                                    >
                                                        План бюджета
                                                    </ToggleLabel>
                                                }
                                                {report.equipmentTaken &&
                                                    <ToggleLabel
                                                        className={cls.selectPartCard}
                                                        initialState={true}
                                                        action={() => handleSetReportCopyData('equipmentTaken')}
                                                    >
                                                        Что брали с собой
                                                    </ToggleLabel>
                                                }
                                            </div>
                                        </div>
                                    }
                                </Form>
                            </Modal>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
