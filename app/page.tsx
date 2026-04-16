"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { MapSection } from "@/components/ui/MapSection";
import { useState, useEffect } from "react";

// Use dynamic import for ProcessScene to avoid SSR issues with 3D
const ProcessScene = dynamic(() => import("@/components/three/ProcessScene"), {
  ssr: false,
});

const PHONE_NUMBER = "6282144749764";
const PHONE_DISPLAY = "0821-4474-9764";

export default function HomePage() {
  const [hydrated, setHydrated] = useState(false);
  const [randomImages, setRandomImages] = useState<string[]>([
    "/Shirt/streetwear-collection.webp",
    "/Shirt/Corporate-Merchandise.webp",
    "/Shirt/premium-hoodie-design.webp",
    "/Shirt/team-esport-jersey.webp"
  ]);

  useEffect(() => {
    setHydrated(true);
    const getRandomImages = () => {
      const allImages = Array.from({ length: 33 }, (_, i) => `/gallery/gambar${i + 1}.webp`);
      const shuffled = [...allImages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };
    setRandomImages(getRandomImages());
    const interval = setInterval(() => {
      setRandomImages(getRandomImages());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="hero pt-24" id="hero-section">
        {/* Static Background instead of 3D Scene */}
        <div className="hero-canvas-bg bg-black">
          <img 
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity" 
            alt="Hero background" 
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            Premium Custom Clothing
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">DESAIN PAKAIAN</span>
            <span className="hero-title-line">SEUNIK DIRIMU</span>
          </h1>

          <p className="hero-subtitle">
            Buat desain kaos dan hoodie custom dengan konfigurator 2D interaktif mutakhir.
            Pilih warna, letakkan artwork Anda, dan lihat hasilnya secara real-time.
          </p>

          <div className="hero-actions">
            <Link href="/configurator" className="btn btn-primary btn-lg" id="cta-start">
              Mulai Desain
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <section className="relative w-[100vw] overflow-hidden whitespace-nowrap flex items-center bg-void border-y border-white/5 py-6">
        <div className="flex shrink-0 items-center gap-12 pr-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-display text-4xl md:text-5xl font-bold text-dim uppercase tracking-tighter">
              DESIGN <span className="text-gold mx-2">•</span> PRINT <span className="text-gold mx-2">•</span> LOCKERROOM <span className="text-gold mx-2">•</span> THE CLOTHING LAB <span className="text-gold mx-2">•</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-12 pr-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <span key={`dup-${i}`} className="font-display text-4xl md:text-5xl font-bold text-dim uppercase tracking-tighter">
              DESIGN <span className="text-gold mx-2">•</span> PRINT <span className="text-gold mx-2">•</span> LOCKERROOM <span className="text-gold mx-2">•</span> THE CLOTHING LAB <span className="text-gold mx-2">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* ══════════ OUR PROCESS ══════════ */}
      <section className="relative py-32 bg-[#0a0a0a] w-full flex justify-center overflow-hidden border-y border-white/5" id="our-process">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-6 w-full max-w-7xl mx-auto">
          <div className="relative z-10 bg-black/40 backdrop-blur-lg p-10 rounded-2xl border border-white/10 shadow-2xl w-full md:w-[450px] shrink-0">
            <p className="text-[#f5c518] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Process</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              KETELETIAN DALAM SETIAP JAHITAN
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Dari pemintalan benang kualitas tertinggi hingga teknik sablon terpresisi. Menggunakan alat kalibrasi warna terkini untuk memastikan desainmu diterjemahkan sempurna ke material fisik yang premium.
            </p>
          </div>
          <div className="w-full md:w-[500px] h-[400px] md:h-[500px] flex justify-center items-center shrink-0">
             <ProcessScene />
          </div>
        </div>
      </section>

      {/* ══════════ PORTFOLIO (BENTO GRID STYLE) ══════════ */}
      <section className="section-full" id="portfolio">
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem", marginBottom: "3rem" }}>
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">KARYA TERBAIK KAMI</h2>
          <div className="feature-divider" />
        </div>

        {/* Container Bento Grid: FULL WIDTH DENSE */}
        <div className="w-full px-2 md:px-3 xl:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[220px] md:auto-rows-[320px] xl:auto-rows-[380px]">

            {/* Kiri Atas (Mobile: Kiri Atas) */}
            <div className="relative overflow-hidden rounded-2xl col-span-1 md:col-start-1 md:row-start-1 group cursor-pointer bg-[#111]">
              <img src={hydrated ? randomImages[0] : "/Shirt/streetwear-collection.webp"} alt="Streetwear" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4 md:p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[#f5c518] font-bold text-sm md:text-xl mb-1">Streetwear</span>
                <span className="text-gray-300 text-[10px] md:text-xs">Washed Cotton</span>
              </div>
            </div>

            {/* Kiri Bawah (Mobile: Kanan Atas) */}
            <div className="relative overflow-hidden rounded-2xl col-span-1 md:col-start-1 md:row-start-2 group cursor-pointer bg-[#111]">
              <img src={hydrated ? randomImages[1] : "/Shirt/Corporate-Merchandise.webp"} alt="Event Merch" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4 md:p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[#f5c518] font-bold text-sm md:text-xl mb-1 line-clamp-1">Corp Merch</span>
                <span className="text-gray-300 text-[10px] md:text-xs">Combed 24s</span>
              </div>
            </div>

            {/* CENTER GEDE (Mobile: Tengah Gede span 2x2) THE HIGHLIGHT */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl col-span-2 row-span-2 md:col-span-2 md:col-start-2 md:row-start-1 group cursor-pointer bg-[#111] ring-1 ring-white/10 hover:ring-[#f5c518]/50 transition-all duration-700">
              {/* Gambar online aesthetic sablon/workshop */}
              <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop" alt="Workshop Setup" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 md:p-10">
                <div className="w-fit px-3 py-1 bg-[#f5c518] text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_0_15px_rgba(245,197,24,0.4)]">
                  The Workshop
                </div>
                <span className="text-white font-bold text-2xl md:text-4xl mb-2 font-display uppercase tracking-tight">Kualitas Sablon<br/>Tingkat Tinggi</span>
                <span className="text-gray-300 text-xs md:text-sm max-w-sm leading-relaxed hidden md:block">Peralatan sablon modern dengan kalibrasi warna presisi memastikan desainmu tercetak tajam dan tahan lama di setiap serat kain.</span>
              </div>
            </div>

            {/* Kanan Atas (Mobile: Kiri Bawah) */}
            <div className="relative overflow-hidden rounded-2xl col-span-1 md:col-start-4 md:row-start-1 group cursor-pointer bg-[#111]">
              <img src={hydrated ? randomImages[2] : "/Shirt/premium-hoodie-design.webp"} alt="Premium Hoodie" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4 md:p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[#f5c518] font-bold text-sm md:text-xl mb-1 line-clamp-1">Premium Hoodie</span>
                <span className="text-gray-300 text-[10px] md:text-xs">Heavyweight 330gsm</span>
              </div>
            </div>

            {/* Kanan Bawah (Mobile: Kanan Bawah) */}
            <div className="relative overflow-hidden rounded-2xl col-span-1 md:col-start-4 md:row-start-2 group cursor-pointer bg-[#111]">
              <img src={hydrated ? randomImages[3] : "/Shirt/team-esport-jersey.webp"} alt="Team Jersey" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4 md:p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[#f5c518] font-bold text-sm md:text-xl mb-1 line-clamp-1">Esports Jersey</span>
                <span className="text-gray-300 text-[10px] md:text-xs">Full Sublimation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ SECTION PETA (FIXED PURE BLOCK) ══════════ */}
      <section className="w-full h-[400px] md:h-[500px] bg-neutral-900 border-b border-white/10 flex flex-col relative z-0" id="lokasi">
        <MapSection />
      </section>

      {/* ══════════ SECTION KARTU KONTAK (JALUR ORDAL) ══════════ */}
      <section
        className="w-full bg-[#0a0a0a] px-4 md:px-6 flex justify-center border-b border-white/5 relative z-10"
        style={{ paddingTop: "120px", paddingBottom: "120px" }}
      >
        <div className="flex flex-row justify-center items-stretch w-full gap-3 md:gap-16 max-w-5xl mx-auto">

          {/* Kartu Alamat Studio */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-4 md:p-12 flex flex-col items-center justify-center text-center gap-2 md:gap-6 shadow-2xl w-1/2 max-w-[420px]">
            <div className="text-[#f5c518] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-gray-400 text-[9px] md:text-sm font-bold uppercase tracking-widest md:tracking-[0.2em] mb-1 md:mb-4">Alamat Studio</h3>
              <p className="text-white text-[10px] md:text-[15px] font-medium leading-tight md:leading-relaxed text-center">
                RT.006/RW.003, Beringin, Jiken, Kec. Tulangan, Kab. Sidoarjo
              </p>
            </div>
          </div>

          {/* Kartu Hubungi Kami */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-4 md:p-12 flex flex-col items-center justify-center text-center gap-2 md:gap-6 shadow-2xl w-1/2 max-w-[420px]">
            <div className="text-[#f5c518] shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-1 md:gap-2">
              <h3 className="text-gray-400 text-[9px] md:text-sm font-bold uppercase tracking-widest md:tracking-[0.2em] mb-1 md:mb-4">Hubungi Kami</h3>
              <p className="text-white text-xs md:text-3xl font-bold tracking-wider text-center">{PHONE_DISPLAY}</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}