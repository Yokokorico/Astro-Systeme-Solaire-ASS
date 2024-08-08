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
    hasRing,
    ringInnerRadius = radius * 1.1,
    ringOuterRadius = radius * 1.8,
    ringTexture
}: AstroPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const axialTiltGroupRef = useRef<THREE.Group>(null);
  const textureMap = useTexture(`/${texture}`);
  let ringTextureMap;

    if (hasRing && ringTexture) {
        ringTextureMap = useTexture(`/${ringTexture}`);
    }

  useEffect(() => {
    if (axialTiltGroupRef.current) {
      axialTiltGroupRef.current.rotation.z =
        THREE.MathUtils.degToRad(axialTilt);
    }
  }, [axialTilt]);

  useEffect(() => {
    console.log(name, "chargée");
  }, [name]);

  useFrame(() => {
    const adjustedOrbitSpeed = sideralOrbit * speedMultiplier * timeDilation;
    const adjustedRotationSpeed = rotationSpeed * speedMultiplier * timeDilation;

        if (groupRef.current) {
            groupRef.current.rotation.y += adjustedOrbitSpeed;
        }
        if (meshRef.current) {
          if (name === 'venus') {
            meshRef.current.rotation.y -= adjustedRotationSpeed * -30;
          } else {
            meshRef.current.rotation.y += adjustedRotationSpeed;
          }
        }
        if (ringMeshRef.current) {
            ringMeshRef.current.rotation.z += adjustedRotationSpeed;
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
        const u =
          (v3.length() - ringInnerRadius) / (ringOuterRadius - ringInnerRadius);
        uv.setXY(i, THREE.MathUtils.clamp(u, 0.1, 0.9), 1);
      }

      uv.needsUpdate = true;
    }
  }, [ringInnerRadius, ringOuterRadius, ringTexture]);


  return (
    <group ref={groupRef}>
      {distance !== undefined && (
        <group ref={axialTiltGroupRef} position={[distance, 0, 0]}>
          <mesh ref={meshRef} name={name} castShadow receiveShadow>
            <sphereGeometry args={[radius, widthSegments, heightSegments]} />
            <meshStandardMaterial map={textureMap} lightMap={textureMap} lightMapIntensity={name === 'soleil' ? 25 : 0}/>
          </mesh>
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
  );
}

export default AstroPlanet;
