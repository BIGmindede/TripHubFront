import { classNames } from 'shared/lib/classNames/classNames'
import cls from './HiddenInput.module.scss'
import { useToggle } from 'shared/hooks/useToggle';
import AcceptIcon from 'shared/assets/IonCheck.svg';
import DeclineIcon from 'shared/assets/IonCrest.svg';
import { HiddenInputSize } from './HiddenInput.types';
import { Button, ButtonTheme } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import EditIcon from 'shared/assets/IonEdit.svg';

interface HiddenInputProps {
    className?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    withButton?: boolean;
    isHeading?: boolean;
    headingSize?: HiddenInputSize;
    onSaveChanges?: () => void;
    onDeclineChanges?: () => void;
    onStartEditClick?: () => void;
};

export const HiddenInput = (props: HiddenInputProps) => {
    const {
        className,
        placeholder,
        value,
        onChange,
        onSaveChanges,
        onDeclineChanges,
        withButton = false,
        isHeading = false,
        headingSize = 'm',
        onStartEditClick,
    } = props;

    const {isToggleUp, toggle} = useToggle();

    const handleStartEdit = () => {
        onStartEditClick?.();
        toggle();
    }

    const handleSave = () => {
        onSaveChanges();
        toggle();
    }

    const handleDecline = () => {
        onDeclineChanges();
        toggle();
    }

    return (
        <div className={cls.hiddenInput}>
            <input
                disabled={withButton ? !isToggleUp : !onChange}
                className={classNames(
                    cls.input,
                    {
                        [cls.hidden]: !isToggleUp,
                        [cls.heading]: isHeading,
                        [cls[headingSize]]: headingSize
                    },
                    [className]
                )}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {onChange(e.target.value)}}
            />
            {withButton && (
                isToggleUp 
                    ? <div className={cls.buttons}>
                        <Button
                            theme={ButtonTheme.ROUND}
                            onClick={handleSave}
                            className={cls.toggleButton}
                            icon={<Icon Svg={AcceptIcon} size={20}/>}
                        />
                        <Button 
                            theme={ButtonTheme.ROUND}
                            onClick={handleDecline}
                            className={cls.toggleButton}
                            icon={<Icon Svg={DeclineIcon} size={20}/>}
                        />
                    </div>
                    : <Button 
                        theme={ButtonTheme.ROUND}
                        onClick={handleStartEdit}
                        className={cls.toggleButton}
                        icon={<Icon Svg={EditIcon} size={15}/>}
                    />
            )}
        </div>
    );
};