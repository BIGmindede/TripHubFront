import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Typography.module.scss'
import { TypographyColor, TypographySize, TypographyVariant } from './Typography.types';
import { ReactNode } from 'react';

interface TypographyProps {
    size: TypographySize;
    variant: TypographyVariant;
    children: ReactNode;
    color?: TypographyColor;
    className?: string;
}

const variantToTag = {
    span: 'span',
    superspan: 'span',
    paragraph: 'p',
    bold: 'b',
    heading: {
        l: 'h1',
        m: 'h2',
        s: 'h3',
        xl: 'h1',
    },
} as const;

export const Typography = ({ size, variant, children, color = 'accent', className }: TypographyProps) => {
    const Tag = variant === 'heading'
        ? variantToTag.heading[size]
        : variantToTag[variant];

    return (
        <Tag
            className={classNames(cls.typography, {
                [cls[variant]]: variant,
                [cls[size]]: size,
                [cls[color]]: color
            }, [className])}
        >
            {children}
        </Tag>
    );
};