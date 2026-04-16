"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

export function RotatingLogo() {
  const { scene } = useGLTF("/logo.glb");
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#f5c518",
            roughness: 0.2,
            metalness: 0.1
          });
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={modelRef} dispose={null} scale={3}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
