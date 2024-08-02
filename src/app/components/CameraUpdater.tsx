import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';

// Définition du composant CameraUpdater
interface CameraUpdaterProps {
    planetPosition: THREE.Vector3 | undefined; // La position de la planète
    cameraDistance: number; // La distance de la caméra par rapport à la planète
}

const CameraUpdater: React.FC<CameraUpdaterProps> = ({ planetPosition, cameraDistance }) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(() => {
        if (cameraRef.current && planetPosition) {
            // Calculer la nouvelle position de la caméra en fonction de la position de la planète
            const { x, y, z } = planetPosition;

            cameraRef.current.position.set(
                x - cameraDistance,  // Ajuster pour rester derrière la planète
                y,
                z + cameraDistance   // Ajuster pour rester devant la planète
            );

            cameraRef.current.lookAt(planetPosition);
        }
    });

    return <PerspectiveCamera ref={cameraRef} position={[0, 0, cameraDistance]} />;
};

export default CameraUpdater;
