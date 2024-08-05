import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const CustomCamera: React.FC = () => {
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.position.set(0, 0, 250);
    perspectiveCamera.far = 10000;

    const handleResize = () => {
      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
      perspectiveCamera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ensure camera aspect ratio and renderer size are set on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, gl]);

  useFrame(() => {
    const targetPos = new THREE.Vector3();
    const earth = scene.getObjectByName("terre");
    
    if (earth) {
      earth.getWorldPosition(targetPos);

      // Adjust camera offset to position it slightly to the right of the planet
      const cameraOffset = new THREE.Vector3(0, 0, 4.5); // Increased value to move camera right
      const newCameraPosition = new THREE.Vector3().addVectors(
        targetPos,
        cameraOffset
      );

      camera.position.copy(newCameraPosition);

      const cameraLookAt = new THREE.Vector3();
      const cameraLookAtOffset = new THREE.Vector3().subVectors(
        targetPos,
        cameraLookAt
      );
      cameraLookAtOffset.setX(-2.4);
      cameraLookAtOffset.setY(0);
      cameraLookAtOffset.setZ(0);
      const newCameraLookAt = new THREE.Vector3().addVectors(
        targetPos,
        cameraLookAtOffset
      );

      camera.lookAt(newCameraLookAt);

      console.log(newCameraPosition, newCameraLookAt);
    }
  });

  return null;
};