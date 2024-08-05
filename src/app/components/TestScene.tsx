import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface AstroBody {
  radius: number;
  widthSegments: number;
  heightSegments: number;
  texture: string;
  sideralOrbit: number;
  distance: number;
  rotationSpeed: number;
}

interface AstroBodies {
  [key: string]: AstroBody;
}

const astroBodies: AstroBodies = {
  sun: {
    radius: 64,
    widthSegments: 256,
    heightSegments: 128,
    texture: "2k_sun.jpg",
    
    sideralOrbit: 0,
    distance: 0,
    rotationSpeed: 0.0001,
  },
  mercury: {
    radius: 2,
    widthSegments: 128,
    heightSegments: 64,
    texture: "2k_mercury.jpg",
    distance: 80,
    sideralOrbit: 0.0025,
    rotationSpeed: 0.0005,
  },
  venus: {
    radius: 2,
    widthSegments: 128,
    heightSegments: 64,
    texture: "2k_venus_atmosphere.jpg",
    distance: 100,
    sideralOrbit: 0.001,
    rotationSpeed: 0.001,
  },
  earth: {
    radius: 2,
    widthSegments: 128,
    heightSegments: 64,
    texture: "2k_earth_daymap.jpg",
    distance: 120,
    sideralOrbit: 0.00075,
    rotationSpeed: 0.0002,
  },
};

const AstroObject: React.FC<{ astroBody: AstroBody; name: string }> = ({ astroBody, name }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(`/${astroBody.texture}`);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += astroBody.sideralOrbit;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += astroBody.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} name={name} position={[astroBody.distance, 0, 0]}>
        <sphereGeometry args={[astroBody.radius, astroBody.widthSegments, astroBody.heightSegments]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
};

const Sun: React.FC<{ astroBody: AstroBody }> = ({ astroBody }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(`/${astroBody.texture}`);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += astroBody.rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[astroBody.radius, astroBody.widthSegments, astroBody.heightSegments]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const CustomCamera: React.FC = () => {
  const { camera, gl, scene } = useThree();
  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.position.set(0, 0, 250);
    const handleResize = () => {
      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
      perspectiveCamera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, gl]);

  useFrame(() => {
    const newPos = new THREE.Vector3();
    const targetPos = new THREE.Vector3();
    const earth = scene.getObjectByName('earth');
    if (earth) {
      earth.getWorldPosition(targetPos);

      const cameraOffset = new THREE.Vector3(0, 0, 4);
      const newCameraPosition = new THREE.Vector3().addVectors(targetPos, cameraOffset);

      camera.position.copy(newCameraPosition);
      camera.lookAt(targetPos);
    }
  });

  return null;
};

const Scene: React.FC = () => {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <CustomCamera />
      <ambientLight intensity={0.5} />
      <Sun astroBody={astroBodies.sun} />
      {Object.entries(astroBodies).map(([key, astroBody]) => {
        if (key !== "sun") {
          return <AstroObject key={key} astroBody={astroBody} name={key} />;
        }
        return null;
      })}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
