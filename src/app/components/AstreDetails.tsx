'use client';

import React, { useEffect, useState, useRef } from 'react';
import ApiService from '../services/ApiService';
import { Astre } from '../types/bodies';
import { kelvinToCelsius } from '../utils/Conversion';
import styles from './AstreDetails.module.css';

export interface AstreDetailsProps {
    id: string;
}

const AstreDetails: React.FC<AstreDetailsProps> = ({ id }) => {
    const [data, setData] = useState<Astre | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    const dataFields = [
        { label: 'Masse', value: data.mass ? `${data.mass.massValue} x 10^${data.mass.massExponent}` : null },
        { label: 'Gravité', value: data.gravity },
        { label: 'SemimajorAxis', value: data.semimajorAxis },
        { label: 'Perihelion', value: data.perihelion },
        { label: 'Aphelion', value: data.aphelion },
        { label: 'Inclination', value: data.inclination },
        { label: 'Volume', value: data.vol ? `${data.vol.volValue} x 10^${data.vol.volExponent}` : null },
        { label: 'Densité', value: data.density },
        { label: 'Vitesse de libération', value: data.escape },
        { label: 'Rayon équatorial', value: data.equaRadius },
        { label: 'Aplatissement', value: data.flattening },
        { label: 'Orbital Sideral', value: data.sideralOrbit },
        { label: 'Rotation Sideral', value: data.sideralRotation },
        { label: 'Autour de la planète', value: data.aroundPlanet?.planet || null },
        { label: 'Type de corps', value: data.bodyType },
        { label: 'Inclinaison axiale', value: data.axialTilt },
        { label: 'Température', value: data.avgTemp !== null ? `${kelvinToCelsius(data.avgTemp).toFixed(2)} °C` : null }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{data.name}</h2>
                </div>
            </div>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
                <div className={styles.fieldContainer}>
                    {dataFields.map((field, index) => field.value !== null && (
                        <div key={index} className={styles.row}>
                            <span className={styles.label}>{field.label}:</span>
                        </div>
                    ))}
                </div>
                <div className={styles.fieldContainer}>
                    {dataFields.map((field, index) => field.value !== null && (
                        <div key={index} className={styles.row}>
                            <span className={styles.value}>{field.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AstreDetails;
