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
    speedMultiplier?: number; // Added prop for speed multiplier
    timeDilation?: number; // Added prop for time dilation
    axialTilt?: number; // Added prop for axial tilt 
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
    speedMultiplier = 1, // Default multiplier is 1
    timeDilation = 1, // Default time dilation is 1
    axialTilt = 0 // Default axial tilt is 0 degrees
}: AstroPlanetProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const axialTiltGroupRef = useRef<THREE.Group>(null);
    const textureMap = useTexture(`/${texture}`);

    useEffect(() => {
        if (axialTiltGroupRef.current) {
            axialTiltGroupRef.current.rotation.z = THREE.MathUtils.degToRad(axialTilt); // Apply axial tilt
        }
    }, [axialTilt]);

    useFrame(() => {
        const adjustedOrbitSpeed = sideralOrbit * speedMultiplier * timeDilation;
        const adjustedRotationSpeed = rotationSpeed * speedMultiplier * timeDilation;

        if (groupRef.current) {
            groupRef.current.rotation.y += adjustedOrbitSpeed; // Apply orbital speed
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += adjustedRotationSpeed; // Apply rotational speed
        }
    });

    return (
        <group ref={groupRef}>
            {distance ? (
                <group ref={axialTiltGroupRef} position={[distance, 0, 0]}>
                    <mesh ref={meshRef} name={name} >
                        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
                        <meshStandardMaterial map={textureMap} />
                    </mesh>
                </group>
            ) : null}
        </group>
    );
}

export default AstroPlanet;
