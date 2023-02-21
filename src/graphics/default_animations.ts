import { setUpNavAnimation } from "./navbar-animation"
import { ScrollTracker } from "./scrollManager"
import './cursor_cloud'
import './blur-animations'

setUp()

function setUp() {
    const scrollTracker = new ScrollTracker()
    setUpNavAnimation(scrollTracker)
}