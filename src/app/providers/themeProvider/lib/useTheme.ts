import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from './ThemeContext'

interface useThemeRes {
    theme: Themes
    handleThemeBtn: () => void
}

export function useTheme(): useThemeRes {
    const { appTheme, setAppTheme } = useContext(ThemeContext)

    const handleThemeBtn = () => {
        const newTheme = appTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
        setAppTheme(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return { theme: appTheme, handleThemeBtn }
}
