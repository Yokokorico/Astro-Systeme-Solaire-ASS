"use client";

import React, { useEffect, useState } from "react";
import AstroHeader from "./components/AstroHeader";
import AstroNav from "./components/AstroNav";
import "./variables.css";
import AstroMap from "./components/AstroMap";
import AstreDetails from "./components/AstreDetails";
import { Box, Slider, Typography } from "@mui/material";
import AstroSummary from "./components/AstroSummary";
import { getListOfMoons, getListOfPlanet, getMoonsIds } from "./services/ApiService";
import { Astre } from "./types/bodies";
import { Color } from "three";

export interface AstroType {
  id: string;
  cameraPositionOffset: number;
  cameraLookAtOffset: number;
  hasAtmo?: boolean;
  atmoRgb?: Color;
}

const astroPlanetsToDisplay: AstroType[] = [
  {
    id: "soleil",
    cameraPositionOffset: 10000,
    cameraLookAtOffset: 0,
    hasAtmo: true,
    atmoRgb: new Color(0.94, 0.94, 0.94),
  },
  {
    id: "mercure",
    cameraPositionOffset: 20,
    cameraLookAtOffset: -5,
  },
  {
    id: "venus",
    cameraPositionOffset: 30,
    cameraLookAtOffset: -8,
    hasAtmo: true,
    atmoRgb: new Color(0.91, 0.89, 0.47),
  },
  {
    id: "terre",
    cameraPositionOffset: 30,
    cameraLookAtOffset: -8,
    hasAtmo: true,
    atmoRgb: new Color(0.29, 0.4, 0.94),
  },
  {
    id: "mars",
    cameraPositionOffset: 20,
    cameraLookAtOffset: -5,
    hasAtmo: true,
    atmoRgb: new Color(0.89, 0.38, 0.37),
  },
  {
    id: "jupiter",
    cameraPositionOffset: 300,
    cameraLookAtOffset: -50,
  },
  {
    id: "saturne",
    cameraPositionOffset: 180,
    cameraLookAtOffset: -40,
    hasAtmo: true,
    atmoRgb: new Color(0.97, 0.95, 0.6),
  },
  {
    id: "neptune",
    cameraPositionOffset: 80,
    cameraLookAtOffset: -25,
    hasAtmo: true,
    atmoRgb: new Color(0.08, 0.3, 0.95),
  },
  {
    id: "uranus",
    cameraPositionOffset: 80,
    cameraLookAtOffset: -25,
    hasAtmo: true,
    atmoRgb: new Color(0.35, 0.81, 0.96),
  },
  {
    id: "pluton",
    cameraPositionOffset: 15,
    cameraLookAtOffset: -3.5,
    }
];

function Home() {
  const [sliderValue, setSliderValue] = useState(1);
  const [speedRatio, setSpeedRatio] = useState(0.05);
  const [data, setData] = useState<Astre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planetIds = astroPlanetsToDisplay.map(p => p.id);
        const results = await getListOfPlanet(planetIds);

        // Enrich each planet with its camera offsets
        const enrichedResults = results.bodies.map((planet: Astre) => {
          const offsets = astroPlanetsToDisplay.find((p) => p.id === planet.id);
          return {
            ...planet,
            cameraPositionOffset: offsets?.cameraPositionOffset,
            cameraLookAtOffset: offsets?.cameraLookAtOffset,
            hasAtmo: offsets?.hasAtmo,
            atmoRgb: offsets?.atmoRgb,
            moonAstres: [{}]
          };
        });

        setLoading(false);
        const planetWithMoons = await getListOfMoons(enrichedResults);
        setData(planetWithMoons);
      } catch (err: Error | any) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedPlanet, setSelectedPlanet] = useState<AstroType>(
    astroPlanetsToDisplay[0]
  );

  const handlePlanetChange = (newPlanet: string) => {
    const planet = astroPlanetsToDisplay.find((p) => p.id === newPlanet);
    if (planet) setSelectedPlanet(planet);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
      if (newValue <= 50) {
        setSpeedRatio(1 - (50 - newValue) / 50);
      } else {
        setSpeedRatio((newValue - 50) * 2);
      }
    }
  };

  const selectedPlanetData = data.find(
    (planet) => planet.id === selectedPlanet.id
  );
  
  const [uiIsVisible, setUiVisibility] = useState(true);

  const handleUiVisibilityChange = (newValue: boolean) => {
    setUiVisibility(newValue);
  }

  return (
    <div>
      {uiIsVisible && (
        <Box sx={{ width: 300, marginBottom: 0, position: 'absolute', bottom: 0, left: 50, zIndex: 99 }}>
          <Typography id="input-slider" gutterBottom>
            Vitesse: {speedRatio.toFixed(2)}
          </Typography>
          <Slider
            value={sliderValue}
            min={0}
            max={100}
            step={0.05}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Box>
      )}
        <AstroHeader planet={selectedPlanet.id} onUiVisibilityChange={handleUiVisibilityChange} />
      {loading ? (
          <div className="blackScreen"></div>
        // <div className="flex flex-col justify-center items-center loader">
        //   <p>Chargement...</p>
        //   <span className="flex flex-col items-center"></span>
        // </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
           <div className={`flex flex-col justify-center items-center loader ${loading ? '' : 'loaded'}`}>
              <p>Chargement...</p>
              <span className="flex flex-col items-center"></span>
            </div>
          <AstroMap
            speedRatio={speedRatio}
            planets={data}
            selectedPlanetId={selectedPlanet.id}
          />
          {uiIsVisible && (
            <AstreDetails planet={selectedPlanetData} />
          )}
          {uiIsVisible && (
            <AstroNav
            planets={astroPlanetsToDisplay.map((p) => p.id)}
            selectedPlanetId={selectedPlanet.id}
            onPlanetChange={handlePlanetChange}
          />
          )}
          {uiIsVisible && (
            <AstroSummary
              planets={astroPlanetsToDisplay.map((p) => p.id)}
              selectedPlanetId={selectedPlanet.id}
              onPlanetChange={handlePlanetChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
