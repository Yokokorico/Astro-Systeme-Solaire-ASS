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
  let targetIsSun: boolean = true;
  
  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.position.set(2500, 5000, 10000);
    perspectiveCamera.far = 1000000;
    perspectiveCamera.fov = 40;

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
      
      if (object instanceof THREE.Mesh && object.name === cameraPlanetFocused && object.name !== 'soleil') {
        
        targetObject = object;        
      }
    });

    if (targetObject) {
      targetObject.getWorldPosition(targetPos);

      let cameraOffset;
      if (targetObject.name === 'soleil') {
        cameraOffset = new THREE.Vector3(0, cameraPositionOffset! / 2, cameraPositionOffset); // Adjust as needed
      } else {
        cameraOffset = new THREE.Vector3(0, 0, cameraPositionOffset); // Adjust as needed
      }
      const newCameraPosition = new THREE.Vector3().addVectors(
        targetPos,
        cameraOffset
      );

      camera.position.copy(newCameraPosition);

      const newcameraLookAtOffset = new THREE.Vector3(cameraLookAtOffset, 0, 0); // Adjust as needed
      const newCameraLookAt = new THREE.Vector3().addVectors(
        targetPos,
        newcameraLookAtOffset
      );

      camera.lookAt(newCameraLookAt);
    }
  });

  return null;
};
