'use client';

import React, { useState } from 'react';
import AstreDetails from './components/AstreDetails';
import ThreeScene from './components/ThreeScene';
import AstroNav from './components/AstroNav';

import './variables.css';

function Home() {
  const astroPlanets = ["soleil", "mercure", "venus", "terre", "mars", "jupiter", "saturne", "neptune", "uranus"];

  const [selectedPlanet, setSelectedPlanet] = useState(astroPlanets[0]);

  const handlePlanetChange = (newPlanet: string) => {
    setSelectedPlanet(newPlanet);
  };

  return (
    <div>
      <ThreeScene />
      <AstreDetails id={selectedPlanet} />
      <AstroNav planets={astroPlanets} onPlanetChange={handlePlanetChange} />
    </div>
  );
}

export default Home;
