type ModsType = Record<string, boolean | string>

export function classNames(cls: string, mods: ModsType = {}, additional: string[] = []): string {
    return [
        cls,
        ...Object.keys(mods).filter((mod) => mods[mod]),
        ...additional.filter(Boolean)
    ].join(' ')
}
