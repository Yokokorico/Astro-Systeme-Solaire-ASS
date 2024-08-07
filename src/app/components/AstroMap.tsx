import React from 'react';
import { Astre } from '../types/bodies';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { scaleOrbit, scaleRadius, scaleSideralOrbit, scaleSideralRotation } from '../utils/Conversion';
import { CustomCamera } from './CustomCamera';
import { OrbitLine } from './OrbitLine';
import { Vector3 } from 'three';
import AstroPlanet from './AstroPlanet';
import Stars from './Stars';

export interface AstroMapProps {
    planets: Astre[];
    selectedPlanetId: string;
    speedRatio: number;
}

function AstroMap({ planets, selectedPlanetId, speedRatio }: AstroMapProps) {
    if (!planets.length) return <div>AstroMapLoading...</div>;

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }} camera={{position: [0, 5000, 5000] }}>
            <ambientLight intensity={0.2} />
            <pointLight distance={0} decay={0.01} intensity={5} />

            {planets.filter(planet => planet.id).map(planet => (
                <React.Fragment key={planet.id}>
                    <OrbitLine
                        semiMajorAxis={scaleOrbit(planet.semimajorAxis)}
                        orbitCenter={new Vector3(0, 0, 0)}
                        lineOpacity={(selectedPlanetId === "soleil") ? 0.3 : 0}
                    />
                    <AstroPlanet
                        name={planet.id}
                        radius={scaleRadius(planet.equaRadius)}
                        widthSegments={128}
                        heightSegments={64}
                        texture={`2k_${planet.id}.jpg`}
                        sideralOrbit={scaleSideralOrbit(planet.sideralOrbit) * speedRatio}
                        distance={scaleOrbit(planet.semimajorAxis)}
                        rotationSpeed={scaleSideralRotation(planet.sideralRotation) * speedRatio}
                        axialTilt={planet.axialTilt}
                        hasRing={planet.id === "saturne"}
                        ringTexture={planet.id === "saturne" ? `2k_${planet.id}_ring.png` : undefined}
                        speedMultiplier={100}
                        timeDilation={100}
                    />
                </React.Fragment>
            ))}
            <OrbitControls />
            {/* <Stars /> */}
            <CustomCamera 
                cameraPositionOffset={planets.find(planet => planet.id === selectedPlanetId)?.cameraPositionOffset || 0} 
                cameraLookAtOffset={planets.find(planet => planet.id === selectedPlanetId)?.cameraLookAtOffset || 0} 
                cameraPlanetFocused={selectedPlanetId} 
            />
        </Canvas>
    );
}

export default AstroMap;
