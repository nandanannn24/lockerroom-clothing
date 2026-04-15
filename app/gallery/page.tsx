"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function RotatingLogo() {
  // Use suspense to load the model
  const { scene } = useGLTF("/logo.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={modelRef} dispose={null} scale={2}>
      <primitive object={scene} />
    </group>
  );
}

export default function GalleryPage() {
  // Generate gambar 1 to 33
  const images = Array.from({ length: 33 }, (_, i) => `/gallery/gambar${i + 1}.webp`);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 flex flex-col items-center">
      {/* Header and 3D Decoration */}
      <div className="w-full flex flex-col items-center justify-center relative mb-16 px-4">
        <div className="h-[300px] w-full max-w-md absolute top-0 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <Environment preset="city" />
            <RotatingLogo />
          </Canvas>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tight relative z-10 mt-32 text-center drop-shadow-2xl">
          ALL <span className="text-[#f5c518]">DESIGN</span>
        </h1>
        <p className="text-gray-400 mt-4 text-center max-w-lg relative z-10">
          Koleksi hasil karya terbaik LockerRoom. Dari ide hingga material nyata, inilah dedikasi kami dalam setiap jahitan dan sablon.
        </p>
      </div>

      {/* Massive Bento / Masonry Grid */}
      <section className="w-full max-w-7xl px-4 md:px-8 mx-auto relative z-10">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, index) => (
            <div key={index} className="break-inside-avoid relative overflow-hidden rounded-xl bg-[#111] border border-white/5 group cursor-pointer">
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="aspect-square object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-[#f5c518] text-xs font-bold uppercase tracking-widest drop-shadow-md">LockerRoom</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <div className="mt-24 mb-12 flex justify-center w-full px-6 relative z-10">
        <a 
          href="https://www.instagram.com/lockerroom.cloth?igsh+MXN0aHJpMGU3c2YwOQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-8 md:px-12 py-5 bg-[#111] border border-[#f5c518]/30 hover:border-[#f5c518] rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_20px_rgba(245,197,24,0.1)] hover:shadow-[0_0_30px_rgba(245,197,24,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5c518]/0 via-[#f5c518]/10 to-[#f5c518]/0 rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          <span className="relative text-white font-bold text-sm md:text-base uppercase tracking-[0.2em] group-hover:text-[#f5c518] transition-colors flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            See All Detail In Instagram
          </span>
        </a>
      </div>
    </main>
  );
}
