
import AstreDetails from './components/AstreDetails';
import ThreeScene from './components/ThreeScene'
import AstroNav from './components/AstroNav';

import "./variables.css";

function Home() {
  
  const astroPlanets = ["soleil", "mercure", "venus", "terre", "mars", "jupiter", "saturne", "neptune", "uranus"];
  const astroCamera = {
    position: {x: 0, y: 300, z: -180},
    lookAt: {x: 0, y: -30, z: 0},
  };

  return (
    <div>
      <ThreeScene position={astroCamera.position} lookAt={astroCamera.lookAt}/>
        <AstroNav planets={astroPlanets}/>
      </div>
    )
  }

export default Home;

