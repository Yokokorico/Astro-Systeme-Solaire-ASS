'use client';
import * as THREE from 'three';  // Pour accéder au namespace THREE
import { OrbitControls } from "@react-three/drei";
import { Canvas, } from "@react-three/fiber";
import {  useEffect, useRef, useState } from "react";
import Planet from "./Planet";
import Stars from "./Stars";
import { angularSpeed, calculateOrbitalSpeed, scaleOrbit, scaleRadius } from "../utils/Conversion";
import getPlanetById from "../services/ApiService";
import { Astre } from "../types/bodies";
import  CameraUpdater from "./CameraUpdater";
import { Vector3 } from "three";
import React from 'react';
import { OrbitLine } from './OrbitLine';

interface cameraProp {
    position: {x: number, y: number, z: number},
    lookAt: {x: number, y: number, z: number},
    cameraFocus: {x: number, y: number, z: number}
}

const ThreeScene: React.FC<cameraProp> = (cameraProp) => {
    const [planetPositions, setPlanetPositions] = useState<{ [key: string]: THREE.Vector3 }>({});
    const [cameraDistance, setCameraDistance] = useState(10);
    const [data, setData] = useState<Astre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const sunRef : any = useRef();
    const directionalLightRef = useRef<any>(); 
    const planets = [
        "soleil",
        "mercure",
        "venus",
        "terre",
        "mars",
        "jupiter",
        "saturne",
        "neptune",
        "uranus",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(planets.map(planet => getPlanetById(planet)));
                setData(results);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (sunRef.current && directionalLightRef.current) {
            const sunPosition = sunRef.current.position;
            directionalLightRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
        }
    }, [sunRef.current?.position]);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const findRadiusPlanetByName = (name: string): Vector3 => {
        const planet = data.find(planet => planet.id?.toLowerCase() === name.toLowerCase());
        return new Vector3(scaleRadius(planet?.equaRadius), scaleRadius(planet?.equaRadius), scaleRadius(planet?.equaRadius));
    };

    const findPositionPlanetByName = (name: string): Vector3 => {
        const planet = data.find(planet => 
            planet.id?.toLowerCase() === name.toLowerCase()
        );        
        return new Vector3(scaleOrbit(planet?.semimajorAxis) + 50,0,0);
    }

    const getAngularSpeed= (name: string): number => {
        const planet = data.find(planet => 
            planet.id?.toLowerCase() === name.toLowerCase()
        );
        return angularSpeed(planet?.sideralRotation)
    }

    const getOrbitalSpeed = (name: string): number => {
        const planet = data.find(planet => planet.id?.toLowerCase() === name.toLowerCase());
        // Utilisez la période orbitale (sideralOrbit) en jours pour calculer la vitesse angulaire
        return calculateOrbitalSpeed(planet?.sideralOrbit);
    };

    const handlePlanetPositionUpdate = (name: string, position: THREE.Vector3) => {
        setPlanetPositions(prevPositions => ({
            ...prevPositions,
            [name]: position,
        }));
     };

    
    
     const getPosition = (name: string): THREE.Vector3 | undefined => {
        return planetPositions[name];
     };

    if(!loading && data){
      
        return(
            <div id="canvas-container">
<button onClick={() => getPosition("terre")}>Position Terre</button>
                <div id="canvas-container">
                    <React.Fragment>
                    <Canvas
                        style={{ height: '100vh', width: '100vw' }}
                        gl={{ antialias: true}}
                        shadows
           
                        >
                        <ambientLight intensity={0.2}></ambientLight>
                        <pointLight position={[0,1,0]} distance={0} power={550000} />
                        <Planet 
                            scale={[0.0696342, 0.0696342, 0.0696342]} 
                            name="soleil" 
                            angularSpeed={0.0001}
                            semiMajorAxis={0}
                            sideralOrbit={0}
                            orbitCenter={new Vector3(0, 0, 0)}
                            onPositionUpdate={handlePlanetPositionUpdate}
                            ref={sunRef}
                        > 
                        </Planet>
                        {planets.filter(planet => planet !== 'soleil').map((planet) => (
                        <group key={planet}>
                            <Planet
                                key={planet}
                                scale={findRadiusPlanetByName(planet)}
                                name={planet}
                                position={findPositionPlanetByName(planet)}
                                angularSpeed={getAngularSpeed(planet)}
                                sideralOrbit={getOrbitalSpeed(planet)}
                                semiMajorAxis={scaleOrbit(data.find(p => p.id?.toLowerCase() === planet.toLowerCase())?.semimajorAxis || 1)}
                                orbitCenter={new Vector3(0, 0, 0)}
                                onPositionUpdate={handlePlanetPositionUpdate}
                            />

                            <OrbitLine
                            semiMajorAxis={scaleOrbit(data.find(p => p.id?.toLowerCase() === planet.toLowerCase())?.semimajorAxis || 1)}
                            orbitCenter={new Vector3(0, 0, 0)}
                            lineOpacity={0.2}
                            />
                             </group>
                        ))}
    
                             <CameraUpdater
                                planetPosition={getPosition("terre")}
                                cameraDistance={cameraDistance}
                            />

    <OrbitControls target={ [cameraProp.lookAt.x, cameraProp.lookAt.y, cameraProp.lookAt.z]} />
    <Stars />
            </Canvas>
            
</React.Fragment>
        </div>
    </div>
 )
}
};

export default ThreeScene;
