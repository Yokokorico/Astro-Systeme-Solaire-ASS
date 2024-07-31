'use client';
import { Box, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Planet } from "./Planet";

const ThreeScene = () => {
    const [hovered, setHovered]= useState(false);
 return(
    <div id="canvas-container">
        <Canvas style={{height: '100vh', width: '100vw'}}>
            <ambientLight intensity={1} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <Planet scale={[0.0071492,0.0071492, 0.0071492]} name="jupiter" position={[500, 0, 0]}/>
            <Planet scale={[0.0006378,0.0006378 ,0.0006378]} name="terre" position={[-500, 0 ,0 ]} />
            <Planet scale={[0.0696342,0.0696342, 0.0696342]} name="sun" />
            <OrbitControls />
        </Canvas>
    </div>
 )
};

export default ThreeScene;
