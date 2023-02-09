import './style.scss'
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
controls.enablePan = true
controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
}

camera.position.y = -1.8

const scene2 = new THREE.Scene()
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera2.position.z = 0.96;

const vitruvian = new Vitruvian(scene)
const cursor_cloud = new CursorCloud(scene2)
function animate() {
    requestAnimationFrame(animate);
    cursor_cloud.udpate()
    controls.update()
    renderer.clear()
    renderer.render(scene, camera)
    renderer.render(scene2, camera2)
};


animate();