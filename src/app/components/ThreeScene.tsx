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
            <directionalLight color="red" position={[0, 0, 5]} />
            <Planet scale={[0.1, 0.1, 0.1]} name="Jupiter"/>
            <Box></Box>
            <OrbitControls />
        </Canvas>
    </div>
 )
};

export default ThreeScene;
