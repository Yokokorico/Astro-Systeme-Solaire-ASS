// OrbitLine.tsx
import * as THREE from 'three';
import { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

interface OrbitLineProps {
  semiMajorAxis: number;
  orbitCenter: THREE.Vector3;
  lineOpacity: number;
}

export function OrbitLine({ semiMajorAxis, orbitCenter, lineOpacity }: OrbitLineProps) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 100;
    const angleStep = (Math.PI * 2) / segments;

    for (let i = 0; i <= segments; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * semiMajorAxis;
      const z = Math.sin(angle) * semiMajorAxis;
      pts.push(new THREE.Vector3(x, 0, z).add(orbitCenter));
    }

    return pts;
  }, [semiMajorAxis, orbitCenter]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: 'white',
    opacity: lineOpacity,
    transparent: true
  }), [lineOpacity]);

  return (
    <line>
      <primitive object={geometry} />
      <primitive object={material} />
    </line>
  );
}
