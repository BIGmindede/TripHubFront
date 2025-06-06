import { useNavigate, useParams } from 'react-router-dom';
import cls from './ReportPage.module.scss';
import { ImageGallery } from 'widgets/ImageGallery';
import { Report } from 'widgets/Report';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { getMediaByTripId, uploadMedia } from 'shared/config/store/actionCreators/mediaActions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { getReportByTripId, updateReportByTripId } from 'shared/config/store/actionCreators/reportActions';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { createCurrentTrip, getParticipationsByTripId, getTripById } from 'shared/config/store/actionCreators/tripActions';
import { currentTripSelector, tripDetailsSelector, tripParticipationsSelector } from 'shared/config/store/selectors/tripSelectors';
import { reportDetailsSelector } from 'shared/config/store/selectors/reportSelectors';
import { currentProfileSelector, searchProfilesSelector } from 'shared/config/store/selectors/profileSelectors';
import { mediaSelector } from 'shared/config/store/selectors/mediaSelectors';
import { MediaGeodata } from 'shared/config/store/types/media';
import { calculateAvgExpenses, calculateSumExpenses } from 'shared/lib/calculateExpenses/calculateExpenses';
import { useToggle } from 'shared/hooks/useToggle';
import { Input } from 'shared/UI/Input/Input';
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { SearchInput } from 'features/SearchInput';
import { UserCard } from 'features/UserCard';
import { Typography } from 'shared/UI/Typography/Typography';
import { ToggleLabel } from 'shared/UI/ToggleLabel/ToggleLabel';
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds';
import { Trip } from 'shared/config/store/types/tripSlice.types';
import { Modal } from 'features/Modal';
import { Form } from 'features/Form';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { searchProfilesActions } from 'shared/config/store/reducers/searchProfilesSlice';
import { getSearchProfilesByEmail, getSearchProfilesByName, getSearchProfilesByTagName } from 'shared/config/store/actionCreators/profileActions';
import { ReportCopy, reportCopyKeys } from 'shared/config/store/types/reportSlice.types';
import { isAuthenticatedSelector } from 'shared/config/store/selectors/authSelectors';

type newTripKeys = keyof Trip;
type newTripVals = Trip[newTripKeys];

const ReportPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const  { tripId } = useParams();
    
    const containerRef = useRef<HTMLDivElement>();

    const [newTrip, setNewTrip] = useState<Trip>(null);
    const [reportCopy, setReportCopy] = useState<ReportCopy>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<Profile[]>([]);
    
    const { isToggleUp, toggle } = useToggle();

    const searchedProfiles = useAppSelector(searchProfilesSelector);
    const report = useAppSelector(reportDetailsSelector);
    const currentProfile = useAppSelector(currentProfileSelector);
    const currentTripParties = useAppSelector(tripParticipationsSelector);
    const trip = useAppSelector(tripDetailsSelector);
    const images = useAppSelector(mediaSelector);
    const currentTrip = useAppSelector(currentTripSelector);
    const isAuth = useAppSelector(isAuthenticatedSelector);

    useEffect(() => {
        dispatch(getTripById(tripId));
        dispatch(getParticipationsByTripId(tripId));
        dispatch(getMediaByTripId(tripId));
        dispatch(getReportByTripId(tripId));
    }, []);

    useEffect(() => {
        if (trip) {
            setNewTrip({
                destination: trip.destination
            })
        }
    }, [trip]);

    const isEditable = !report?.isPublished && report?.authorId === currentProfile?.id

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

    const handlePublishTrip = () => {
        dispatch(updateReportByTripId(
            trip.id,
            {
                isPublished: true,
                participantsAmount: currentTripParties.length,
                sumExpenses: calculateSumExpenses(report.totalBudget),
                avgExpenses: calculateAvgExpenses(report.totalBudget, currentTripParties.length),
                thumbnailUrl: trip.thumbnailUrl,
                startDate: trip.startDate,
                endDate: trip.endDate,
            }
        ));
    };

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
        <>
            {isEditable && currentProfile && currentProfile.id === report?.authorId &&
                <Button
                    onClick={handlePublishTrip}
                    className={cls.publishReportButton}
                    theme={ButtonTheme.BASIC}
                >
                    Опубликовать отчет
                </Button>
            }
            {report?.isPublished && !currentTrip && isAuth &&
                <>
                    <Button
                        onClick={toggle}
                        className={cls.copyTripButton}
                        theme={ButtonTheme.BASIC}
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
            <section className={cls.secondRow}>
                <Report
                    isEditable={isEditable}
                    heading="Отчет по путешествию"
                />
            </section>
            <section className={cls.thirdRow}>
                <ImageGallery
                    title='Медиа'
                    onImageAdd={isEditable ? handleAddImage : undefined}
                    images={images}
                />
            </section>
        </>
    )
}

export default ReportPage;
