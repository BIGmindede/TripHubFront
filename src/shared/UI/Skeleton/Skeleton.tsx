import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
    className?: string
}
export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div className={classNames(cls.skeleton, {}, [className])} />
    )
}
