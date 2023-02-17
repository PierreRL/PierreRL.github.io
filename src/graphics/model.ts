import * as THREE from 'three'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../assets/objects/Mandalorian.obj';

export class Model {

    private mesh: THREE.Mesh = new THREE.Mesh()
    private points: THREE.Points = new THREE.Points()
    private minHue = 0.6
    private hue: number = this.minHue
    private maxHue = 0.9
    private colorDirection: number = 1
    private saturation = 0.5
    private lightness = 0.1
    private color = new THREE.Color().setHSL(this.hue, this.saturation, this.lightness)
    private material = new THREE.PointsMaterial({ color: this.color, blending: THREE.AdditiveBlending, size: 1, sizeAttenuation: false })
    private solidMaterial = new THREE.MeshBasicMaterial({ color: this.color, blending: THREE.AdditiveBlending })
    private loadingText = document.getElementById('percent-loaded-label')

    constructor(private readonly fileName: string, private readonly scale: number = 1, private scene: THREE.Scene, private readonly isPoints = true,
        private rotateX: number, private rotateY: number, private rotateZ: number) {
        const gltfLoader = new GLTFLoader()
        const fileExtension = this.fileName.slice(this.fileName.indexOf('.') + 1)
        if (fileExtension == 'obj') {
            const objloader = new OBJLoader()
            objloader.load(
                '../assets/objects/' + this.fileName,
                this.addObj.bind(this),
                (xhr) => {
                    this.loading(xhr.loaded / xhr.total)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        else if (fileExtension == 'gltf') {
            gltfLoader.load(
                this.fileName,
                this.addGLTF.bind(this),
                (xhr) => {
                    this.loading(xhr.loaded / xhr.total)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        else {
            throw new Error("File extension not found: " + fileExtension)
        }
    }

    update(delta: number) {
        if (this.hue > this.maxHue) {
            this.colorDirection = - 1
        }
        if (this.hue < this.minHue) {
            this.colorDirection = 1
        }
        this.hue += delta / 10 * this.colorDirection
        this.color.setHSL(this.hue, this.saturation, this.lightness)
        if (this.isPoints) {
            this.points.material = new THREE.PointsMaterial({ color: this.color, blending: THREE.AdditiveBlending, size: 1, sizeAttenuation: false })
        }
        else {
            this.mesh.material = new THREE.MeshBasicMaterial({ color: this.color, blending: THREE.AdditiveBlending })
        }
    }

    private loading(percentage: number) {
        if (this.loadingText == undefined) return
        if (percentage == 1) this.loadingText.style.display = 'none'
        this.loadingText.innerHTML = 'Loading model: ' + Math.trunc(percentage * 100) + '%'
    }

    private addGLTF(gltf: GLTF) {
        this.addObj(gltf.scene)
    }

    private addObj(obj: THREE.Object3D) {
        const geometries: THREE.BufferGeometry[] = []
        obj.traverse((child) => {
            const mesh = child as THREE.Mesh
            if (!mesh.isMesh) return
            let geom = mesh.geometry
            geometries.push(geom)
        })
        const geom = BufferGeometryUtils.mergeBufferGeometries(geometries)
        geom.computeBoundingBox()
        if (geom.boundingBox == null) {
            throw new Error("Could not calculate bounding box")
        }
        const box = geom.boundingBox.max
        const maxBox = Math.max(box.x, box.y, box.z)
        geom.center()
        geom.rotateX(this.rotateX)
        geom.rotateY(this.rotateY)
        geom.rotateZ(this.rotateZ)
        geom.scale(this.scale / maxBox, this.scale / maxBox, this.scale / maxBox)
        if (this.isPoints) {
            this.points = new THREE.Points(geom, this.material)
            this.scene.add(this.points)
            return
        }
        else {
            this.mesh = new THREE.Mesh(geom, this.solidMaterial)
            this.scene.add(this.mesh)
        }
    }
}

