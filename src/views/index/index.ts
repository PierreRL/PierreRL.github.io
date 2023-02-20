import { start } from './model-manager'
import { setUpStartAnimations } from './startup-animations'
import 'src/graphics/default_animations'
import './index.scss'

setup()

function setup() {
    setUpStartAnimations()
    start()
}

