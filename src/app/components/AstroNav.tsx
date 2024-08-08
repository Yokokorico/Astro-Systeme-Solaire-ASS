import React, { KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import styles from '@/app/components/AstroNav.module.css';

interface AstroNavProps {
  planets: string[];
  selectedPlanetId: string;
  onPlanetChange: (planetId: string) => void;
}

const AstroNav: React.FC<AstroNavProps> = ({ planets, selectedPlanetId, onPlanetChange }) => {
  const [indexObjects, setIndexObjects] = useState(0);

  // Use effect to update indexObjects when selectedPlanetId changes
  useEffect(() => {
    const newIndex = planets.indexOf(selectedPlanetId);
    if (newIndex !== -1) {
      setIndexObjects(newIndex);
    }
  }, [selectedPlanetId, planets]);

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
  );
};

export default AstroNav;
