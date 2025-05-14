import { UserCard } from 'features/UserCard';
import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper'
import { useEffect } from 'react'
import { getProfilesByIds } from 'shared/config/store/actionCreators/profilesActions';
import { deleteParticipations } from 'shared/config/store/actionCreators/tripActions';
import { selectProfile, selectProfiles } from 'shared/config/store/selectors/profileSelectors';
import { tripDetailsSelector, tripParticipationsSelector } from 'shared/config/store/selectors/tripSelectors'
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { ToggleLabel } from 'shared/UI/ToggleLabel/ToggleLabel';
import cls from './TripParties.module.scss'
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { AddPartiesModal } from './AddPartiesModal/AddPartiesModal';
import { useToggle } from 'shared/hooks/useToggle';

export const TripParties = () => {
    const dispatch = useAppDispatch();

    const currentTrip = useAppSelector(tripDetailsSelector);
    const participants = useAppSelector(tripParticipationsSelector);
    const partiesProfiles = useAppSelector(selectProfiles);
    const currentProfile = useAppSelector(selectProfile);

    const {isToggleUp, toggle} = useToggle();

    useEffect(() => {
        if (participants.length > 0) {
            dispatch(getProfilesByIds(participants.map(p => p.profileId)))
        }
    }, [participants]);

    const handleDeleteParticipant = (profileId: string) => {
        const participantId = participants.find(p => p.profileId === profileId).id;
        dispatch(deleteParticipations(participantId))
    }

    return (
        <WidgetWrapper heading="Участники" className={cls.tripParties}>
            {currentProfile && currentTrip?.authorId === currentProfile.id
                ? partiesProfiles.map(profile =>
                    <ToggleLabel
                        disabled={profile.id === currentProfile.id}
                        initialState={profile.id !== currentProfile.id}
                        className={cls.tripPartiesProfile}
                        action={() => handleDeleteParticipant(profile.id)}
                    >
                        <UserCard userName={profile.tagName}/>
                    </ToggleLabel>
                )
                : partiesProfiles.map(profile => <UserCard userName={profile.tagName}/>)
            }
            {currentTrip?.authorId === currentProfile.id &&
                <>
                    <div className={cls.addPartiesSubmitButtonWrapper}>
                        <Button
                            theme={ButtonTheme.BASIC}
                            className={cls.addPartiesSubmitButton}
                            onClick={toggle}
                        >
                            Добавить
                        </Button>
                    </div>
                    <AddPartiesModal
                        currentPartiesIds={participants.map(p => p.profileId)}
                        isOpen={isToggleUp}
                        onClose={toggle}
                    />
                </>
            }
        </WidgetWrapper>
    )
}
