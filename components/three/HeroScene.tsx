"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

// ─── Hero 3D Background ─────────────────────────────────────────────
// A simplified, non-interactive R3F scene that renders a static
// T-shirt as the full-screen hero backdrop.

function HeroModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/t_shirt.glb");

  // Apply a dark, premium material to all meshes
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      materials.forEach((mat) => {
        if ("color" in mat) {
          (mat as THREE.MeshStandardMaterial).color.set("#1a1a1a");
          (mat as THREE.MeshStandardMaterial).roughness = 0.6;
          (mat as THREE.MeshStandardMaterial).metalness = 0.1;
          mat.needsUpdate = true;
        }
      });
    }
  });

  return (
    <Center>
      <group ref={groupRef} scale={1.8}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 30 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Warm ambient */}
        <ambientLight intensity={0.15} color="#ffecd2" />

        {/* Single dramatic gold-tinted key light */}
        <spotLight
          position={[3, 5, 4]}
          intensity={1.2}
          color="#ffecd2"
          angle={0.4}
          penumbra={0.8}
        />

        {/* Subtle cool fill from left */}
        <directionalLight position={[-3, 2, 2]} intensity={0.2} color="#c4d4ff" />

        {/* Gold rim from behind */}
        <spotLight
          position={[0, 3, -4]}
          intensity={0.6}
          color="#f5c518"
          angle={0.5}
          penumbra={1}
        />

        <HeroModel />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/t_shirt.glb");
