'use client';
import { Box, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Planet } from "./Planet";

const ThreeScene = () => {
    const [hovered, setHovered]= useState(false);
 return(
    <div id="canvas-container">
        <Canvas style={{height: '100vh', width: '100vw', background: 'black'}}>
            <ambientLight intensity={1} />
            <directionalLight color="white" position={[0, 0, 5]} />
            {/* <Planet scale={[0.0071492,0.0071492, 0.0071492]} name="jupiter" position={[500, 0, 0]}/>
            <Planet scale={[0.0006378,0.0006378 ,0.0006378]} name="terre" position={[-500, 0 ,0 ]} />
            <Planet scale={[0.0696342,0.0696342, 0.0696342]} name="soleil" /> 
            <Planet scale={[0.0002440,0.0002440 ,0.0002440]} name="mercure"/>
            <Planet scale={[0.0003396,0.0003396 ,0.0003396]} name="mars"/>
            <Planet scale={[0.002764,0.002764 ,0.002764]} name="neptune"/>
            <Planet scale={[0.006028,0.006028 ,0.006028]} name="saturne"/>
            <Planet scale={[0.002555,0.002555 ,0.002555]} name="uranus"/>*/}
            <Planet scale={[0.0006051,0.0006051 ,0.0006051]} name="venus"/>

            <OrbitControls />
        </Canvas>
    </div>
 )
};

export default ThreeScene;
