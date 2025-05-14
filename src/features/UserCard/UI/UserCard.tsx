import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserCard.module.scss';
import { Typography } from 'shared/UI/Typography/Typography';
import { Icon } from 'shared/UI/Icon/Icon';
import IonPerson from 'shared/assets/IonPerson.svg';

interface UserCardProps {
    className?: string;
    userName: string;
    avatarUrl?: string;
}

export const UserCard = ({ className, userName, avatarUrl }: UserCardProps) => {
    return (
        <div className={classNames(cls.userCard, {}, [className])}>
            <div className={cls.avatar}>
                {avatarUrl ? (
                    <img src={avatarUrl} alt={userName} className={cls.avatarImage} />
                ) : (
                    <Icon Svg={IonPerson} size={15} />
                )}
            </div>
            <Typography variant='span' size='s'>
                {userName}
            </Typography>
        </div>
    );
};