"use client";

import { useGLTF, Float, Environment, OrbitControls, Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

// ─── Floating Logo Model ────────────────────────────────────────────
// Loads logo.glb and paints it LockerRoom Gold.
// Rotation is handled by OrbitControls autoRotate, NOT useFrame.

function LogoModel() {
  const gltf = useGLTF("/logo.glb");
  const scene = gltf.scene;

  // Paint every mesh gold
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.color) {
          mat.color.set("#FFD700");
          mat.metalness = 0.4;
          mat.roughness = 0.3;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <Center>
        <primitive object={scene} scale={[2.8, 2.8, 2.8]} dispose={null} />
      </Center>
    </Float>
  );
}

try {
  useGLTF.preload("/logo.glb");
} catch {}

export default function ProcessScene() {
  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center relative">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f5c518" />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#ffffff" />
        
        <LogoModel />

        <Environment preset="city" />
      </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
