import type { Meta, StoryObj } from '@storybook/react'
import { AppLink, AppLinkTheme } from './AppLink'
import { RouterDecorator } from 'shared/config/storyBook/RouterDecorator'
import { ThemeDecorator } from 'shared/config/storyBook/ThemeDecorator'
import { Themes } from 'app/providers/themeProvider'

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
        layout: 'centered'
    },
    args: {
        to: '/route',
        children: 'AppLink'
    },
    tags: ['autodocs']
} satisfies Meta<typeof AppLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        theme: AppLinkTheme.PRIMARY
    }
}
Primary.decorators = [RouterDecorator]

export const Secondary: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY
    }
}
Secondary.decorators = [RouterDecorator]

export const PrimaryDark: Story = {
    args: {
        theme: AppLinkTheme.PRIMARY
    }
}
PrimaryDark.decorators = [RouterDecorator, ThemeDecorator(Themes.DARK)]

export const SecondaryDark: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY
    }
}
SecondaryDark.decorators = [RouterDecorator, ThemeDecorator(Themes.DARK)]
