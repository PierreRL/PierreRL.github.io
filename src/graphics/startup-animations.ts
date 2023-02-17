import { setUpNavAnimation } from "./navbar-animation"
import { ScrollTracker } from "./scrollManager"
import { TypeWriter } from './typewriter'


const scrollTracker = new ScrollTracker()
export function setUpStartAnimations() {
    window.onload = startTyping
    setUpNavAnimation(scrollTracker)
    const blurElements = document.querySelectorAll('.blur')
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('blur-in')
            else entry.target.classList.remove('blur-in')
        })
    })
    blurElements.forEach((el) => observer.observe(el))
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
    const paragraphText = '- 19 year old from Scotland \\\\- 2nd year Maths and CompSci at the University of Edinburgh\\\\- English🇬🇧, French🇫🇷 (y un poco de español🇪🇸)'

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

// function pageScrollAndNav() {
//     const nav = document.querySelector('nav') as HTMLElement
//     console.log(nav.clientHeight)
//     scrollTracker.scrollBy(window.innerHeight + nav.clientHeight)
// }

function pageScroll() {
    // Added 10 pixels as blurring in does not occur if the page is only just not loaded.
    scrollTracker.scrollBy(window.innerHeight + 10)
}




