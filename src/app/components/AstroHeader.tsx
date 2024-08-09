import styles from '@/app/components/AstroHeader.module.css';
import { useState } from 'react';
import { FpsView } from 'react-fps';
export interface AstroHeaderProps {
    planet: string;
    onUiVisibilityChange: (uiVisibility: boolean) => void;
}

const AstroHeader: React.FC<AstroHeaderProps> = ({
    planet,
    onUiVisibilityChange,
}) => {

    const [uiIsVisible, setUiVisibility] = useState(false);

    function showHideUi() {
        setUiVisibility(uiIsVisible ? false : true);
        onUiVisibilityChange(uiIsVisible);
    }

    return(
        <div className={`flex justify-between ${styles.header}`}>
            
          {/* {!uiIsVisible && (
            <FpsView/>
          )} */}
            <div className="flex flex-col">
                <h1 className={`${uiIsVisible ? styles.hidden : ''} ${styles.title}`}>Astro SS</h1>
                <h2 className={`${uiIsVisible ? styles.hidden : ''} ${styles.subtitle}`}>Le Système Solaire avec three.js</h2>
            </div>
            
            <div className={styles.tooltipContainer}>
                {!uiIsVisible && (
                   <div className={styles.tooltip}>
                   <p>Navigation</p>
                   <span className='flex items-center'>
                       <div className={styles.arrowLeft}></div>
                       <p>Précédent</p>
                   </span>
                   <span className='flex items-center'>
                       <div className={styles.arrowRight}></div>
                       <p>Suivant</p>
                   </span>
               </div> 
                )}

                {planet === 'soleil' && !uiIsVisible && (
                    <div className={`flex flex-col mt-3 ${styles.tooltip}`}>
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
                <button className={`flex items-center ${uiIsVisible ? styles.switchOff : ''} ${styles.toggleUi}`} onClick={showHideUi}>
                    <div className={`${!uiIsVisible ? styles.switchOn : ''} ${styles.switch}`}></div>
                </button>
            </div>
        </div>
    );
}

export default AstroHeader;