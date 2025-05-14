import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'
import { ThemeDecorator } from 'shared/config/storyBook/ThemeDecorator'
import { Themes } from 'app/providers/themeProvider'

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}

export const Dark: Story = {}
Dark.decorators = [ThemeDecorator(Themes.DARK)]
