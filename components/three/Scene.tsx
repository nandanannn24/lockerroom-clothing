"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { ClothingModel } from "./ClothingModel";
import { Lights } from "./Lights";

// ─── Loading Fallback (inside Canvas) ───────────────────────────────

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#f5c518" wireframe />
    </mesh>
  );
}

// ─── Main Scene ─────────────────────────────────────────────────────
// CRITICAL: This component must NOT subscribe to any Zustand store
// at the top level. All reactive state (color, decal, productType)
// is consumed INSIDE <ClothingModel>, not here, so that <Canvas>
// never re-renders/remounts and WebGL context stays alive.

export default function Scene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        className="w-full h-full outline-none"
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Suspense fallback={<Loader />}>
          <Lights />
          
          {/* NO key prop — ClothingModel handles productType changes internally */}
          <ClothingModel />

          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.5}
            scale={5}
            blur={2.4}
          />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={1.5}
          maxDistance={4}
        />
      </Canvas>
    </div>
  );
}
