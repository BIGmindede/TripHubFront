import { classNames } from 'shared/lib/classNames/classNames'
import cls from './WidgetWrapper.module.scss'
import { HTMLAttributes, ReactNode } from 'react';
import { Typography } from 'shared/UI/Typography/Typography';

interface WidgetWrapperProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    heading?: string;
    children: ReactNode;
};

export const WidgetWrapper = ({ className, heading, children }: WidgetWrapperProps) => {
    return (
        <article className={classNames(cls.widgetWrapper, {}, [className])}>
            {heading && <Typography size={'m'} variant={"heading"}>{heading}</Typography>}
            {children}
        </article>
    );
};

export enum WidgetWrapperSectorTheme {
    BASIC = 'basic',
    CLEAR = 'clear'
}

interface WidgetWrapperSectorProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    heading?: string;
    children: ReactNode;
    theme?: WidgetWrapperSectorTheme;
}

WidgetWrapper.Sector = ({ className, heading, children, theme = WidgetWrapperSectorTheme.BASIC }: WidgetWrapperSectorProps) => {
    return (
        <div className={classNames(cls.sector, {[cls[theme]]: theme}, [className])}>
            {heading && <Typography size='s' variant='heading'>{heading}</Typography>}
            {children}
        </div>
    )
};

export const Sector = WidgetWrapper.Sector;