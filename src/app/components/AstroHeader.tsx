import styles from '@/app/components/AstroHeader.module.css';
import { FpsView } from 'react-fps';
export interface AstreDetailsProps {
    planet: string;
}

const AstroHeader: React.FC<AstreDetailsProps> = ({ planet }) => {

    return(
        <div className={`flex justify-between ${styles.header}`}>
            <FpsView/>
                <div className="flex flex-col">
                <h1 className={styles.title}>Astro SS</h1>
                <h2 className={styles.subtitle}>Le Système Solaire avec three.js</h2>
            </div>
            
            <div className={styles.tooltipContainer}>
            {planet === 'soleil' && (
                <div className={`flex flex-col ${styles.tooltip}`}>
                    <p>Contrôle de la caméra</p>

                    <span className='flex items-center'>
                        <div className={styles.mouseWheel}></div>
                        <p>Zoom</p>
                    </span>
                    <span className='flex items-center'>
                        <div className={styles.leftClick}></div>
                        <p>Rotation</p>
                    </span>
                    <span className='flex items-center'>
                        <div className={styles.rightClick}></div>
                        <p>Déplacement</p>
                    </span>
                    
                    
                </div>
            )}
            </div>
        </div>
    );
}

export default AstroHeader;