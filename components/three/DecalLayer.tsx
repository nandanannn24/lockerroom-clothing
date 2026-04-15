"use client";

import { Suspense } from "react";
import { Decal } from "@react-three/drei";
import * as THREE from "three";
import { useConfigStore } from "@/lib/store";

// ─── Decal Layer ────────────────────────────────────────────────────
// Projects user-uploaded images onto the parent mesh surface.
// This is a standalone component that can be used independently
// from ClothingModel's built-in decal rendering.

interface DecalLayerProps {
  meshRef: React.RefObject<THREE.Mesh>;
}

function DecalProjection({ meshRef }: { meshRef: React.RefObject<THREE.Mesh> }) {
  const decalImage = useConfigStore((s) => s.decalImage);
  const decalPosition = useConfigStore((s) => s.decalPosition);
  const decalScale = useConfigStore((s) => s.decalScale);
  const decalRotation = useConfigStore((s) => s.decalRotation);

  // Load texture manually to avoid Suspense issues with large base64 images
  const texture = (() => {
    if (!decalImage) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(decalImage);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();

  // If there's no valid image or no valid mesh, do not render Decal
  if (!texture || !meshRef.current) return null;

  // Convert rotation from degrees to radians
  const rotationRad = (decalRotation * Math.PI) / 180;

  return (
    <Decal
      position={[decalPosition[0], decalPosition[1], 0.15]}
      rotation={[0, 0, rotationRad]}
      scale={[decalScale, decalScale, 1]}
      mesh={meshRef}
    >
      <meshBasicMaterial
        map={texture}
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
        depthTest
        depthWrite={false}
      />
    </Decal>
  );
}

export function DecalLayer({ meshRef }: DecalLayerProps) {
  const decalImage = useConfigStore((s) => s.decalImage);

  // Only render the Decal when an image is uploaded
  if (!decalImage) return null;

  return (
    <Suspense fallback={null}>
      <DecalProjection meshRef={meshRef} />
    </Suspense>
  );
}
