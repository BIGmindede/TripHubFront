import { WidgetWrapper } from 'features/WidgetWrapper/WidgetWrapper'
import { Typography } from 'shared/UI/Typography/Typography'
import cls from './CreateTripInvitation.module.scss'
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useState } from 'react';
import { useToggle } from 'shared/hooks/useToggle';
import { CreateTripModal } from './CreateTripModal/CreateTripModal';

interface CreateTripInvitationProps {

};

export const CreateTripInvitation = ({} : CreateTripInvitationProps) => {
    const { isToggleUp, toggle } = useToggle(false);

    return (
        <WidgetWrapper className={cls.createTripInvitation} heading='Начните свое путешествие'>
            <Typography variant='paragraph' size='m'>
                Добавьте новое путешествие,
                чтобы спланировать маршрут,
                отметить важные места и рассчитать бюджет!
            </Typography>
            <Button
                className={cls.startTripButton}
                theme={ButtonTheme.BASIC}
                onClick={toggle}
            >
                Поехали!
            </Button>
            {isToggleUp &&
                <CreateTripModal isOpen={isToggleUp} onClose={toggle}/>
            }
        </WidgetWrapper>
    );
};