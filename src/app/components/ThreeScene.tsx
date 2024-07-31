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
            <Planet scale={[0.0071492,0.0071492, 0.0071492]} name="jupiter" position={[250, 0, -100]}/>
            <Planet scale={[0.0006378,0.0006378 ,0.0006378]} name="terre" position={[150, 0, -100]} />
            <Planet scale={[0.0696342,0.0696342, 0.0696342]} name="sun" position={[0, 0, -100]}/>
            <OrbitControls />
        </Canvas>
    </div>
 )
};

export default ThreeScene;
