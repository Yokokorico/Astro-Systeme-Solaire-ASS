import { Color, Vector3 } from "three";

export interface Astre {
    id: string;
    name: string;
    mass?: {
        massValue: number;
        massExponent: number;
    };
    gravity?: number;
    moons?: {
        rel: string;
    }[];
    isPlanet?: boolean;
    semimajorAxis?: number;
    perihelion?: number;
    aphelion?: number;
    inclination?: number;
    vol? : {
        volValue: number;
        volExponent: number;
    }
    density?: number;
    escape?: number;
    equaRadius: number;
    flattening?: number;
    sideralOrbit?: number;
    sideralRotation?: number;
    aroundPlanet?:  {
        planet: string;
        rel: string;
    };
    axialTilt?: number;
    avgTemp: number;
    eccentricity?: number;
    bodyType?: string;
    cameraPositionOffset?: number;
    cameraLookAtOffset?: number;
    hasAtmo?: boolean;
    atmoRgb?: Color;
    moonAstres: Astre[]
}