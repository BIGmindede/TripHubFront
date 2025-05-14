import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ToggleLabel.module.scss'
import IonPlus from 'shared/assets/IonPlus.svg'
import { Typography } from '../Typography/Typography'
import { Icon } from '../Icon/Icon'
import { useToggle } from 'shared/hooks/useToggle'
import { ReactNode } from 'react'

interface ToggleLabelProps {
    className?: string;
    children?: string | ReactNode;
    action: () => void;
    initialState?: boolean;
    disabled?: boolean;
};

export const ToggleLabel = ({
    className,
    children,
    action,
    initialState = false,
    disabled = false
}: ToggleLabelProps) => {
    const {isToggleUp, toggle} = useToggle(disabled ? false : initialState);

    const handleClick = () => {
        if (!disabled) {
            action();
            toggle();
        }
    };

    return (
        <div role='button' onClick={handleClick} className={classNames(cls.toggleLabel, {[cls.toggledUp]: isToggleUp}, [className])}>
            <Typography className={cls.toggleLabelText} variant='span' size='m'>{children}</Typography>
            {isToggleUp && <Icon Svg={IonPlus} size={20} style={{transform: "rotate(45deg)"}}></Icon>}
        </div>
    );
};
