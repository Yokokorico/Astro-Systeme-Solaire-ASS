
import AstreDetails from './components/AstreDetails';
import ThreeScene from './components/ThreeScene'
import AstroNav from './components/AstroNav';

import "./variables.css";

function Home() {
  
  const astroPlanets = ["soleil", "mercure", "venus", "terre", "mars", "jupiter", "saturne", "neptune", "uranus"];

  return (
    <div>
      <ThreeScene />
        <AstroNav planets={astroPlanets}/>
      </div>
  )
}

export default Home;

