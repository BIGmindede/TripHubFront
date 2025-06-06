import { Form } from 'features/Form';
import { Modal } from 'features/Modal'
import { useRef, useState } from 'react'
import { MODAL_IDS } from 'shared/config/ModalContext/modalIds'
import cls from './AddPartiesModal.module.scss'
import { SearchInput } from 'features/SearchInput';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { UserCard } from 'features/UserCard';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { searchProfilesActions } from 'shared/config/store/reducers/searchProfilesSlice';
import { ToggleLabel } from 'shared/UI/ToggleLabel/ToggleLabel';
import { Typography } from 'shared/UI/Typography/Typography';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { currentTripSelector, tripDetailsSelector } from 'shared/config/store/selectors/tripSelectors';
import { currentProfileSelector, searchProfilesSelector } from 'shared/config/store/selectors/profileSelectors';
import { createCurrentTripParticipations } from 'shared/config/store/actionCreators/tripActions';
import { getSearchProfilesByEmail, getSearchProfilesByName, getSearchProfilesByTagName } from 'shared/config/store/actionCreators/profileActions';

interface CreateTripModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPartiesIds: string[];
}

export const AddPartiesModal = ({isOpen, onClose, currentPartiesIds}: CreateTripModalProps) => {
    const dispatch = useAppDispatch();

    const containerRef = useRef<HTMLDivElement>();
    const currentProfile = useSelector(currentProfileSelector);
    const currentTrip = useSelector(currentTripSelector);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<Profile[]>([]);

    const searchedProfiles = useSelector(searchProfilesSelector);

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

    const handleSubmitAddParties = () => {
        dispatch(createCurrentTripParticipations(
            currentTrip.id,
            {
                participations: selectedParticipants.map(
                    p => ({participantId: p.id, email: p.email })
                ),
                authorTag: currentProfile.tagName
            }
        ))
        onClose();
    }

    const searchedFilteredProfiles = searchedProfiles.filter(profile =>
        !currentPartiesIds.includes(profile.id) &&
        profile.id !== currentProfile.id &&
        selectedParticipants.findIndex(p => p.id === profile.id) === -1
    )

    return (
        <Modal
            title='Создание путешествия'
            className={cls.addPartiesModal}
            modalId={MODAL_IDS.ADD_PARTIES}
            isOpen={isOpen}
            onClose={onClose}
            scrollableElementRef={containerRef}
        >
            <Form
                className={cls.addPartiesForm}
            >
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
            </Form>
            <div className={cls.addPartiesSubmitButtonWrapper}>
                <Button
                    onClick={handleSubmitAddParties}
                    theme={ButtonTheme.BASIC}
                    className={cls.addPartiesSubmitButton}
                >
                    Добавить участников
                </Button>   
            </div>
            
        </Modal>
    )
}
