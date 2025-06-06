import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import cls from './Slider.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/UI/Icon/Icon';
import IconChevronLeft from 'shared/assets/IonChevronLeft.svg';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const PrevButton = ({ onClick, disabled }: ButtonProps) => (
  <Button
    theme={ButtonTheme.CLEAR}
    className={classNames(cls.carouselButton, {}, [cls. carouselButtonPrev])}
    onClick={onClick}
    disabled={disabled}
    icon={<Icon Svg={IconChevronLeft} size={15}/>}
  />
);

export const NextButton = ({ onClick, disabled }: ButtonProps) => (
  <Button
    theme={ButtonTheme.CLEAR}
    className={classNames(cls.carouselButton, {}, [cls. carouselButtonNext])}
    onClick={onClick}
    disabled={disabled}
    icon={<Icon Svg={IconChevronLeft} size={15}/>}
  />
);

export const DotButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => (
  <Button
    theme={ButtonTheme.CLEAR}
    className={classNames(cls.carouselButton, {[cls.dotSelected]: selected}, [cls.carouselDot])}
    onClick={onClick}
  />
);