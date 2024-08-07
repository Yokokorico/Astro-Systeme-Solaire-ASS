import React from 'react';
import styles from "../components/AstroSummary.module.css";

interface AstroSummaryProps {
    planets: string[];
    selectedPlanetId: string;
    onPlanetChange: (planetId: string) => void;
}

const AstroSummary: React.FC<AstroSummaryProps> = ({ planets, selectedPlanetId, onPlanetChange }) => {
    const handleClick = (planet: string) => {
        onPlanetChange(planet);
    }

    return (
        <div className={`flex flex-col justify-center items-center ${styles.container}`}>
            {planets.map(planet => (
                <button
                    key={planet}
                    className={`${styles[planet]} flex ${selectedPlanetId === planet ? styles.selected : ''}`}
                    onClick={() => handleClick(planet)}
                >
                    <p className="flex justify-end items-center">{planet.charAt(0).toUpperCase() + planet.slice(1)}</p>
                    <div className={`${styles.icon}`}></div>
                </button>
            ))}
        </div>
    )
}

export default AstroSummary;
