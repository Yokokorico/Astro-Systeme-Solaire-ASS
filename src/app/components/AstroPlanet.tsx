import * as THREE from "three";
import React, { useRef, useEffect } from 'react';
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
    hasRing?: boolean; // Added prop for rings
    ringInnerRadius?: number; // Added prop for inner radius of the ring
    ringOuterRadius?: number; // Added prop for outer radius of the ring
    ringTexture?: string; // Added prop for ring texture
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
    hasRing, // Default no ring
    ringInnerRadius = radius * 1.1, // Default inner radius of ring slightly larger than planet
    ringOuterRadius = radius * 1.8, // Default outer radius of ring
    ringTexture // Default texture for the ring
}: AstroPlanetProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringMeshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const axialTiltGroupRef = useRef<THREE.Group>(null);
    const textureMap = useTexture(`/${texture}`);
    let ringTextureMap;

    if(hasRing){
        ringTextureMap = useTexture(`/${ringTexture}`);
    }

    useEffect(() => {
        if (axialTiltGroupRef.current) {
            axialTiltGroupRef.current.rotation.z = THREE.MathUtils.degToRad(axialTilt);
        }
    }, [axialTilt]);

    useEffect(() => {
        console.log(name, 'chargée');
    }, [name]);

    useFrame(() => {
        const adjustedOrbitSpeed = sideralOrbit * speedMultiplier * timeDilation;
        const adjustedRotationSpeed = rotationSpeed * speedMultiplier * timeDilation;

        if (groupRef.current) {
            groupRef.current.rotation.y += adjustedOrbitSpeed;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += adjustedRotationSpeed; // Apply rotational speed
        }
        if (ringMeshRef.current) {
            ringMeshRef.current.rotation.z += adjustedRotationSpeed; // Apply rotational speed to the ring
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
        <group ref={groupRef}>
            {distance !== undefined && (
                <group ref={axialTiltGroupRef} position={[distance, 0, 0]}>
                    <mesh ref={meshRef} name={name}>
                        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
                        <meshStandardMaterial map={textureMap} />
                    </mesh>
                    {hasRing && (
                        <mesh ref={ringMeshRef} position={[0, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
                            <ringGeometry args={[ringInnerRadius, ringOuterRadius, 512]} />
                            <meshBasicMaterial map={ringTextureMap} side={THREE.DoubleSide} />
                        </mesh>
                    )}
                </group>
            )}
        </group>
    );
}

export default AstroPlanet;
