'use client';

import React, { useRef, useState } from 'react';
import { Astre } from '../types/bodies';
import { kelvinToCelsius } from '../utils/Conversion';
import styles from './AstreDetails.module.css';
import { div } from 'three/webgpu';

export interface AstreDetailsProps {
    planet: Astre | null | undefined;
}

const AstreDetails: React.FC<AstreDetailsProps> = ({ planet }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = useState(true);
    const [tooltip, setTooltip] = useState('Masquer');

    const hideDetails = () => {
        if (isVisible) {
            setVisible(false);
            setTooltip('Détails');
        }
        else {
            setVisible(true);
            setTooltip('Masquer');
        }
    }

    if (!planet) {
        return <div>No data available</div>;
    }

    const dataFields = [
        { label: 'Masse', value: planet.mass ? `${planet.mass.massValue} x 10^${planet.mass.massExponent} kg` : null, sun: planet.mass ? `${planet.mass.massValue} x 10^${planet.mass.massExponent} kg` : null },
        { label: 'Gravité', value: `${planet.gravity} m/s²`, sun: '274 m/s²' },
        { label: 'SemimajorAxis', value: `${planet.semimajorAxis?.toLocaleString()} km`, sun: 'N/A' },
        { label: 'Périhélie', value: `${planet.perihelion?.toLocaleString()} km`, sun: 'N/A' },
        { label: 'Aphélie', value: `${planet.aphelion?.toLocaleString()} km`, sun: 'N/A' },
        { label: 'Inclination', value: `${planet.inclination}°`, sun : '7,25°' },
        { label: 'Volume', value: planet.vol ? `${planet.vol.volValue} x 10^${planet.vol.volExponent} km³` : null, sun: planet.vol ? `${planet.vol.volValue} x 10^${planet.vol.volExponent} km³` : null },
        { label: 'Densité', value: `${planet.density} g/cm³`, sun: '1,41 g/cm³' },
        { label: 'Vitesse de libération', value: `${planet.escape?.toLocaleString()} km/s`, sun: 'N/A' },
        { label: 'Rayon équatorial', value: `${planet.equaRadius.toLocaleString()} km`, sun: `${planet.equaRadius.toLocaleString()} km` },
        { label: 'Aplatissement', value: planet.flattening, sun: planet.flattening },
        { label: 'Période de révolution', value: `${planet.sideralOrbit?.toLocaleString()} jours`, sun: 'N/A' },
        { label: 'Période de rotation', value: `${planet.sideralRotation} heures`, sun: '24.47 jours' },
        { label: 'Autour de la planète', value: planet.aroundPlanet?.planet || null, sun: planet.aroundPlanet?.planet || null },
        { label: 'Type de corps', value: planet.bodyType, sun: planet.bodyType },
        { label: 'Inclinaison axiale', value: `${planet.axialTilt}°`, sun: `${planet.axialTilt}°` },
        { label: 'Température', value: planet.avgTemp !== null ? `${kelvinToCelsius(planet.avgTemp).toFixed(2)} °C` : null, sun: '~5 550 °C' }
    ];

    return (
        <div className={styles.wrapper}>
            <div className={`flex items-center ${styles[planet.id]}`}>

                <button className={styles.hideDetails} onClick={hideDetails}>
                    <p className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}>{tooltip}</p>
                </button>

                <div className={`${styles.container} ${styles[planet.id]} ${!isVisible ? styles.hide : ''}`}>
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
                                    {planet.id === 'soleil' && (
                                        <span className={styles.value}>{field.sun}</span>
                                    )}
                                    {planet.id !== 'soleil' && (
                                        <span className={styles.value}>{field.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AstreDetails;