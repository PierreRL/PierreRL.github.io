import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Model } from './model'
import { CursorCloud } from './cursor_cloud'

const modelCanvas = document.getElementById('model-canvas') as HTMLCanvasElement
const modelRenderer = new THREE.WebGLRenderer({ canvas: modelCanvas, alpha: true })
const cloudRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cloud-canvas') as HTMLCanvasElement, alpha: true })

const ratio = setUpRenderer(modelRenderer)
setUpRenderer(cloudRenderer)

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

const cursorCloudScene = new THREE.Scene()
const cursorCamera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000)
cursorCamera.position.z = (1 / ratio) * (31 / 24)

const model = new Model('Mandalorian.obj', 1.7, scene, true)
const cursor_cloud = new CursorCloud(cursorCloudScene)
const clock = new THREE.Clock(true)


function animate() {
    const delta = clock.getDelta()
    cursor_cloud.udpate()
    model.update(delta)
    controls.update()
    modelRenderer.clear()
    cloudRenderer.clear()
    modelRenderer.render(scene, camera)
    cloudRenderer.render(cursorCloudScene, cursorCamera)
    requestAnimationFrame(animate)
}

function onResize() {
    const ratio = setUpRenderer(modelRenderer)
    setUpRenderer(cloudRenderer)
    cursorCamera.aspect = ratio
    cursorCamera.position.z = (1 / ratio) * (31 / 24)
    cursorCamera.updateProjectionMatrix()
    camera.aspect = ratio
    camera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize, false)

function setUpRenderer(renderer: THREE.WebGLRenderer): number {
    renderer.autoClear = false
    renderer.setSize(document.body.clientWidth, document.body.clientHeight)
    return document.body.clientWidth / document.body.clientHeight
}

export function start() {
    animate()
}