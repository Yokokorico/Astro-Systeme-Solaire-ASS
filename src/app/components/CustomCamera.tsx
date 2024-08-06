import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface CameraProps {
  cameraPositionOffset?: number;
  cameraLookAtOffset?: number;
  cameraPlanetFocused?: string;
}
export const CustomCamera: React.FC<CameraProps> = ({ cameraPositionOffset, cameraLookAtOffset, cameraPlanetFocused }) => {
  
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    console.log('focus camera: ', cameraPlanetFocused, 'position offset: ', cameraPositionOffset, 'look at offset: ', cameraLookAtOffset);
  }), [cameraPlanetFocused, cameraPositionOffset, cameraLookAtOffset];
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
    let targetObject: THREE.Object3D | undefined;

    scene.traverse((object) => {
      
      if (object instanceof THREE.Mesh && object.name === cameraPlanetFocused) {
        targetObject = object;        
      }
    });

    if (targetObject) {
      targetObject.getWorldPosition(targetPos);

      const cameraOffset = new THREE.Vector3(0, 0, 7); // Adjust as needed
      const newCameraPosition = new THREE.Vector3().addVectors(
        targetPos,
        cameraOffset
      );

      camera.position.copy(newCameraPosition);

      const cameraLookAtOffset = new THREE.Vector3(-2.4, 0, 0); // Adjust as needed
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
