"use client";

import React, { useState } from "react";
import AstroNav from "./components/AstroNav";
import "./variables.css";
import Scene from "./components/TestScene";
import AstroMap from "./components/AstroMap";

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
 
      <AstroMap />
      <AstroNav planets={astroPlanets} onPlanetChange={handlePlanetChange} />
    </div>
  );
}

export default Home;
