import * as THREE from 'three';
import { useMemo } from 'react';

interface OrbitLineProps {
  semiMajorAxis: number;
  orbitCenter: THREE.Vector3;
  lineOpacity: number;
  inclination?: number;
  eccentricity?: number;
}

export function OrbitLine({ semiMajorAxis, orbitCenter, lineOpacity, inclination = 0, eccentricity = 0 }: OrbitLineProps) {

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 100;
    const angleStep = (Math.PI * 2) / segments;

    const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);

    for (let i = 0; i <= segments; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * semiMajorAxis;
      const z = Math.sin(angle) * semiMinorAxis;
      pts.push(new THREE.Vector3(x, 0, z).add(orbitCenter));
    }

    return pts;
  }, [semiMajorAxis, orbitCenter, eccentricity]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(THREE.MathUtils.degToRad(inclination)));
    return geometry;
  }, [points, inclination]);

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
