import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonTheme } from './Button'
import { ThemeDecorator } from 'shared/config/storyBook/ThemeDecorator'
import { Themes } from 'app/providers/themeProvider'

const meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: 'Text'
    }
}

export const Basic: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.BASIC
    }
}

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR
    }
}

export const Outline: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE
    }
}

export const OutlineDark: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE
    }
}
OutlineDark.decorators = [ThemeDecorator(Themes.DARK)]
