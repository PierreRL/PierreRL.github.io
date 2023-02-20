import { ScrollTracker } from "./scrollManager"

export function setUpNavAnimation(scrollTracker: ScrollTracker) {
    window.onscroll = () => onScroll(scrollTracker)
}

const navBarScrollTolerance = 1

function onScroll(scrollTracker: ScrollTracker) {
    const link = document.getElementById('bigger-text') as HTMLElement
    if (scrollTracker.currentScroll > navBarScrollTolerance) link.style.fontSize = '24px'
    else link.style.fontSize = ''
}