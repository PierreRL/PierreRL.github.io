import * as THREE from 'three'

class CursorCloud {

    private driftSpeeds: THREE.Vector3[] = []

    private readonly maxSpeed = 0.0008
    private _isVisible = false
    private hasTouched = false
    private tx: number = 0
    private ty: number = 0

    private points: THREE.Vector3[] = []
    private geometry: THREE.BufferGeometry
    private pointsMesh: THREE.Points

    private readonly POINTS = 100
    private readonly radius = 0.02
    constructor(scene: THREE.Scene) {
        this.createVertices()
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1, sizeAttenuation: false, blending: THREE.AdditiveBlending })
        this.geometry = new THREE.BufferGeometry()
        this.initControls()
        this.pointsMesh = new THREE.Points(this.geometry, material)
        this.pointsMesh.visible = false
        scene.add(this.pointsMesh)
    }

    private initControls() {
        window.addEventListener('mousemove', (e) => {
            if (this.hasTouched) return
            this.isVisible = true
            this.tx = ((e.clientX) / window.innerWidth) * 2 - 1;
            this.ty = - ((e.clientY) / window.innerHeight) * 2 + 1;
        })
        document.addEventListener('mouseleave', () => { this.isVisible = false })
        window.addEventListener('touchstart', (e) => {
            this.hasTouched = true
        })
    }

    set isVisible(val: boolean) {
        this.pointsMesh.visible = val
        this._isVisible = val
    }
    get isVisible() {
        return this._isVisible
    }

    udpate() {
        this.updateForDrift()
    }

    private updateForDrift() {
        for (var i = 0; i < this.POINTS; i++) {
            const v = this.points[i]
            v.add(this.driftSpeeds[i])
            if (v.length() > this.radius) {
                this.driftSpeeds[i].negate()
            }
        }
        this.updateGeometry()
    }

    private updateGeometry() {
        const arr = []
        for (let i = 0; i < this.POINTS; i++) {
            arr.push(this.points[i].x + this.tx, this.points[i].y + this.ty * window.innerHeight / window.innerWidth, this.points[i].z)
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(arr), 3))
        this.geometry.attributes.position.needsUpdate = true;
    }

    private createVertices() {
        let i = 0
        while (i < this.POINTS) {
            const x = Math.random() * this.radius * 2 - this.radius
            const y = Math.random() * this.radius * 2 - this.radius
            if (Math.sqrt(x ** 2 + y ** 2) < this.radius) {  // only use points inside the unit sphere
                this.driftSpeeds[i] = this.randomVelocity()
                this.points[i] = new THREE.Vector3(x, y, 0)
                i++
            }
        }
    }

    private randomVelocity(): THREE.Vector3 {
        let dx = Math.random() * 2 * this.maxSpeed - this.maxSpeed;
        let dy = Math.random() * 2 * this.maxSpeed - this.maxSpeed;
        return new THREE.Vector3(dx, dy, 0);
    }
}

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cloud-canvas') as HTMLCanvasElement, alpha: true })
const ratio = setUpRenderer(renderer)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000)
camera.position.z = (1 / ratio) * (31 / 24)
const cursor_cloud = new CursorCloud(scene)
animate()

function animate() {
    cursor_cloud.udpate()
    renderer.clear()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

function onResize() {
    const ratio = setUpRenderer(renderer)
    cursor_cloud.udpate()
    camera.aspect = ratio
    camera.position.z = (1 / ratio) * (31 / 24)
    camera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize, false)

function setUpRenderer(renderer: THREE.WebGLRenderer): number {
    renderer.autoClear = false
    const width = window.innerWidth
    renderer.setSize(width, window.innerHeight)
    return width / window.innerHeight
}

