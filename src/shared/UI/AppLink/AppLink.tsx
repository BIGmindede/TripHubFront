import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'
import { type FC } from 'react'
import { type LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    onClick?: (e: 
        React.MouseEvent<HTMLAnchorElement> 
        | React.TouchEvent<HTMLAnchorElement>
    ) => void;
}

export const AppLink: FC<AppLinkProps> = ({ to, className, children, theme = AppLinkTheme.PRIMARY, onClick }: AppLinkProps) => {
    return (
        <Link to={to} onClick={onClick} className={classNames(cls.applink, {}, [className, cls[theme]])}>
            {children}
        </Link>
    );
};
