// src/components/Planet.tsx
import * as THREE from 'three';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { GroupProps, useFrame } from '@react-three/fiber';

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
  orbitCenter: THREE.Vector3;
  onPositionUpdate: (name: string, position: THREE.Vector3) => void;
}

const Planet = forwardRef<THREE.Group, PlanetProps>(({
  name,
  semiMajorAxis,
  sideralOrbit,
  orbitCenter,
  onPositionUpdate,
  ...props
}, ref) => {
  const [planetPosition, setPlanetPosition] = useState(new THREE.Vector3());
  const { nodes, materials } = useGLTF(`/${name}.glb`) as GLTFResult;
  const planetRef = useRef<THREE.Group>(null);
  useGLTF.preload(`/${name}.glb`);

  const speed = sideralOrbit * 100000;
  const time = useRef(0);

  useFrame((state, delta) => {
    if (planetRef.current) {
      time.current += delta;
      const angle = time.current * speed;
      const x = Math.cos(angle) * semiMajorAxis;
      const z = Math.sin(angle) * semiMajorAxis;
      const newPosition = new THREE.Vector3(x, 0, z);
      setPlanetPosition(newPosition);
      planetRef.current.position.set(x, 0, z);
      planetRef.current.position.add(orbitCenter);
    }
  });

  useEffect(() => {
    onPositionUpdate(name, planetPosition);
  }, [planetPosition, name, onPositionUpdate]);

  return (
    <group ref={planetRef} {...props} dispose={null}>
      <group ref={ref} name="Scene">
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
});

Planet.displayName = 'Planet';

export default Planet;
