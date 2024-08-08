import React, { useRef, useEffect } from "react";
import { Astre } from "../types/bodies";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import {
  scaleOrbit,
  scaleRadius,
  scaleSideralOrbit,
  scaleSideralRotation,
} from "../utils/Conversion";
import { CustomCamera } from "./CustomCamera";
import { OrbitLine } from "./OrbitLine";
import { Vector3 } from "three";
import * as THREE from "three";
import AstroPlanet from "./AstroPlanet";
import Stars from "./Stars";
import Halo from "./Halo";

export interface AstroMapProps {
  planets: Astre[];
  selectedPlanetId: string;
  speedRatio: number;
}

function SetEnvironment() {
  const { scene } = useThree();
  const envMap = useTexture("/milky_way.jpg");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  useEffect(() => {
    scene.background = envMap;
  }, [scene, envMap]);

  return null;
}

function AstroMap({ planets, selectedPlanetId, speedRatio }: AstroMapProps) {
  const canvasRef = useRef(null);

  if (!planets.length) return <div>AstroMapLoading...</div>;

  return (
    <Canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} camera={{far: 1000000}}>
      <ambientLight intensity={0.2} />
      <pointLight distance={0} decay={0.01} intensity={5} />
      {/* <SetEnvironment /> */}
      {planets
        .filter((planet) => planet.id)
        .map((planet) => (
          <React.Fragment key={planet.id}>
            <OrbitLine
              semiMajorAxis={scaleOrbit(planet.semimajorAxis)}
              orbitCenter={new Vector3(0, 0, 0)}
              lineOpacity={(selectedPlanetId === "soleil") ? 0.2 : 0}
              inclination={planet.inclination}
              eccentricity={planet.eccentricity}
            />
            <AstroPlanet
              name={planet.id}
              radius={scaleRadius(planet.equaRadius)}
              widthSegments={128}
              heightSegments={64}
              texture={`2k_${planet.id}.jpg`}
              sideralOrbit={scaleSideralOrbit(planet.sideralOrbit) * speedRatio}
              distance={scaleOrbit(planet.semimajorAxis)}
              rotationSpeed={
                scaleSideralRotation(planet.sideralRotation) * speedRatio
              }
              axialTilt={planet.axialTilt}
              hasRing={planet.id === "saturne"}
              ringTexture={
                planet.id === "saturne" ? `2k_${planet.id}_ring.png` : undefined
              }
              speedMultiplier={100}
              timeDilation={100}
              inclination={planet.inclination}
              eccentricity={planet.eccentricity}

              hasAtmo={planet.hasAtmo}
              atmoRgb={planet.atmoRgb}
            />
          </React.Fragment>
        ))}
      <OrbitControls />
      <Stars />
      <CustomCamera
        cameraPositionOffset={
          planets.find((planet) => planet.id === selectedPlanetId)
            ?.cameraPositionOffset || 0
        }
        cameraLookAtOffset={
          planets.find((planet) => planet.id === selectedPlanetId)
            ?.cameraLookAtOffset || 0
        }
        cameraPlanetFocused={selectedPlanetId}
      />
    </Canvas>
  );
}

export default AstroMap;
