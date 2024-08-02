export const kelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
};

export const scaleRadius = (radius: number | undefined) => {
    return radius ? radius / 10000000 : 0;
}

export const scaleOrbit = (orbit: number | undefined) => {
    return orbit ? ( orbit / 1000000 ) / 2 : 0;
}

export const angularSpeed = (sideralRotation: number | undefined) => {    
    return sideralRotation ? ((2*Math.PI) / (sideralRotation*3600))*2 : 0; 
}

export const calculateOrbitalSpeed = (orbitalPeriodDays: number | undefined): number => {
    if (orbitalPeriodDays) {
        const periodInSeconds = orbitalPeriodDays * 24 * 60 * 60; 
        return (2 * Math.PI) / periodInSeconds;
    }
    return 0;
};
