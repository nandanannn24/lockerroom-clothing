"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function TShirtModel() {
  const { scene } = useGLTF("/t_shirt.glb");
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshStandardMaterial({ 
            color: "#f5c518",
            roughness: 0.6,
            metalness: 0.2
          });
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group ref={modelRef} dispose={null} scale={2} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export function RotatingTShirt() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2.5} />
      <Environment preset="city" />
      <TShirtModel />
    </Canvas>
  );
}
