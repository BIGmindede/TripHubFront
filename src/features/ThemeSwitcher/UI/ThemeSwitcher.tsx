import { classNames } from 'shared/lib/classNames/classNames'
import { Themes, useTheme } from 'app/providers/themeProvider'
import { Button, ButtonTheme } from 'shared/UI/Button/Button'
import LightIcon from 'shared/assets/IonSun.svg'
import DarkIcon from 'shared/assets/IonMoon.svg'
import cls from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, handleThemeBtn } = useTheme()
    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.themeswitcher, {}, [className])}
            onClick={handleThemeBtn}
        >
            {
                theme === Themes.LIGHT
                    ? <LightIcon />
                    : <DarkIcon />
            }
        </Button>
    )
}
