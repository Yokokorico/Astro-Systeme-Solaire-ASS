"use client";

import React, { useState } from "react";
import AstroNav from "./components/AstroNav";
import "./variables.css";
import AstroMap from "./components/AstroMap";
import AstreDetails from "./components/AstreDetails";

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

  const [selectedPlanet, setSelectedPlanet] = useState(astroPlanets[0]);

  const handlePlanetChange = (newPlanet: string) => {
    setSelectedPlanet(newPlanet);
  };

  return (
    <div>
      <AstroMap astroPlanets={astroPlanets} selectedPlanetId={selectedPlanet}/>
      <AstreDetails id={selectedPlanet} />
      <AstroNav planets={astroPlanets} onPlanetChange={handlePlanetChange} />
    </div>
  );
}

export default Home;
