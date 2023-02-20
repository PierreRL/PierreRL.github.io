import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Model } from 'src/graphics/model'


const modelCanvas = document.getElementById('model-canvas') as HTMLCanvasElement
const modelRenderer = new THREE.WebGLRenderer({ canvas: modelCanvas, alpha: true })


const ratio = setUpRenderer(modelRenderer)
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000)
const controls = new OrbitControls(camera, modelRenderer.domElement /*document.getElementById('main') as HTMLElement*/)
if (scene == null) {
    throw new Error()
}
controls.autoRotate = true
controls.enableDamping = true
controls.maxDistance = 2.5
controls.minDistance = 1
controls.enableZoom = false

camera.position.z = 10
camera.lookAt(new THREE.Vector3(0, 0, 0))



const model = new Model('dog.obj', 1.7, scene, true, Math.PI / 2, -Math.PI, Math.PI)

const clock = new THREE.Clock(true)


function animate() {
    const delta = clock.getDelta()
    model.update(delta)
    controls.update()
    modelRenderer.clear()
    modelRenderer.render(scene, camera)
    requestAnimationFrame(animate)
}

function onResize() {
    const ratio = setUpRenderer(modelRenderer)
    camera.aspect = ratio
    camera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize, false)

function setUpRenderer(renderer: THREE.WebGLRenderer): number {
    renderer.autoClear = false
    const width = document.body.clientWidth
    renderer.setSize(width, window.innerHeight)
    return width / window.innerHeight
}

export function start() {
    animate()
}