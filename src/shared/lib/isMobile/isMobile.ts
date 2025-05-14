export const isMobile= () => {
    let isMobile = window.matchMedia
    if(isMobile) {
        let match_mobile = isMobile("(pointer:coarse) and (device-width <= 600px)")
        return match_mobile.matches
    }
    return false
}