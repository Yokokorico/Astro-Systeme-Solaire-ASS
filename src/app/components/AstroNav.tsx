'use client'

import { useState } from "react";
import styles from '@/app/components/AstroNav.module.css';

interface AstroNavProps {
    planets: string[],
    onPlanetChange: (planet: string) => void;
}

const AstroNav: React.FC<AstroNavProps> = ({ planets, onPlanetChange }) => {

    const [isAtMin, setAtMin] = useState(true);
    const [isAtMax, setAtMax] = useState(false);
    const [indexObjects, setIndexObjects] = useState(0);

    const countObjects = planets.length; // nombre d'objets visitables, défini par le tableau des objets

    function previous() {
        indexObjects === countObjects - 1 ? setAtMax(false) : '';
        setIndexObjects(indexObjects - 1);
        onPlanetChange(planets[indexObjects - 1]);
        indexObjects === 1 ? setAtMin(true) : '';
    }

    function next() {
        indexObjects === 0 ? setAtMin(false) : '';
        setIndexObjects(indexObjects + 1);
        onPlanetChange(planets[indexObjects + 1]);
        indexObjects === countObjects - 2 ? setAtMax(true) : '';
    }



    return(
        <div className="flex justify-center items-center" id={styles.astroNav}>
            <button className={`flex justify-center items-center ${isAtMin ? 'locked' : ''}`} id={styles.previous} onClick={previous}>
                <div className={styles.chevronDot}></div>
            </button>

            <p className="flex justify-center items-center" id={styles.current}>
                {planets[indexObjects].charAt(0).toUpperCase() + planets[indexObjects].slice(1)}
            </p>

            <button className={`flex justify-center items-center ${isAtMax ? 'locked' : ''}`} id={styles.next} onClick={next}>
                <div className={styles.chevronDot}></div>
            </button>
        </div>
    );
};

export default AstroNav;
