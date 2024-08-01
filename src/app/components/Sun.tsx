import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps, useFrame } from '@react-three/fiber'
import { angularSpeed } from '../utils/Conversion'

type GLTFResult = GLTF & {
  nodes: {
    cubemap: THREE.Mesh
  }
  materials: {
    None: THREE.MeshStandardMaterial
  }
}

export function Sun() {
  const { nodes, materials } = useGLTF(`/soleil.glb`) as GLTFResult
  useGLTF.preload(`/soleil.glb`)

  return (
    <group dispose={null}>
      <group name="Scene" >
        <mesh
          name="cubemap"
          castShadow
          receiveShadow
          geometry={nodes.cubemap.geometry}
          material={materials.None}
        />
      </group>
    </group>
  )
}
