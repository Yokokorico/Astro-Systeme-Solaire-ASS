import React, { useEffect, useState } from 'react';
import { Astre } from '../types/bodies';
import getPlanetById from '../services/ApiService';
import { Canvas } from '@react-three/fiber';
import AstroPlanet from './AstroPlanet';
import { OrbitControls, Sphere } from '@react-three/drei';
import { scaleOrbit, scaleRadius, scaleSideralOrbit, scaleSideralRotation } from '../utils/Conversion';
import { CustomCamera } from './CustomCamera';
import { OrbitLine } from './OrbitLine';
import { Vector3 } from 'three';
import Stars from './Stars';

export interface AstroMapProps {
    astroPlanets: string[];
    selectedPlanetId: string;
}

function AstroMap({ astroPlanets, selectedPlanetId }: AstroMapProps) {
    const planets = astroPlanets;
    const selectedPlanet = selectedPlanetId;
    const [data, setData] = useState<Astre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        console.log(selectedPlanet);
    }, [selectedPlanet]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(planets.map(planet => getPlanetById(planet)));
                setData(results);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Sphere args={[32, 64, 64]} position={[0, 0, 0]}>
                <meshBasicMaterial color="white" />
            </Sphere>
            {data.filter(astroBody => astroBody.id !== 'soleil').map((astroBody) => {
                return (
                    <React.Fragment key={astroBody.id}>
                        <OrbitLine semiMajorAxis={scaleOrbit(astroBody.semimajorAxis)} orbitCenter={new Vector3(0, 0, 0)} lineOpacity={0.5}/>
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
                );
            })} 
            <Stars />
            <OrbitControls />
            <CustomCamera targetName={selectedPlanet} />
        </Canvas>
    );
}

export default AstroMap;
