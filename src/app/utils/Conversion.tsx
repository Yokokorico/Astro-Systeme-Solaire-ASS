export const kelvinToCelsius = (kelvin: number): number => kelvin - 273.15;

export const scaleRadius = (radius?: number): number => radius ? radius / 1000 : 0;

export const scaleOrbit = (orbit?: number): number => orbit ? orbit / 1000000 : 0;

export const angularSpeed = (sideralRotation?: number): number => {
    if (sideralRotation) {
        const rotationPeriodInSeconds = sideralRotation * 24 * 3600; // Convert days to seconds
        return (2 * Math.PI) / rotationPeriodInSeconds; // Angular speed in radians per second
    }
    return 0;
};

export const calculateOrbitalSpeed = (orbitalPeriodDays?: number): number => {
    if (orbitalPeriodDays) {
        const periodInSeconds = orbitalPeriodDays * 24 * 60 * 60; // Convert days to seconds
        return (2 * Math.PI) / periodInSeconds; // Orbital speed in radians per second
    }
    return 0;
};

export const scaleSideralOrbit = (sideralOrbit?: number): number => {
    if (sideralOrbit) {
        const orbitPeriodInSeconds = Math.abs(sideralOrbit) * 24 * 3600; // Convert days to seconds
        return (2 * Math.PI) / orbitPeriodInSeconds; // Angular speed in radians per second
    }
    return 0;
};

export const scaleSideralRotation = (sideralRotation?: number): number => {
    if (sideralRotation) {
        const rotationPeriodInSeconds = Math.abs(sideralRotation) * 24 * 3600; // Convert days to seconds
        return (2 * Math.PI) / rotationPeriodInSeconds; // Angular speed in radians per second
    }
    return 0;
};
