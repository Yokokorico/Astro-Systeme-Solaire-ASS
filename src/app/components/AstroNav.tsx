'use client'

import { useState } from "react";
import styles from '@/app/components/AstroNav.module.css';

const AstroNav = () => {
    const [hovered, setHovered]= useState(false);

    function previous() {
        console.log('previous');
    }

    function next() {
        console.log('next');
    }

 return(
    <div className="flex justify-center items-center" id={styles.astroNav}>
            <button className="flex justify-center items-center" id={styles.previous} onClick={previous}>
                <div className={styles.chevronDot}></div>
            </button>

        <p className="flex justify-center items-center" id={styles.current}>Soleil</p>

            <button className="flex justify-center items-center" id={styles.next} onClick={next}>
                <div className={styles.chevronDot}></div>
            </button>
    </div>
 )
};

export default AstroNav;
