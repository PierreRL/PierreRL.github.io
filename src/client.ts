import './assets/styles/styles.scss'
import { start } from './graphics/three-manager'
import { setUpStartAnimations } from './graphics/startup-animations'

setup()

function setup() {
    setUpStartAnimations()
    start()
}
