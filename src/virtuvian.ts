import THREE, { BufferGeometry } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Vitruvian {

    constructor(scene: THREE.Scene) {
        const loader = new STLLoader()
        const material = new THREE.PointsMaterial({ color: 0x060606, blending: THREE.AdditiveBlending, size: 1.1, sizeAttenuation: false });
        loader.load(
            'Vitruvian.stl',
            function (geom: BufferGeometry) {
                geom.center()
                const points = new THREE.Points(geom, material)
                scene.add(points)
            },
            (xhr) => {
                //console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )

    }
}

