"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Center } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

function LogoModel() {
  const { scene } = useGLTF("/logo.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#f5c518",
            roughness: 0.3,
            metalness: 0.7
          });
        }
      });
    }
  }, [scene]);

  return (
    <group scale={1.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#f5c518" wireframe />
    </mesh>
  );
}

export default function ProcessScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: false, antialias: true, alpha: true }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          <Environment preset="city" />
          <LogoModel />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      {/* Interaction Hint */}
    </div>
  );
}
