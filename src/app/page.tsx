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
      cameraPositionOffset: 100,
      cameraLookAtOffset: 10,
    },
    {
      id: "mercure",
      cameraPositionOffset: 150,
      cameraLookAtOffset: 15,
    },
    {
      id: "venus",
      cameraPositionOffset: 200,
      cameraLookAtOffset: 20,
    },
    {
      id: "terre",
      cameraPositionOffset: 250,
      cameraLookAtOffset: 25,
    },
    {
      id: "mars",
      cameraPositionOffset: 300,
      cameraLookAtOffset: 30,
    },
    {
      id: "jupiter",
      cameraPositionOffset: 350,
      cameraLookAtOffset: 35,
    },
    {
      id: "saturne",
      cameraPositionOffset: 400,
      cameraLookAtOffset: 40,
    },
    {
      id: "neptune",
      cameraPositionOffset: 450,
      cameraLookAtOffset: 45,
    },
    {
      id: "uranus",
      cameraPositionOffset: 500,
      cameraLookAtOffset: 50,
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
      <AstreDetails id={selectedPlanet.id} />
      <AstroNav planets={astroPlanets.map(p => p.id)} onPlanetChange={handlePlanetChange} />
    </div>
  );
}

export default Home;