'use client';
import { Box, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Planet } from "./Planet";
import Stars from "./Stars";
import { angularSpeed, scaleOrbit, scaleRadius } from "../utils/Conversion";
import getPlanetById from "../services/apiService";
import { Astre } from "../types/bodies";
import { Sun } from "./Sun"
import { Vector3 } from "three";

const ThreeScene = () => {
    const [hovered, setHovered]= useState(false);
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
            if (sunRef.current) {
                const sunPosition = sunRef.current.position;
                directionalLightRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
            }
        }, [sunRef.current?.position]);
        
    
    if(loading){
        return;
    }

    if(error){
        return <div>ERREUR</div>
    }

    const findRadiusPlanetByName = (name: string): Vector3 => {
        const planet = data.find(planet => 
            planet.id?.toLowerCase() === name.toLowerCase()
        );        
        return new Vector3(scaleRadius(planet?.equaRadius),scaleRadius(planet?.equaRadius),scaleRadius(planet?.equaRadius))
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

    if(!loading && data){
      
        return(
            <div id="canvas-container">
                <div id="canvas-container">
                <Canvas style={{ height: '100vh', width: '100vw' }} gl={{ antialias: true}} shadows camera={{position: [0, 0, -80]}}>
                    <ambientLight intensity={0.3}></ambientLight>
                    <pointLight position={[0,1,0]} distance={0} power={550000} />
                    <Planet 
                        scale={[0.0696342, 0.0696342, 0.0696342]} 
                        name="soleil" 
                        angularSpeed={0.0001}
                        ref={sunRef}
                    > 
                    </Planet>
                    {planets.filter(planet => planet !== 'soleil').map((planet) => (
                        <Planet
                            key={planet}
                            scale={findRadiusPlanetByName(planet)}
                            name={planet}
                            position={findPositionPlanetByName(planet)}
                            angularSpeed={getAngularSpeed(planet)}
                        />
                    ))}
                    <OrbitControls />
                    <Stars />
                </Canvas>
            </div>
            </div>
         )
    }
};

export default ThreeScene;
