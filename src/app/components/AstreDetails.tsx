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
        { label: 'Masse', value: data.mass ? `${data.mass.massValue} x 10^${data.mass.massExponent} kg` : null },
        { label: 'Gravité', value: `${data.gravity} m/s²` },
        { label: 'SemimajorAxis', value: `${data.semimajorAxis?.toLocaleString()} km` },
        { label: 'Périhélie', value: `${data.perihelion?.toLocaleString()} km` },
        { label: 'Aphélie', value: `${data.aphelion?.toLocaleString()} km` },
        { label: 'Inclination', value: `${data.inclination}°` },
        { label: 'Volume', value: data.vol ? `${data.vol.volValue} x 10^${data.vol.volExponent} km³` : null },
        { label: 'Densité', value: `${data.density} g/cm³` },
        { label: 'Vitesse de libération', value: `${data.escape?.toLocaleString()} km/s` },
        { label: 'Rayon équatorial', value: `${data.equaRadius.toLocaleString()} km` },
        { label: 'Aplatissement', value: data.flattening },
        { label: 'Période de révolution', value: `${data.sideralOrbit?.toLocaleString()} jours` },
        { label: 'Période de rotation', value: `${data.sideralRotation} heures` },
        { label: 'Autour de la planète', value: data.aroundPlanet?.planet || null },
        { label: 'Type de corps', value: data.bodyType },
        { label: 'Inclinaison axiale', value: `${data.axialTilt}°`  },
        { label: 'Température', value: data.avgTemp !== null ? `${kelvinToCelsius(data.avgTemp).toFixed(2)} °C` : null }
    ];

    return (
        <div className={`${styles.container} ${styles[data.id]}`}>
            <div className={`flex flex-cols ${styles.titleContainer} `}>
                <h2 className={`nasalization ${styles.title}`}>{data.name}</h2>
            </div>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
                <div className={styles.fieldContainer}>
                    {dataFields.map((field, index) => field.value !== null && (
                        <div key={index} className={styles.row}>
                            <span className={`${styles.label}`}>{field.label}:</span>
                        </div>
                    ))}
                </div>
                <div className={styles.fieldContainer}>
                    {dataFields.map((field, index) => field.value !== null && (
                        <div key={index} className={styles.row}>
                            <span className={`${styles.value}`}>{field.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AstreDetails;
