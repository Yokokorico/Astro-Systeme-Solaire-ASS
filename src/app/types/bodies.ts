export interface Body {
    id: string;
    name: string;
    mass: {
        massValue: number;
        massExponent: number;
    };
    gravity: number;
    moons?: Body[];
    isPlanet?: boolean;
    semimajorAxis: number;
    perihelion: number;
    aphelion: number;
    inclination: number;
    vol : {
        volValue: number;
        volExponent: number;
    }
    density: number;
    escape: number;
    equaRadius: number;
    flattening: number;
    sideralOrbit: number;
    sideralRotation: number;
    aroundPlanet?:  {
        planet: string;
        rel: string;
    };
    axialTilt: number;
    avgTemp: number;
    bodyType: string;

}