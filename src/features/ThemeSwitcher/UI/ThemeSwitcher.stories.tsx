import type { Meta, StoryObj } from '@storybook/react'
import { Themes } from 'app/providers/themeProvider'
import { ThemeDecorator } from 'shared/config/storyBook/ThemeDecorator'
import { ThemeSwitcher } from './ThemeSwitcher'

const meta = {
    title: 'widgets/ThemeSwitcher',
    component: ThemeSwitcher,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}

export const Dark: Story = {}
Dark.decorators = [ThemeDecorator(Themes.DARK)]
