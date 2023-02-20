import { setUpNavAnimation } from "./navbar-animation"
import { ScrollTracker } from "./scrollManager"
import './cursor_cloud'

setUp()

function setUp() {
    const scrollTracker = new ScrollTracker()
    setUpNavAnimation(scrollTracker)
}