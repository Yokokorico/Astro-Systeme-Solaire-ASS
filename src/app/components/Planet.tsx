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

interface PlanetProps extends GroupProps {
  name: string;
  angularSpeed: number;
}

export function Planet({ name, angularSpeed, ...props }: PlanetProps) {
  const { nodes, materials } = useGLTF(`/${name}.glb`) as GLTFResult
  const planetRef : any = useRef()
  useGLTF.preload(`/${name}.glb`)

  useEffect( () => {
    console.log(angularSpeed);
  },[]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += angularSpeed;
    }
  });
  return (
    <group ref={planetRef} {...props} dispose={null}>
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

