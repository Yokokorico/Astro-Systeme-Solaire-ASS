"use client";

import React, { useState } from "react";
import AstroNav from "./components/AstroNav";
import "./variables.css";
import AstroMap from "./components/AstroMap";
import AstreDetails from "./components/AstreDetails";

export interface AstroType {
  id: string;
  cameraPositionOffset: number;
  cameraLookAtOffset: number;
}
function Home() {
  const astroPlanets: AstroType[] = [
    {
      id: "soleil",
      cameraPositionOffset: 1500 ,
      cameraLookAtOffset: -2.4,
    },
    {
      id: "mercure",
      cameraPositionOffset: 6,
      cameraLookAtOffset: -2.4,
    },
    {
      id: "venus",
      cameraPositionOffset: 14,
      cameraLookAtOffset: -5.4,
    },
    {
      id: "terre",
      cameraPositionOffset: 14,
      cameraLookAtOffset: -5.4,
    },
    {
      id: "mars",
      cameraPositionOffset: 8,
      cameraLookAtOffset: -4,
    },
    {
      id: "jupiter",
      cameraPositionOffset: 140,
      cameraLookAtOffset: -40,
    },
    {
      id: "saturne",
      cameraPositionOffset: 250,
      cameraLookAtOffset: -120,
    },
    {
      id: "neptune",
      cameraPositionOffset: 60,
      cameraLookAtOffset: -30,
    },
    {
      id: "uranus",
      cameraPositionOffset: 60,
      cameraLookAtOffset: -20,
    }
  ];

  const [selectedPlanet, setSelectedPlanet] = useState<AstroType>(astroPlanets[0]);

  const handlePlanetChange = (newPlanet: string) => {
    const planet = astroPlanets.find(p => p.id === newPlanet);
    if (planet) setSelectedPlanet(planet);
  };

  return (
    <div>
      <AstroMap astroType={astroPlanets} selectedPlanetId={selectedPlanet.id} />
      <AstreDetails id={selectedPlanet.id} isVisible={true} />
      <AstroNav planets={astroPlanets.map(p => p.id)} onPlanetChange={handlePlanetChange} />
    </div>
  );
}

export default Home;