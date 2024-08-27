import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AstroPlanetProps } from "./AstroPlanet";

export interface AstroMoonProps extends AstroPlanetProps {}

function AstroMoon({
  name,
  radius,
  widthSegments,
  heightSegments,
  sideralOrbit = 0,
  distance = 0,
  speedMultiplier = 1,
  timeDilation = 1,
  axialTilt = 0,
  inclination = 0,
  eccentricity = 0,
}: AstroMoonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const axialTiltGroupRef = useRef<THREE.Group>(null);
 

  const randomNames = [
    'ceres', 'eris', 'haumea', 'makemake', 'callisto', 'charon', 'deimos', 'enceladus', 'europa', 'ganymede', 'hyperion', 'io', 'phobos', 'titan'
  ]

  function getRandomName(names: string[]) {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  const texturePath = useMemo(() => {
    return name !== 'lune'
      ? `assets/moons/random_textures/2k_${getRandomName(randomNames)}.jpg`
      : `assets/moons/2k_${name}.jpg`;
  }, [name]);

  const textureMap = useTexture(texturePath);

  useEffect(() => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.set(0, 0, 0);
      orbitGroupRef.current.rotation.x = THREE.MathUtils.degToRad(inclination*100);
    }
  }, [inclination]);

  useEffect(() => {
    if (axialTiltGroupRef.current) {
      axialTiltGroupRef.current.rotation.z =
        THREE.MathUtils.degToRad(axialTilt);
    }
  }, [axialTilt]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const adjustedOrbitSpeed = sideralOrbit * speedMultiplier * timeDilation;

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += adjustedOrbitSpeed;
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
  });

  

  return (
    
    <group ref={orbitGroupRef} rotation={[0,0,100]}>

    <group ref={groupRef}>
      {distance !== undefined && (
        <group ref={axialTiltGroupRef} position={[distance+100, 0, 0]}>
          <mesh ref={meshRef} name={name} >
            <sphereGeometry args={[radius, widthSegments, heightSegments]}  />
            <meshStandardMaterial
              map={textureMap}
              lightMap={textureMap}
            />
          </mesh>
        </group>
      )}
      </group>
    </group>
  );
}

export default AstroMoon;
