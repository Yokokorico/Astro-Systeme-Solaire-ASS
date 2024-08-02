'use client';

import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { Astre }from '../types/bodies';
import { kelvinToCelsius } from '../utils/Conversion';

export interface AstreDetailsProps {
    id: string;
}
const AstreDetails: React.FC<AstreDetailsProps> = ({ id }) => {

    const [data, setData] = useState<Astre | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ApiService(id);
                setData(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {data && (
                <div>
                    <p>Nom : {data.name}</p>
                    <p>Masse: {data.mass.massValue} x 10<sup>{data.mass.massExponent}</sup></p>
                    <p>Gravité {data.gravity}</p>
                    <p>SemimajorAxis {data.semimajorAxis}</p>
                    <p>Perihelion {data.perihelion}</p>
                    <p>Aphelion {data.aphelion}</p>
                    <p>Inclination {data.inclination}</p>
                    <p>Volume {data.vol.volValue} x 10<sup>{data.vol.volExponent}</sup></p>
                    <p>Density {data.density}</p>
                    <p>Escape {data.escape}</p>
                    <p>Equaradius {data.equaRadius}</p>
                    <p>Flattening {data.flattening}</p>
                    <p>SideralOrbit {data.sideralOrbit}</p>
                    <p>SideralRotation {data.sideralRotation}</p>
                    <p>AroundPlanet {data.aroundPlanet?.planet}</p>
                    <p>BodyType {data.bodyType}</p>
                    <p>AxialTilt {data.axialTilt}</p>
                    <p>Temperature: {kelvinToCelsius(data.avgTemp).toFixed(2)} &deg;C</p>
                </div>
            )}
        </div>
    );
    
}

export default AstreDetails;
