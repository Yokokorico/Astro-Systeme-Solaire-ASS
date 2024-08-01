export const navigateToPlanet = (position) => {
    const controls = controlsRef.current;
    if (controls) {
      new THREE.Vector3(...position).lerp(controls.target, 0.1);
      controls.target.set(...position);
      controls.update();
    }
  };
