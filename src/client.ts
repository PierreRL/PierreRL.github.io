import './assets/styles/style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vitruvian } from './virtuvian';
import { CursorCloud } from './cursor_cloud';

const renderer = new THREE.WebGLRenderer()
renderer.autoClear = false
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)
if (scene == null) {
    throw new Error()
}
controls.autoRotate = true
controls.enableDamping = true
controls.maxDistance = 2.5
controls.minDistance = 1
controls.enableZoom = true

camera.position.y = -1.8

const cursorCloudScene = new THREE.Scene()
const cursorCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
cursorCamera.position.z = (window.innerHeight / window.innerWidth) * (31 / 24)

const vitruvian = new Vitruvian(scene)
const cursor_cloud = new CursorCloud(cursorCloudScene)
function animate() {
    requestAnimationFrame(animate);
    cursor_cloud.udpate()
    controls.update()
    renderer.clear()
    renderer.render(scene, camera)
    renderer.render(cursorCloudScene, cursorCamera)
}

animate()