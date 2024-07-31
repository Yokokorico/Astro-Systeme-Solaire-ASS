import { useEffect } from 'react';
import * as THREE from 'three';

function Cube() {
let cube = new THREE.Mesh();
  useEffect(() =>{
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
    })

    return cube;
}

export default Cube