import { ScrollTracker } from "src/graphics/scrollManager"
import { TypeWriter } from 'src/graphics/typewriter'


const scrollTracker = new ScrollTracker()
export function setUpStartAnimations() {
    window.onload = startTyping
    const buttonElements = document.querySelectorAll('.continue-scroll')
    buttonElements.forEach((button) => {
        const btn = button as HTMLButtonElement
        btn.onclick = pageScroll
    })
}

const delay = 200

function startTyping() {
    const title = document.getElementById('title') as HTMLElement
    const titleText = 'Meet Me...'

    const paragraph = document.getElementById('paragraph') as HTMLElement
    const paragraphText = '- 19 year old from Scotland \\\\- 2nd year Maths and CompSci at the University of Edinburgh\\\\- Native English🇬🇧 and French🇫🇷 speaker'

    const paraTyper = new TypeWriter(paragraph, paragraphText, 40, delay, 10, true, () => setTimeout(makeButtonVisible, delay))
    const titleTyper = new TypeWriter(title, titleText, 100, 0, 0, false, paraTyper.start.bind(paraTyper))
    titleTyper.start()
}

function makeButtonVisible() {
    const button = document.getElementById('continue-scroll-nav') as HTMLElement
    button.style.visibility = 'visible'
    button.style.opacity = '1'
    button.addEventListener('click', pageScroll)
}

function pageScroll() {
    // Added 10 pixels as blurring in does not occur if the page is only just not loaded.
    scrollTracker.scrollBy(window.innerHeight + 10)
}




