import THREE, { BufferGeometry } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import './assets/objects/Vitruvian.stl';

export class Vitruvian {

    constructor(scene: THREE.Scene) {
        const loader = new STLLoader()
        const material = new THREE.PointsMaterial({ color: 0x090909, blending: THREE.AdditiveBlending, size: 1.1, sizeAttenuation: false });
        loader.load(
            './assets/objects/Vitruvian.stl',
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

