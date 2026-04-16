"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { RotatingLogo } from "@/components/three/RotatingLogo";
import { RotatingTShirt } from "@/components/three/RotatingTShirt";

export default function GalleryPage() {
  // Generate gambar 1 to 33
  const images = Array.from({ length: 33 }, (_, i) => `/gallery/gambar${i + 1}.webp`);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-40 pb-16 flex flex-col items-center">
      {/* Header and 3D Decoration */}
      <div className="w-full flex flex-col items-center justify-center relative mb-24 px-4 h-[400px]">
        {/* Canvas is completely un-interactive to avoid scroll jacking */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-[100vw] h-[1200px] opacity-60 pointer-events-none z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <Environment preset="city" />
            <RotatingLogo />
          </Canvas>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-display font-bold text-white uppercase tracking-tight relative z-10 text-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none pt-24">
          ALL <span className="text-[#f5c518]">DESIGN</span>
        </h1>
        <p className="text-gray-300 mt-6 text-center max-w-lg relative z-10 text-sm md:text-base font-medium drop-shadow-xl bg-black/40 p-4 rounded-xl backdrop-blur-sm border border-white/10">
          Koleksi hasil karya terbaik LockerRoom. Dari ide hingga material nyata, inilah dedikasi kami dalam setiap jahitan dan sablon.
        </p>
      </div>

      {/* Elegant Bento Grid */}
      <section className="w-full max-w-7xl px-4 md:px-8 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((src, index) => {
            // Logic to create bento grid spanning
            let spanClass = "col-span-1 row-span-1";
            // Make every 5th image large (2x2)
            if (index % 5 === 0 && index < images.length - 1) {
              spanClass = "col-span-2 row-span-2 md:col-span-2 md:row-span-2";
            }
            // Make every 7th image wide
            else if (index % 7 === 0) {
               spanClass = "col-span-2 row-span-1 md:col-span-2 md:row-span-1";
            }

            return (
              <div key={index} className={`relative overflow-hidden rounded-xl bg-[#111] border border-white/5 group cursor-pointer ${spanClass}`}>
                <img 
                  src={src} 
                  alt={`Gallery image ${index + 1}`} 
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-[#f5c518] text-xs font-bold uppercase tracking-widest drop-shadow-md">LockerRoom</span>
                </div>
              </div>
            );
          })}

          {/* ── BENTO GRID 3D FILLER (Yellow T-Shirt) ── */}
          <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-xl bg-[#111] border border-white/10 flex items-center justify-center shadow-inner group">
             {/* Text Behind 3D Model */}
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 z-0 select-none">
                <span className="text-[#f5c518] font-display text-4xl md:text-6xl font-bold uppercase tracking-widest">PREMIUM</span>
                <span className="text-white font-display text-5xl md:text-7xl font-bold uppercase tracking-widest leading-5">QUALITY</span>
             </div>
             
             {/* 3D Canvas */}
             <div className="absolute inset-0 z-10">
               <RotatingTShirt />
             </div>
          </div>
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
