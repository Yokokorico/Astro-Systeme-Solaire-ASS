'use client';

import React, { useRef } from 'react';
import { Astre } from '../types/bodies';
import { kelvinToCelsius } from '../utils/Conversion';
import styles from './AstreDetails.module.css';

export interface AstreDetailsProps {
    planet: Astre | null | undefined;
}

const AstreDetails: React.FC<AstreDetailsProps> = ({ planet }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (!planet) {
        return <div>No data available</div>;
    }

    const dataFields = [
        { label: 'Masse', value: planet.mass ? `${planet.mass.massValue} x 10^${planet.mass.massExponent} kg` : null },
        { label: 'Gravité', value: `${planet.gravity} m/s²` },
        { label: 'SemimajorAxis', value: `${planet.semimajorAxis?.toLocaleString()} km` },
        { label: 'Périhélie', value: `${planet.perihelion?.toLocaleString()} km` },
        { label: 'Aphélie', value: `${planet.aphelion?.toLocaleString()} km` },
        { label: 'Inclination', value: `${planet.inclination}°` },
        { label: 'Volume', value: planet.vol ? `${planet.vol.volValue} x 10^${planet.vol.volExponent} km³` : null },
        { label: 'Densité', value: `${planet.density} g/cm³` },
        { label: 'Vitesse de libération', value: `${planet.escape?.toLocaleString()} km/s` },
        { label: 'Rayon équatorial', value: `${planet.equaRadius.toLocaleString()} km` },
        { label: 'Aplatissement', value: planet.flattening },
        { label: 'Période de révolution', value: `${planet.sideralOrbit?.toLocaleString()} jours` },
        { label: 'Période de rotation', value: `${planet.sideralRotation} heures` },
        { label: 'Autour de la planète', value: planet.aroundPlanet?.planet || null },
        { label: 'Type de corps', value: planet.bodyType },
        { label: 'Inclinaison axiale', value: `${planet.axialTilt}°` },
        { label: 'Température', value: planet.avgTemp !== null ? `${kelvinToCelsius(planet.avgTemp).toFixed(2)} °C` : null }
    ];

    return (
        <div className={`${styles.container} ${styles[planet.id]}`}>
            <div className={`flex flex-cols ${styles.titleContainer}`}>
                <h2 className={`nasalization ${styles.title}`}>{planet.name}</h2>
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