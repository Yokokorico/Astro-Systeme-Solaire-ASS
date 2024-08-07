import React, { useEffect, useState } from 'react';
import { Astre } from '../types/bodies';
import getPlanetById from '../services/ApiService';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { scaleOrbit, scaleRadius, scaleSideralOrbit, scaleSideralRotation } from '../utils/Conversion';
import { CustomCamera } from './CustomCamera';
import { OrbitLine } from './OrbitLine';
import { Vector3 } from 'three';
import { AstroType } from '../page';
import AstroPlanet from './AstroPlanet';
import Stars from './Stars';

export interface AstroMapProps {
    planets: Astre[],
    selectedPlanetId: string;
    speedRatio: number;
}

function AstroMap({ planets, selectedPlanetId, speedRatio }: AstroMapProps) {
    const [data, setData] = useState<Astre[]>([]);
    const [soleil, setSoleil] = useState<Astre | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }} >
  
            <ambientLight intensity={0.2} />
            <pointLight distance={0} decay={0.01} intensity={5} />


            {data.filter(planets => planets.id).map(planet => (
                <React.Fragment key={planet.id}>
                    <OrbitLine
                        semiMajorAxis={scaleOrbit(planet.semimajorAxis)}
                        orbitCenter={new Vector3(0, 0, 0)}
                        lineOpacity={(selectedPlanetId === "soleil") ? 0.3 : 0}
                    />
                    <AstroPlanet
                        key={planet.id}
                        name={planet.id}
                        radius={scaleRadius(planet.equaRadius)}
                        widthSegments={128}
                        heightSegments={64}
                        texture={`2k_${planet.id}.jpg`}
                        sideralOrbit={scaleSideralOrbit(planet.sideralOrbit) * speedRatio}
                        distance={scaleOrbit(planet.semimajorAxis)}
                        rotationSpeed={scaleSideralRotation(planet.sideralRotation) * speedRatio}
                        axialTilt={planet.axialTilt}
                        speedMultiplier={100}
                        timeDilation={100}
                        hasRing={(planet.id == "saturne") ? true : false}
                        ringTexture={(planet.id == "saturne") ? `2k_${planet.id}_ring.png` : undefined}
                    />
                </React.Fragment>
            ))}
            <OrbitControls />
            <Stars />
            <CustomCamera 
                cameraPositionOffset={planets.find(planet => planet.id === selectedPlanetId)?.cameraPositionOffset} 
                cameraLookAtOffset={planets.find(planet => planet.id === selectedPlanetId)?.cameraLookAtOffset} 
                cameraPlanetFocused={selectedPlanetId} 
            />
        </Canvas>
    );
}

export default AstroMap;
