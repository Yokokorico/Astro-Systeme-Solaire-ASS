"use client";

import React, { useState } from "react";
import AstreDetails from "./components/AstreDetails";
import ThreeScene from "./components/ThreeScene";
import AstroNav from "./components/AstroNav";

import "./variables.css";
import { Canvas } from "@react-three/fiber";
import { FirstPersonControls } from "@react-three/drei";
import Scene from "./components/TestScene";

function Home() {
  const astroPlanets = [
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
  const astroCamera = {
    position: { x: 0, y: 300, z: -180 },
    lookAt: { x: 0, y: -30, z: 0 },
  };

  const [selectedPlanet, setSelectedPlanet] = useState(astroPlanets[0]);

  const handlePlanetChange = (newPlanet: string) => {
    setSelectedPlanet(newPlanet);
  };

  return (
    <div>
      {/* <ThreeScene position={astroCamera.position} lookAt={astroCamera.lookAt}/> */}
        <Scene></Scene>
      {/* <AstreDetails id={selectedPlanet} /> */}
      <AstroNav planets={astroPlanets} onPlanetChange={handlePlanetChange} />
    </div>
  );
}

export default Home;
