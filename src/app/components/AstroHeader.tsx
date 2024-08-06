import styles from '@/app/components/AstroHeader.module.css';

const AstroHeader = () => {

    return(
        <div className={styles.header}>
            <div className="flex flex-col">
                <h1 className={styles.title}>Astro SS</h1>
                <h2 className={styles.subtitle}>Le Système Solaire avec three.js</h2>
            </div>
        </div>
    );
}

export default AstroHeader;