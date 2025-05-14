import { type ReactNode, type PropsWithChildren } from 'react'
import type React from 'react'
import { useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from '../lib/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

interface Props {
    children: ReactNode
}

export const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    const [appTheme, setAppTheme] = useState<Themes>(defaultTheme)

    const defaultProps = useMemo(() => ({
        appTheme,
        setAppTheme
    }), [appTheme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}
