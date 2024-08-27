import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/app/components/AstroNav.module.css';

interface AstroNavProps {
  planets: string[];
  selectedPlanetId: string;
  onPlanetChange: (planetId: string) => void;
  onSpeedChange: (speed: number) => void;
}

const AstroNav: React.FC<AstroNavProps> = ({ planets, selectedPlanetId, onPlanetChange, onSpeedChange }) => {
  const [indexObjects, setIndexObjects] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [isPaused, setPaused] = useState(false);

  // Use effect to update indexObjects when selectedPlanetId changes
  useEffect(() => {
    const newIndex = planets.indexOf(selectedPlanetId);
    if (newIndex !== -1) {
      setIndexObjects(newIndex);
    }
  }, [selectedPlanetId, planets]);

  const setSpeed = (val: number) => {
    setPaused(false);
    setCurrentSpeed(val);
    onSpeedChange(val);
  }

  let previousSpeed = 1;

  const switchPlayPause = () => {
    console.log(isPaused)
    isPaused ? setPlay() : setPause();
  }

  const setPlay = () => {
    setPaused(false);
    onSpeedChange(currentSpeed);
  }

  const setPause = () => {
    setPaused(true);
    previousSpeed = currentSpeed;
    onSpeedChange(0);
  }

  const countObjects = planets.length;

  const previous = () => {
    if (indexObjects > 0) {
      const newIndex = indexObjects - 1;
      setIndexObjects(newIndex);
      onPlanetChange(planets[newIndex]);
    }
  };

  const next = () => {
    if (indexObjects < countObjects - 1) {
      const newIndex = indexObjects + 1;
      setIndexObjects(newIndex);
      onPlanetChange(planets[newIndex]);
    }
  };

  const [keyWasPressed, setKeyWasPressed] = useState(false);
  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = useCallback((event) => {
    if (!keyWasPressed) {
      if (event.key === "ArrowLeft") {
        previous();
      } else if (event.key === "ArrowRight") {
        next();
      }
      setKeyWasPressed(true);
    }
  }, [keyWasPressed]);

  const handleKeyUp = useCallback(() => {
    setKeyWasPressed(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className={`flex justify-center ${styles.container}`}>.
      <div className={`flex flex-col gap-1 ${styles.adjustSpeed} `}>
        <p className='text-center'>Vitesse</p>
        <button className={` ${currentSpeed === 1 ? styles.currentSpeedBtn : ''}`} onClick={() => setSpeed(1)}>x1</button>
        <button className={` ${currentSpeed === 10 ? styles.currentSpeedBtn : ''}`} onClick={() => setSpeed(10)}>x10</button>
        <button className={` ${currentSpeed === 100 ? styles.currentSpeedBtn : ''}`} onClick={() => setSpeed(100)}>x100</button>
        <button className={` ${!isPaused ? styles.btnPlay : styles.btnPause}`} onClick={() => switchPlayPause()} id={ styles.play }></button>
      </div>
      <div className="flex justify-center items-center" id={styles.astroNav}>
        <button
          className={`flex justify-center items-center ${indexObjects === 0 ? 'locked' : ''}`}
          id={styles.previous}
          onClick={previous}
        >
          <div className={styles.chevronDot}></div>
        </button>

        <p className="flex justify-center items-center" id={styles.current}>
          {planets[indexObjects].charAt(0).toUpperCase() + planets[indexObjects].slice(1)}
        </p>

        <button
          className={`flex justify-center items-center ${indexObjects === countObjects - 1 ? 'locked' : ''}`}
          id={styles.next}
          onClick={next}
          // onKeyDown={handleKeyDown}
        >
          <div className={styles.chevronDot}></div>
        </button>
      </div>
    </div>
    
  );
};

export default AstroNav;
