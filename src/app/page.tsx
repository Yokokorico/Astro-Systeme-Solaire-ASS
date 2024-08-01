
import { div } from 'three/webgpu';
import ThreeScene from './components/ThreeScene'
import AstroNav from './components/AstroNav';

import "./variables.css";

function Home() {
  return (
      <div>
        <ThreeScene />
        <AstroNav />
      </div>
  )
}

export default Home;

