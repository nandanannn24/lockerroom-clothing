"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { useGLTF, Decal, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useConfigStore } from "@/lib/store";

// ── Suspended Decal Component ──
function DecalTexture({ meshRef, imageUrl }: { meshRef: React.RefObject<THREE.Mesh>; imageUrl: string }) {
  const texture = useTexture(imageUrl);

  // FIX WARNA: Biar warna logo kga pudar pucat macem baju luntur
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;

  const decalPosition = useConfigStore((s) => s.decalPosition);
  const decalScale = useConfigStore((s) => s.decalScale);
  const decalRotation = useConfigStore((s) => s.decalRotation);

  if (!meshRef.current) return null;

  const rotationRad = (decalRotation * Math.PI) / 180;

  return (
    <Decal
      mesh={meshRef as any} // Kasih 'as any' biar TypeScript kga banyak bacot
      position={[decalPosition[0], decalPosition[1], 0.2]}
      rotation={[0, 0, rotationRad]}
      scale={[decalScale, decalScale, 5]}
    >
      {/* Materialnya kita pisah ke dalem sini biar rapi dan kga diomelin TS */}
      <meshStandardMaterial
        map={texture}
        transparent={true} // WAJIB MUTLAK biar background logo lu kga jadi kotak item!
        depthTest={true}
        polygonOffset={true}
        polygonOffsetFactor={-1}
      />
    </Decal>
  );
}

export function ClothingModel() {
  const groupRef = useRef<THREE.Group>(null!);

  // FIX UTAMA: Pake STATE biar React me-render ulang saat target mesh-nya ketemu!
  const [targetMesh, setTargetMesh] = useState<THREE.Mesh | null>(null);
  const targetMeshRef = useRef<THREE.Mesh>(null!);

  const meshColor = useConfigStore((s) => s.meshColor);
  const productType = useConfigStore((s) => s.productType);
  const decalImage = useConfigStore((s) => s.decalImage);

  // Load both models upfront so switching is instant
  const tshirtGltf = useGLTF("/t_shirt.glb");
  const hoodieGltf = useGLTF("/hoodie.glb");

  const scene = productType === "hoodie" ? hoodieGltf.scene : tshirtGltf.scene;

  // Auto-detect target mesh yang SANGAT PRESISI (Sesuai nama di Three.js Editor)
  useEffect(() => {
    let found: THREE.Mesh | null = null;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshName = child.name;
        // Target presisi berdasarkan temuan lu kemaren!
        if (productType === "hoodie" && meshName.includes("Hoodie_FABRIC")) {
          found = child as THREE.Mesh;
        } else if (productType !== "hoodie" && meshName === "Object_10") {
          found = child as THREE.Mesh;
        }
      }
    });

    // Fallback jaga-jaga kalo nama node-nya typo
    if (!found) {
      scene.traverse((child) => {
        if (!found && (child as THREE.Mesh).isMesh) {
          found = child as THREE.Mesh;
        }
      });
    }

    if (found) {
      targetMeshRef.current = found;
      setTargetMesh(found); // Trigger render ulang sablonnya!
    }
  }, [scene, productType]);

  // Apply color to all meshes
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial ||
              mat instanceof THREE.MeshPhysicalMaterial) {
              mat.color.set(meshColor);
              mat.roughness = 0.9;
              mat.metalness = 0.0;
              mat.needsUpdate = true;
            } else if (
              mat instanceof THREE.MeshBasicMaterial ||
              mat instanceof THREE.MeshPhongMaterial ||
              mat instanceof THREE.MeshLambertMaterial) {
              mat.color.set(meshColor);
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [scene, meshColor]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} dispose={null} scale={[3, 3, 3]} position={[0, -0.2, 0]} />

      {/* Render Decal cuma kalo gambar ada DAN state mesh beneran udah tersimpan */}
      {decalImage && targetMesh && (
        <Suspense fallback={null}>
          <DecalTexture meshRef={targetMeshRef} imageUrl={decalImage} />
        </Suspense>
      )}
    </group>
  );
}

// Preload both models
useGLTF.preload("/t_shirt.glb");
useGLTF.preload("/hoodie.glb");