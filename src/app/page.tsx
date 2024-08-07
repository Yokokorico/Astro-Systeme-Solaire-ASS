"use client";

import React, { useEffect, useState } from "react";
import AstroHeader from "./components/AstroHeader";
import AstroNav from "./components/AstroNav";
import "./variables.css";
import AstroMap from "./components/AstroMap";
import AstreDetails from "./components/AstreDetails";
import { Box, Slider, Typography } from "@mui/material";
import getPlanetById from "./services/ApiService";
import { Astre } from "./types/bodies";

export interface AstroType {
  id: string;
  cameraPositionOffset: number;
  cameraLookAtOffset: number;
}

const astroPlanetsToDisplay: AstroType[] = [
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

function Home() {
  const [sliderValue, setSliderValue] = useState(50); // 50 corresponds to the center value 1 in the new scale
  const [speedRatio, setSpeedRatio] = useState(1);
  const [data, setData] = useState<Astre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          astroPlanetsToDisplay.map((planet) => getPlanetById(planet.id))
        );

        // Combine the API data with the local offsets
        const combinedData = results.map((apiData) => {
          const offsets = astroPlanetsToDisplay.find(
            (planet) => planet.id === apiData.id
          );
          return {
            ...apiData,
            ...offsets,
          };
        });

        setData(combinedData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  const [selectedPlanet, setSelectedPlanet] = useState<AstroType>(astroPlanetsToDisplay[0]);


  const handlePlanetChange = (newPlanet: string) => {
    const planet = astroPlanetsToDisplay.find((p) => p.id === newPlanet);
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
      {loading ? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : (
      <div>
        <AstroMap
        speedRatio={speedRatio}
        planets={data}
        selectedPlanetId={selectedPlanet.id}
      />
      <AstreDetails id={selectedPlanet.id} isVisible={false} />
      <AstroNav
        planets={astroPlanetsToDisplay.map((p) => p.id)}
        onPlanetChange={handlePlanetChange}
      />
      </div>
      )}
 
    </div>
  );
}
export default Home;