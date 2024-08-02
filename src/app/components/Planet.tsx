import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { GroupProps, useFrame } from '@react-three/fiber';
import { calculateOrbitalSpeed } from '../utils/Conversion';

type GLTFResult = GLTF & {
  nodes: {
    cubemap: THREE.Mesh;
  };
  materials: {
    None: THREE.MeshStandardMaterial;
  };
};

interface PlanetProps extends GroupProps {
  name: string;
  semiMajorAxis: number;
  sideralOrbit: number;
  angularSpeed: number;
  orbitCenter: THREE.Vector3; // Position du centre de l'orbite (le soleil)
}

export function Planet({
  name,
  semiMajorAxis,
  sideralOrbit,
  orbitCenter,
  ...props
}: PlanetProps) {
  const { nodes, materials } = useGLTF(`/${name}.glb`) as GLTFResult;
  const planetRef = useRef<THREE.Group>(null);
  useGLTF.preload(`/${name}.glb`);

  // Calculer la vitesse angulaire
  const speed = sideralOrbit * 100000;
  const time = useRef(0);

  useFrame((state, delta) => {
    if (planetRef.current) {
      // Mise à jour de l'angle de l'orbite
      time.current += delta;
      const angle = time.current * speed;

      // Calcul de la position orbitale
      const x = Math.cos(angle) * semiMajorAxis;
      const z = Math.sin(angle) * semiMajorAxis;
      planetRef.current.position.set(x, 0, z);


      // Mettre à jour la position pour suivre l'orbite autour du centre (Soleil)
      planetRef.current.position.add(orbitCenter);
    }
  });

  return (
    <group ref={planetRef} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="cubemap"
          castShadow
          receiveShadow
          geometry={nodes.cubemap.geometry}
          material={materials.None}
        />
      </group>
    </group>
  );
}
