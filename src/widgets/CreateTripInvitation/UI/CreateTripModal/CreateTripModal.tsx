import { Form } from 'features/Form';
import { Modal } from 'features/Modal'
import { useRef, useState } from 'react'
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds'
import { Trip } from 'shared/config/store/types/tripSlice.types';
import { Input } from 'shared/UI/Input/Input';
import cls from './CreateTripModal.module.scss'
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { SearchInput } from 'features/SearchInput';
import { getSearchProfilesByTagName, getSearchProfilesByEmail, getSearchProfilesByName } from 'shared/config/store/actionCreators/profilesActions';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectProfile, selectSearchProfiles } from 'shared/config/store/selectors/profileSelectors';
import { Portal } from 'shared/UI/Portal/Portal';
import { UserCard } from 'features/UserCard';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { profile } from 'console';
import { searchProfilesActions } from 'shared/config/store/reducers/searchProfilesSlice';
import { ToggleLabel } from 'shared/UI/ToggleLabel/ToggleLabel';
import { createTrip } from 'shared/config/store/actionCreators/tripActions';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'shared/UI/Typography/Typography';

type newTripKeys = keyof Trip;
type newTripVals = Trip[newTripKeys];

interface CreateTripModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateTripModal = ({isOpen, onClose}: CreateTripModalProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement>();
    const currentProfile = useSelector(selectProfile);

    const [newTrip, setNewTrip] = useState<Trip>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<Profile[]>([]);

    const searchedProfiles = useSelector(selectSearchProfiles);

    const handleSetNewTripData = (key: newTripKeys, value: newTripVals) => {
        setNewTrip({
            ...newTrip,
            [key]: value
        })
    };

    const handleScrollCalendarIntoView = () => {
        setTimeout(() => containerRef.current?.scrollTo({
            behavior: "smooth",
            top: 250
        }), 0)
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

    const handleCreateTripSubmit = () => {
        dispatch(createTrip({
            trip: { ...newTrip, authorId: currentProfile.id },
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
            }
        }));
        navigate("/current");
    }

    const searchedFilteredProfiles = searchedProfiles.filter(profile =>
        profile.id !== currentProfile.id &&
        selectedParticipants.findIndex(p => p.id === profile.id) === -1
    )

    return (
        <Modal
            title='Создание путешествия'
            className={cls.createTripModal}
            modalId={MODAL_IDS.CREATE_TRIP}
            isOpen={isOpen}
            onClose={onClose}
            scrollableElementRef={containerRef}
        >
            <Form
                submitText="Создать"
                className={cls.createTripForm}
                onSubmit={handleCreateTripSubmit}
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
                                Нет найденных участников
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
            </Form>
        </Modal>
    )
}
