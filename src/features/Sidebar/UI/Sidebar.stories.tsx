import type { Meta, StoryObj } from '@storybook/react'
import { Themes } from 'app/providers/themeProvider'
import { ThemeDecorator } from 'shared/config/storyBook/ThemeDecorator'
import Sidebar from './Sidebar'
import { navLinks } from 'shared/config/routeConfig/routeConfig'
import { RouterDecorator } from 'shared/config/storyBook/RouterDecorator'

const meta = {
    title: 'features/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    decorators: [RouterDecorator]
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {
        navLinks: navLinks,
        state: false
    }
}

export const LightCollapsed: Story = {
    args: {
        navLinks: navLinks,
        state: true
    }
}

export const Dark: Story = {
    args: {
        navLinks: navLinks,
        state: false
    }
}
Dark.decorators = [ThemeDecorator(Themes.DARK)]

export const DarkCollapsed: Story = {
    args: {
        navLinks: navLinks,
        state: true
    }
}
DarkCollapsed.decorators = [ThemeDecorator(Themes.DARK)]
