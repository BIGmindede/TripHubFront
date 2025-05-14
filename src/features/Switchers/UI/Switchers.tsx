import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Switchers.module.scss'
import { ThemeSwitcher } from 'features/ThemeSwitcher'

interface SwitchersProps {
    className?: string
}
export const Switchers = ({ className }: SwitchersProps) => {
    return (
        <div className={classNames(cls.switchers, {}, [className])}>
            <ThemeSwitcher />
        </div>
    )
}
