import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import type { ButtonHTMLAttributes, FC, ReactNode, RefObject } from 'react'
import { forwardRef } from 'react'
import { Typography } from '../Typography/Typography';
import { useBreakpointDown } from 'shared/hooks/useBreakpoint';

export enum ButtonTheme {
    BASIC = 'basic',
    ROUND = 'round',
    CLEAR = 'clear',
    OUTLINE = 'outline',
    RED = 'red',
    IN_TEXT = 'inText'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: string;
    children?: ReactNode;
    icon?: ReactNode;
    ref?: RefObject<HTMLButtonElement>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = forwardRef(({ className, theme, children, icon, onClick, ...otherProps }: ButtonProps, ref: RefObject<HTMLButtonElement>) => {
    const isMobile = useBreakpointDown('mobile');

    return (
        <button
            type='button'
            ref={ref}
            className={classNames(cls.button, {}, [className, cls[theme]])}
            {...otherProps}
            onClick={onClick}
        >
            {icon && icon}
            {children &&
                (theme === ButtonTheme.IN_TEXT 
                    ? <Typography
                        size={isMobile ? 's' : 'm'}
                        variant={'span'}
                        color='pale'
                        className={cls.inTextText}
                    >
                        {children}
                    </Typography>
                    : <Typography
                        size={isMobile ? 's' : 'm'}
                        variant={'superspan'}
                        className={cls.buttonText}
                    >
                        {children}
                    </Typography>
                )
            }
        </button>
    );
});
