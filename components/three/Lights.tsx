"use client";

// ─── Lights ─────────────────────────────────────────────────────────
// Studio-quality lighting setup for clothing visualization.
// Uses a combination of ambient, directional, and spot lights
// to create soft shadows and highlight fabric details.

export function Lights() {
  return (
    <>
      {/* Base ambient fill - higher for softer shadows */}
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* Key light — broad and soft, moved further away */}
      <directionalLight
        position={[8, 8, 8]}
        intensity={0.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill light — opposite side, very soft */}
      <directionalLight position={[-8, 4, 4]} intensity={0.4} color="#e0e7ff" />

      {/* Rim light — back illumination, no sharp focus */}
      <directionalLight position={[0, 5, -8]} intensity={0.4} color="#fef08a" />

      {/* Bottom bounce fill to simulate ground reflection */}
      <directionalLight position={[0, -6, 0]} intensity={0.25} color="#ffffff" />
    </>
  );
}
