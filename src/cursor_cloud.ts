import * as THREE from 'three'

export class CursorCloud {

    private driftSpeeds: THREE.Vector3[] = []

    private readonly maxSpeed = 0.0008
    private _isVisible = false
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
            this.isVisible = true
            this.tx = ((e.clientX) / window.innerWidth) * 2 - 1;
            this.ty = - ((e.clientY) / window.innerHeight) * 2 + 1;
        })
        document.addEventListener('mouseleave', () => { console.log('hello'); this.isVisible = false })
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


