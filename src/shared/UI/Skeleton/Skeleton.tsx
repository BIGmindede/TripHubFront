import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Skeleton.module.scss'
import React, { ReactNode } from 'react';

interface SkeletonProps {
    className?: string;
    children?: ReactNode;
}
export const Skeleton = ({ className, children }: SkeletonProps) => {
    return (
        <div className={classNames(cls.skeleton, {}, [className])}>
            {children}
        </div>
    )
}
