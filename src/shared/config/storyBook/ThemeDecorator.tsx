import { type StoryFn } from '@storybook/react'
import { type Themes } from 'app/providers/themeProvider'

export const ThemeDecorator = (theme: Themes) => (StoryComponent: StoryFn) => {
    return (
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    )
}
