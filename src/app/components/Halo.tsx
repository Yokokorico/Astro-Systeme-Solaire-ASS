import { Sphere } from "@react-three/drei";
import React from "react";
import { FakeGlowMaterial } from "./FakeGlowMaterial";
import {
  AdditiveBlending,
  BackSide,
  Color,
  ColorRepresentation,
  FrontSide,
  Side,
  Vector3,
} from "three";

const vertexShader = `
varying vec3 vNormal;
varying vec3 eyeVector;

void main() {
    // modelMatrix transforms the coordinates local to the model into world space
    vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );

    // normalMatrix is a matrix that is used to transform normals from object space to view space.
    vNormal = normalize( normalMatrix * normal );

    // vector pointing from camera to vertex in view space
    eyeVector = normalize(mvPos.xyz);

    gl_Position = projectionMatrix * mvPos;
}`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 eyeVector;
uniform float atmOpacity;
uniform float atmPowFactor;
uniform float atmMultiplier;
uniform vec3 atmColor;
uniform float r;
uniform float g;
uniform float b;

void main() {
    // Starting from the atmosphere edge, dotP would increase from 0 to 1
    float dotP = dot( vNormal, eyeVector );
    // This factor is to create the effect of a realistic thickening of the atmosphere coloring
    float factor = pow(dotP, atmPowFactor) * atmMultiplier;
    // Adding in a bit of dotP to the color to make it whiter while thickening
    vec3 color = vec3(r, g + dotP / 4.5, b + dotP / 4.5);

    // use atmOpacity to control the overall intensity of the atmospheric color
    gl_FragColor = vec4(color, atmOpacity) * factor;

    // (optional) colorSpace conversion for output
    // gl_FragColor = linearToOutputTexel( gl_FragColor );
}`;

const params = {
  // general scene params
  sunIntensity: 1.3, // brightness of the sun
  speedFactor: 2.0, // rotation speed of the earth
  metalness: 0.1,
  atmOpacity: { value: 0.7 },
  atmPowFactor: { value: 4.1 },
  atmMultiplier: { value: 9.5 },
};

type Props = {
  radiusSphere: number;
  color?: Color;
};

export const Halo = ({ radiusSphere, color }: Props) => {

  return (
    <mesh>
      <Sphere args={[radiusSphere, 256, 128]} position={[0, 0, 0]}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            atmOpacity: { value: params.atmOpacity.value },
            atmPowFactor: { value: params.atmPowFactor.value },
            atmMultiplier: { value: params.atmMultiplier.value },
            atmColor: { value: color },
            r: { value: color?.r },
            g: { value: color?.g },
            b: { value: color?.b },
          }}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </Sphere>
    </mesh>
  );
};

export default Halo;
