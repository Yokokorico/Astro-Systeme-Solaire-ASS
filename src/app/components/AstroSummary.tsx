import styles from "../components/AstroSummary.module.css";

interface AstroSummaryProps {
    planets: string[];
    onPlanetChange: (planetId: string) => void;
}

let currentPlanet: string = 'soleil';

const AstroSummary: React.FC<AstroSummaryProps> = ({ planets, onPlanetChange }) => {
    const handleClick = (planet: string) => {
        onPlanetChange(planet);
        currentPlanet = planet;
    }
    return(
        <div className={`flex flex-col justify-center items-center ${styles.container}`}>
            {planets.map(planet => (
                <button className={`${styles[planet]} flex ${currentPlanet === planet ? styles.selected : ''}`} onClick={() => handleClick(planet)}>
                    <p className="flex justify-end items-center">{planet.charAt(0).toUpperCase() + planet.slice(1)}</p>
                    <div className={`${styles.icon}`}></div>
                </button>
            ))}
        </div>
    )
}

export default AstroSummary;