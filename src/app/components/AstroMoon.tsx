import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Halo from "./Halo";
import { Color, Vector3 } from "three";
import { Astre } from "../types/bodies";
import { scaleOrbit, scaleRadius, scaleSideralOrbit, scaleSideralRotation } from "../utils/Conversion";
import { AstroPlanetProps } from "./AstroPlanet";

export interface AstroMoonProps extends AstroPlanetProps {}

function AstroMoon({
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
  ringTexture,
  hasAtmo,
  atmoRgb,
  moonAstres,
  speedRatio
}: AstroMoonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const axialTiltGroupRef = useRef<THREE.Group>(null);
  const textureMap = useTexture(`/${texture}`);
 
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
    const adjustedRotationSpeed = rotationSpeed * speedMultiplier * timeDilation;

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
