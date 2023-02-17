import { ScrollTracker } from "./scrollManager"

export function setUpNavAnimation(scrollTracker: ScrollTracker) {
    window.onscroll = () => onScroll(scrollTracker)
}

const navBarScrollTolerance = 10

function onScroll(scrollTracker: ScrollTracker) {
    const link = document.getElementById('bigger-text') as HTMLElement
    if (scrollTracker.currentScroll > navBarScrollTolerance) {
        link.style.fontSize = '42px'
    }
    else {
        const link = document.getElementById('bigger-text') as HTMLElement
        link.style.fontSize = '48px'
    }
}