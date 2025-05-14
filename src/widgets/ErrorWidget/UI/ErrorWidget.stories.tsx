import type { Meta, StoryObj } from '@storybook/react'
import { ErrorWidget } from './ErrorWidget'

const meta = {
    title: 'widgets/ErrorWidget',
    component: ErrorWidget,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof ErrorWidget>

export default meta
type Story = StoryObj<typeof meta>

export const ErrorPage: Story = {}
