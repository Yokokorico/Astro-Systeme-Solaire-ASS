import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export interface AstroPlanetProps {
  name: string;
  radius: number;
  widthSegments: number;
  heightSegments: number;
  texture: string;
  sideralOrbit?: number;
  distance?: number;
  rotationSpeed?: number;
  speedMultiplier?: number;
  timeDilation?: number;
  axialTilt?: number;
  inclination?: number;
  eccentricity?: number; // Ajout de la propriété d'excentricité
  hasRing?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringTexture?: string;
}

function AstroPlanet({
  name,
  radius,
  widthSegments,
  heightSegments,
  texture,
  sideralOrbit = 0,
  distance = 0,
  rotationSpeed = 0,
  speedMultiplier = 1,
  timeDilation = 1,
  axialTilt = 0,
  inclination = 0,
  eccentricity = 0, // Réception de l'excentricité
  hasRing,
  ringInnerRadius = radius * 1.1,
  ringOuterRadius = radius * 1.8,
  ringTexture
}: AstroPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const axialTiltGroupRef = useRef<THREE.Group>(null);
  const textureMap = useTexture(`/${texture}`);
  let ringTextureMap;

  if (hasRing && ringTexture) {
    ringTextureMap = useTexture(`/${ringTexture}`);
  }

  useEffect(() => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.set(0, 0, 0);
      orbitGroupRef.current.rotation.x = THREE.MathUtils.degToRad(inclination);
    }
  }, [inclination]);

  useEffect(() => {
    if (planetGroupRef.current) {
      planetGroupRef.current.rotation.z = THREE.MathUtils.degToRad(axialTilt);
    }
  }, [axialTilt]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const adjustedOrbitSpeed = sideralOrbit * speedMultiplier * timeDilation;
    const adjustedRotationSpeed = rotationSpeed * speedMultiplier * timeDilation;

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += adjustedOrbitSpeed;
    }

    if (meshRef.current) {
      if (name === 'venus') {
        meshRef.current.rotation.y -= adjustedRotationSpeed * -30;
      } else {
    if (ringMeshRef.current) {
      ringMeshRef.current.rotation.z += adjustedRotationSpeed;
    }
  }

    // Calcul du temps pour l'orbite
    const orbitTime = elapsedTime * adjustedOrbitSpeed;
    
    // Calcul de l'orbite elliptique
    const semiMajorAxis = distance || 1;
    const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
    const x = Math.cos(orbitTime) * semiMajorAxis;
    const z = Math.sin(orbitTime) * semiMinorAxis;

    if (planetGroupRef.current) {
      planetGroupRef.current.position.set(x, 0, z);
    }
  }});


  useEffect(() => {
    if (ringMeshRef.current) {
      const geometry = ringMeshRef.current.geometry;
      const pos = geometry.attributes.position;
      const uv = geometry.attributes.uv;
      const v3 = new THREE.Vector3();

      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        const u = (v3.length() - ringInnerRadius) / (ringOuterRadius - ringInnerRadius);
        uv.setXY(i, THREE.MathUtils.clamp(u, 0.1, 0.9), 1);
      }

      uv.needsUpdate = true;
    }
  }, [ringInnerRadius, ringOuterRadius, ringTexture]);

  return (
    <group ref={orbitGroupRef}>

    <group ref={groupRef}>
      {distance !== undefined && (
        <group ref={axialTiltGroupRef} position={[distance, 0, 0]}>
          <mesh ref={meshRef} name={name} castShadow receiveShadow>
            <sphereGeometry args={[radius, widthSegments, heightSegments]} />
            <meshStandardMaterial map={textureMap} lightMap={textureMap} lightMapIntensity={name === 'soleil' ? 25 : 0}/>
          </mesh>
          {name === 'terre' && (
            <mesh name={'terre_nuages'} castShadow receiveShadow>
              <sphereGeometry args={[radius + .01, widthSegments, heightSegments]} />
              <meshStandardMaterial map={useTexture('/earth-clouds.png')} transparent={true} opacity={.8}/>
            </mesh>
          )}
          {hasRing && ringTextureMap && (
            <mesh
              ref={ringMeshRef}
              position={[0, 0, 0]}
              rotation={[-0.5 * Math.PI, 0, 0]}
              castShadow
              receiveShadow
            >
              <ringGeometry args={[ringInnerRadius, ringOuterRadius, 512]} />
              <meshStandardMaterial
                map={ringTextureMap}
                side={THREE.DoubleSide}
                transparent
                opacity={0.7} // Adjust for better lighting effect
              />
            </mesh>
          )}
        </group>
      )}
      </group>
    </group>
  );
}

export default AstroPlanet;
