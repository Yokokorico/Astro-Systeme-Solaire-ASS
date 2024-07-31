import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    cubemap: THREE.Mesh
  }
  materials: {
    None: THREE.MeshStandardMaterial
  }
}

interface PlanetProps extends GroupProps {
  name: string;
}

export function Planet({ name, ...props }: PlanetProps) {
  const { nodes, materials } = useGLTF(`/${name}.glb`) as GLTFResult
  useGLTF.preload(`/${name}.glb`)
  return (
    <group {...props} dispose={null}>
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

