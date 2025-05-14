import { Meta, StoryObj } from "@storybook/react"
import { ThemeDecorator } from "shared/config/storyBook/ThemeDecorator"
import { Themes } from "app/providers/themeProvider"
import BurgerMenu from "./BurgerMenu"
import { navLinks } from "shared/config/routeConfig/routeConfig"
import { RouterDecorator } from "shared/config/storyBook/RouterDecorator"

const meta = {
    title: 'features/BurgerMenu',
    component: BurgerMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    decorators: [RouterDecorator]
} satisfies Meta<typeof BurgerMenu>

export default meta
type Story = StoryObj<typeof meta>

export const BurgerMenuLight: Story = {
    args: {
        navLinks: navLinks,
        state: false
    }
}

export const BurgerMenuLightCollapsed: Story = {
    args: {
        navLinks: navLinks,
        state: true
    }
}

export const BurgerMenuDark: Story = {
    args: {
        navLinks: navLinks,
        state: false
    }
}
BurgerMenuDark.decorators = [ThemeDecorator(Themes.DARK)]

export const BurgerMenuDarkCollapsed: Story = {
    args: {
        navLinks: navLinks,
        state: true
    }
}
BurgerMenuDarkCollapsed.decorators = [ThemeDecorator(Themes.DARK)]
