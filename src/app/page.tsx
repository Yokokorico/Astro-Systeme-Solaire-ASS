"use client";

import React, { useState } from "react";
import AstroHeader from "./components/AstroHeader";
import AstroNav from "./components/AstroNav";
import "./variables.css";
import AstroMap from "./components/AstroMap";
import AstreDetails from "./components/AstreDetails";
import { Box, Slider, Typography } from "@mui/material";

export interface AstroType {
  id: string;
  cameraPositionOffset: number;
  cameraLookAtOffset: number;
}

function Home() {
  const [sliderValue, setSliderValue] = useState(50); // 50 corresponds to the center value 1 in the new scale
  const [speedRatio, setSpeedRatio] = useState(1);

  const astroPlanets: AstroType[] = [
    {
      id: "soleil",
      cameraPositionOffset: 1500,
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
    },
  ];

  const [selectedPlanet, setSelectedPlanet] = useState<AstroType>(astroPlanets[0]);

  const handlePlanetChange = (newPlanet: string) => {
    const planet = astroPlanets.find((p) => p.id === newPlanet);
    if (planet) setSelectedPlanet(planet);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      if (newValue <= 50) {
        setSpeedRatio(1 - (50 - newValue) / 50);
      } else {
        setSpeedRatio((newValue - 50) * 2); 
      }
    }
  };

  return (
    <div>
      <Box sx={{ width: 300, marginBottom: 0, position: 'absolute', bottom: 0, left: 50, zIndex: 99 }}>
        <Typography id="input-slider" gutterBottom>
          Vitesse: {speedRatio.toFixed(2)}
        </Typography>
        <Slider
          value={sliderValue}
          min={0}
          max={100}
          step={1}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </Box>
      <AstroHeader />
      <AstroMap
        speedRatio={speedRatio}
        astroType={astroPlanets}
        selectedPlanetId={selectedPlanet.id}
      />
      {/* <AstreDetails id={selectedPlanet.id} isVisible={false} /> */}
      <AstroNav
        planets={astroPlanets.map((p) => p.id)}
        onPlanetChange={handlePlanetChange}
      />
    </div>
  );
}

export default Home;