import { Meta, StoryObj } from "@storybook/react"
import { ThemeDecorator } from "shared/config/storyBook/ThemeDecorator"
import { Themes } from "app/providers/themeProvider"
import { RouterDecorator } from "shared/config/storyBook/RouterDecorator"
import { Header } from "./Header"

const meta = {
    title: 'widgets/Header',
    component: Header,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    decorators: [RouterDecorator]
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderLight: Story = {
    args: {
        navigationStateSetter: () => {}
    }
}

export const HeaderDark: Story = {
    args: {
        navigationStateSetter: () => {}
    }
}

HeaderDark.decorators = [ThemeDecorator(Themes.DARK)]
