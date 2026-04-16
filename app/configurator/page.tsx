"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { ColorPicker } from "@/components/configurator/ColorPicker";
import { ImageUploader } from "@/components/configurator/ImageUploader";
import { DecalControls } from "@/components/configurator/DecalControls";
import { MockupCanvas } from "@/components/configurator/MockupCanvas";
import { useConfigStore, PRODUCTS_2D } from "@/lib/store";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const PHONE_NUMBER = "6282144749764";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ConfiguratorPage() {
  const [showTools, setShowTools] = useState(true);
  
  const { 
    selectedModel, setSelectedModel, 
    meshColor, 
    activeSide, setActiveSide,
    selectedSize, setSelectedSize, 
    quantity, setQuantity,
    decals
  } = useConfigStore();

  const currentProduct = PRODUCTS_2D.find((p) => p.id === selectedModel) || PRODUCTS_2D[0];
  const totalPrice = currentProduct.price * quantity;
  const hasDecal = decals.front.image || decals.back.image;

  const waMessage = encodeURIComponent(
    `Halo min! Saya sudah membuat kaos ${currentProduct.label} ukuran ${selectedSize} warna ${meshColor}. ` +
    `Harga: ${formatPrice(totalPrice)}. ` +
    `Gambar hasil editan sudah saya download dan akan saya kirimkan di chat ini. Apakah bisa dibuatkan sekarang?`
  );

  const handleCheckout = async () => {
    const node = document.getElementById("mockup-canvas-capture");
    if (!node) return;
    
    try {
      const dataUrl = await toPng(node, { quality: 1, backgroundColor: "#0a0a0a" });
      
      // Auto-download image
      const link = document.createElement("a");
      link.download = `LockerRoom_Design_${currentProduct.label.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${waMessage}`, "_blank");
    } catch (err) {
      console.error("Error generating mockup image:", err);
      alert("Gagal memproses gambar. Pastikan gambar desain sudah dimuat sepenuhnya.");
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a0a]" id="configurator-page">

      {/* ── 2D Canvas Layer ── */}
      <div className="absolute inset-0 z-0 animate-fade-in pointer-events-auto h-[100dvh] pb-[60vh] md:pb-0 flex flex-col justify-center">
        {/* Toggle Front Back (Desktop: Top Center, Mobile: Top bounds) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex bg-white/10 p-1 border border-white/15 rounded-full backdrop-blur-md">
          <button
            onClick={() => setActiveSide("front")}
            className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
              activeSide === "front" ? "bg-[#f5c518] text-black shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            Depan
          </button>
          <button
            onClick={() => setActiveSide("back")}
            className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
              activeSide === "back" ? "bg-[#f5c518] text-black shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            Belakang
          </button>
        </div>

        <MockupCanvas />
      </div>

      {/* ── UI Overlay Wrapper (Responsive Mobile vs Desktop) ── */}
      <div className={`relative z-10 w-full h-[100dvh] pointer-events-none overflow-y-auto flex flex-col md:block hide-scrollbar ${showTools ? "" : "overflow-hidden"}`}>

        {/* Tombol Toggle Tools (Hanya Mobile) */}
        <button 
          onClick={() => setShowTools(!showTools)}
          className="fixed top-24 right-4 z-50 md:hidden w-12 h-12 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[#f5c518] shadow-lg pointer-events-auto transition-transform hover:scale-105 active:scale-95"
        >
          {showTools ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>

        {/* Spacer khusus di Mobile biar model tetep kelihatan */}
        <div className="min-h-[45vh] shrink-0 w-full md:hidden pointer-events-none" />

        {/* Container Menu (Mobile: Scrollable Bottom Sheet | Desktop: Absolute Kiri Kanan) */}
        <div className={`flex flex-col gap-8 p-6 pt-10 bg-[#0a0a0a]/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[2rem] pointer-events-auto md:bg-transparent md:border-none md:rounded-none md:p-0 md:block pb-12 md:pb-0 shadow-[0_-20px_50px_rgba(0,0,0,0.7)] md:shadow-none relative transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${showTools ? "translate-y-0" : "translate-y-[150%] md:translate-y-0"}`}>

          {/* Mobile Drawer Handle */}
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto absolute top-4 left-1/2 -translate-x-1/2 md:hidden" />

          {/* ── Left Panel ── */}
          <div className="w-full flex flex-col gap-6 md:absolute md:left-8 md:top-[110px] md:w-[340px] md:max-h-[calc(100vh-140px)] md:overflow-y-auto hide-scrollbar md:bg-[rgba(15,15,15,0.7)] md:backdrop-blur-2xl md:border md:border-white/10 md:rounded-[2rem] md:p-7 md:shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-slide-right">

            {/* Pilih Produk */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#f5c518] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#f5c518] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#f5c518] rounded-full"></span>
                </span>
                Model Pakaian
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {PRODUCTS_2D.map((p) => (
                  <button
                    key={p.id}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border text-center transition-all duration-300 ${selectedModel === p.id
                        ? "bg-[#f5c518] text-black border-[#f5c518] shadow-[0_0_15px_rgba(245,197,24,0.15)]"
                        : "border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    onClick={() => setSelectedModel(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Warna Material */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#f5c518] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#f5c518] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#f5c518] rounded-full"></span>
                </span>
                Warna Dasar
              </h2>
              <ColorPicker />
            </div>
          </div>

          {/* Garis pemisah khusus mobile di antara panel kiri & kanan */}
          <div className="w-full h-[1px] bg-white/10 md:hidden" />

          {/* ── Right Panel ── */}
          <div className="w-full flex flex-col gap-6 md:absolute md:right-8 md:top-[110px] md:w-[340px] md:max-h-[calc(100vh-140px)] md:overflow-y-auto hide-scrollbar md:bg-[rgba(15,15,15,0.7)] md:backdrop-blur-2xl md:border md:border-white/10 md:rounded-[2rem] md:p-7 md:shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-slide-left">

            {/* Custom Artwork */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#f5c518] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#f5c518] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#f5c518] rounded-full"></span>
                </span>
                Artwork {activeSide === 'front' ? '(Depan)' : '(Belakang)'}
              </h2>
              <ImageUploader />
              <DecalControls />
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Specs: Size & Quantity */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[#f5c518] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#f5c518] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#f5c518] rounded-full"></span>
                </span>
                Spesifikasi
              </h2>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Ukuran</span>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      className={`w-[46px] h-[46px] flex items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-300 ${selectedSize === s
                          ? "bg-[#f5c518] text-black border-[#f5c518] shadow-[0_0_10px_rgba(245,197,24,0.2)]"
                          : "border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                        }`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Kuantitas</span>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
                  <button
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >−</button>
                  <span className="w-8 text-center text-white font-medium">{quantity}</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
                </div>
              </div>
            </div>

            {/* Checkout Section */}
            <div className="mt-2 pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="text-gray-400 text-xs tracking-wider uppercase">Total Harga</span>
                <span className="text-xl font-bold text-white tracking-tight">{formatPrice(totalPrice)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#f5c518] text-black text-sm font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ffd84d] transition-all duration-300 shadow-[0_4px_20px_rgba(245,197,24,0.25)] hover:-translate-y-1"
              >
                Simpan & Checkout (WA)
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
