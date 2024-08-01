'use client'

import { useState } from "react";
import styles from '@/app/components/AstroNav.module.css';

const AstroNav = () => {

    const [isAtMin, setAtMin] = useState(true);
    const [isAtMax, setAtMax] = useState(false);
    const [indexObjects, setIndexObjects] = useState(0);

    const countObjects = 3; // nombre d'objets visitables, défini par le tableau des objets

    function previous() {
        setIndexObjects(indexObjects - 1);
        indexObjects === countObjects ? setAtMax(false) : '';
        indexObjects === 1 ? setAtMin(true) : '';
    }

    function next() {
        indexObjects === 0 ? setAtMin(false) : '';
        setIndexObjects(indexObjects + 1);
        indexObjects === countObjects - 1 ? setAtMax(true) : '';
    }

    return(
        <div className="flex justify-center items-center" id={styles.astroNav}>
                <button className={`flex justify-center items-center ${isAtMin ? 'locked' : ''}`} id={styles.previous} onClick={previous}>
                    <div className={styles.chevronDot}></div>
                </button>

            <p className="flex justify-center items-center" id={styles.current}>Système solaire {indexObjects}</p>

                <button className={`flex justify-center items-center ${isAtMax ? 'locked' : ''}`} id={styles.next} onClick={next}>
                    <div className={styles.chevronDot}></div>
                </button>
        </div>
    )
};

export default AstroNav;
