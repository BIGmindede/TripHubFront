import { useState } from "react"

export const useToggle = (initial: boolean = false) => {
    const [isToggleUp, setIsOpen] = useState<boolean>(initial);
    return {isToggleUp, toggle: () => setIsOpen(state => !state)};
}