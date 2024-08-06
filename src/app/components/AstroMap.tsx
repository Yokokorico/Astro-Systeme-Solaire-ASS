import React, { useEffect, useState } from 'react';
import { Astre } from '../types/bodies';
import getPlanetById from '../services/ApiService';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { scaleOrbit, scaleRadius, scaleSideralOrbit, scaleSideralRotation } from '../utils/Conversion';
import { CustomCamera } from './CustomCamera';
import { OrbitLine } from './OrbitLine';
import { Vector3 } from 'three';
import { AstroType } from '../page';
import AstroPlanet from './AstroPlanet';
import Stars from './Stars';

export interface AstroMapProps {
    astroType: AstroType[];
    selectedPlanetId: string;
}

function AstroMap({ astroType, selectedPlanetId }: AstroMapProps) {
    const [data, setData] = useState<Astre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        console.log(selectedPlanetId); 
    }, [selectedPlanetId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    astroType.map(planet => getPlanetById(planet.id))
                );
                setData(results);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [astroType]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }} >
            <ambientLight intensity={0.2} />
            <pointLight distance={0} decay={0.01} intensity={5} />
            <Sphere args={[32, 64, 64]} position={[0, 0, 0]}>
                <meshBasicMaterial color="white" />
            </Sphere>
            {data.filter(astroBody => astroBody.id !== 'soleil').map(astroBody => (
                <React.Fragment key={astroBody.id}>
                    
                    <OrbitLine
                        semiMajorAxis={scaleOrbit(astroBody.semimajorAxis)}
                        orbitCenter={new Vector3(0, 0, 0)}
                        lineOpacity={(selectedPlanetId == "soleil") ? 0.3 : 0 }
                    />
                    <AstroPlanet
                        key={astroBody.id}
                        name={astroBody.id}
                        radius={scaleRadius(astroBody.equaRadius)}
                        widthSegments={128}
                        heightSegments={64}
                        texture={`2k_${astroBody.id}.jpg`}
                        sideralOrbit={scaleSideralOrbit(astroBody.sideralOrbit)}
                        distance={scaleOrbit(astroBody.semimajorAxis)}
                        rotationSpeed={scaleSideralRotation(astroBody.sideralRotation)}
                        axialTilt={astroBody.axialTilt}
                        speedMultiplier={100}
                        timeDilation={100}
                    />
                </React.Fragment>
            ))}
            <OrbitControls />
            <Stars />
            <CustomCamera cameraPositionOffset={astroType.find(planet => planet.id === selectedPlanetId)?.cameraPositionOffset} cameraLookAtOffset={astroType.find(planet => planet.id === selectedPlanetId)?.cameraLookAtOffset} cameraPlanetFocused={selectedPlanetId} />
        </Canvas>
    );
}

export default AstroMap;
