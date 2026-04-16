"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { ColorPicker } from "@/components/configurator/ColorPicker";
import { ImageUploader } from "@/components/configurator/ImageUploader";
import { DecalControls } from "@/components/configurator/DecalControls";
import { MockupCanvas } from "@/components/configurator/MockupCanvas";
import { useConfigStore, PRODUCTS_2D, Category } from "@/lib/store";

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
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    selectedCategory, setSelectedCategory,
    selectedModel, setSelectedModel, 
    meshColor, 
    activeSide, setActiveSide,
    selectedSize, setSelectedSize, 
    quantity, setQuantity,
  } = useConfigStore();

  const currentProduct = PRODUCTS_2D.find((p) => p.id === selectedModel) || PRODUCTS_2D[0];
  const totalPrice = currentProduct.price * quantity;

  const waMessage = encodeURIComponent(
    `Halo min! Saya sudah membuat kaos ${currentProduct.label} ukuran ${selectedSize} warna ${meshColor}. ` +
    `Harga: ${formatPrice(totalPrice)}. ` +
    `Gambar hasil editan sudah saya download dan akan saya kirimkan di chat ini. Apakah bisa dibuatkan sekarang?`
  );

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Target the visually hidden dual component logic securely placed at the very end of this document.
    const node = document.getElementById("dual-canvas-capture");
    
    if (!node) {
      setIsProcessing(false);
      return;
    }
    
    try {
      // Delay ditambah jadi 800ms biar gambar ke-load utuh
      await new Promise((resolve) => setTimeout(resolve, 800));
      const dataUrl = await toPng(node, { quality: 1, cacheBust: true, pixelRatio: 2, backgroundColor: '#1a1a1a' });
      
      const link = document.createElement("a");
      link.download = `LockerRoom_Dual_Checkout_${currentProduct.label.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
      
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${waMessage}`, "_blank");
    } catch (err) {
      console.error("Error generating mockup image:", err);
      alert("Gagal memproses gambar. Pastikan gambar desain sudah dimuat sepenuhnya.");
    } finally {
      setIsProcessing(false);
    }
  };

  const categories: Category[] = ["KAOS", "HOODIE", "POLO SHIRT"];
  const availableModels = PRODUCTS_2D.filter(p => p.category === selectedCategory);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a0a] pt-24" id="configurator-page">

      {/* ── 2D Canvas Layer ── */}
      <div className="absolute inset-0 z-0 pointer-events-auto h-[100dvh] pb-[60vh] md:pb-0 flex flex-col justify-center">
        {/* Toggle Front Back */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 flex bg-white/10 p-1 border border-white/15 rounded-full backdrop-blur-md">
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

        <MockupCanvas />   {/* Standard active view dependency */}
      </div>

      {/* ── UI Overlay Wrapper ── */}
      <div className={`relative z-10 w-full h-full pointer-events-none overflow-y-auto flex flex-col md:block hide-scrollbar ${showTools ? "" : "overflow-hidden"}`}>

        {/* Mobile Tools Toggle */}
        <button 
          onClick={() => setShowTools(!showTools)}
          className="fixed top-28 right-4 z-50 md:hidden w-12 h-12 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[#f5c518] shadow-lg pointer-events-auto transition-transform hover:scale-105 active:scale-95"
        >
          {showTools ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>

        <div className="min-h-[40vh] shrink-0 w-full md:hidden pointer-events-none" />

        {/* Menu Containers */}
        <div className={`flex flex-col gap-8 p-6 pt-10 bg-[#0a0a0a]/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[2rem] pointer-events-auto md:bg-transparent md:border-none md:rounded-none md:p-0 md:block pb-12 md:pb-0 shadow-[0_-20px_50px_rgba(0,0,0,0.7)] md:shadow-none relative transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${showTools ? "translate-y-0" : "translate-y-[150%] md:translate-y-0"}`}>

          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto absolute top-4 left-1/2 -translate-x-1/2 md:hidden" />

          {/* ── Left Panel ── */}
          <div className="w-full flex flex-col gap-6 md:absolute md:left-8 md:top-[120px] md:w-[340px] md:max-h-[calc(100vh-160px)] md:overflow-y-auto hide-scrollbar md:bg-[rgba(15,15,15,0.7)] md:backdrop-blur-2xl md:border md:border-white/10 md:rounded-[2rem] md:p-7 md:shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-slide-right">

            {/* Model Selector (Category Phase) */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#f5c518] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#f5c518] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#f5c518] rounded-full"></span>
                </span>
                Model Pakaian
              </h2>
              
              {!selectedCategory ? (
                // Step 1: Select Category
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="py-4 px-4 rounded-xl text-sm font-bold border border-white/10 bg-white/5 text-gray-300 hover:bg-[#f5c518] hover:text-black hover:border-[#f5c518] transition-all duration-300 flex justify-between items-center group shadow-sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                // Step 2: Select Exact Model
                <div className="flex flex-col gap-3 animate-fade-in">
                  <button 
                    onClick={() => setSelectedCategory("")}
                    className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest flex items-center gap-1 w-fit mb-2 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Kategori Lain
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    {availableModels.map((p) => (
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
              )}
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

          <div className="w-full h-[1px] bg-white/10 md:hidden" />

          {/* ── Right Panel ── */}
          <div className="w-full flex flex-col gap-6 md:absolute md:right-8 md:top-[120px] md:w-[340px] md:max-h-[calc(100vh-160px)] md:overflow-y-auto hide-scrollbar md:bg-[rgba(15,15,15,0.7)] md:backdrop-blur-2xl md:border md:border-white/10 md:rounded-[2rem] md:p-7 md:shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-slide-left">

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

            <div className="mt-2 pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="text-gray-400 text-xs tracking-wider uppercase">Total Harga</span>
                <span className="text-xl font-bold text-white tracking-tight">{formatPrice(totalPrice)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[#f5c518] text-black text-sm font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ffd84d] transition-all duration-300 shadow-[0_4px_20px_rgba(245,197,24,0.25)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isProcessing ? "Memproses..." : "Simpan & Checkout (WA)"}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ── OFF-SCREEN RENDERING DUAL CANVAS (FOR EXPORT ONLY) ── */}
      <div 
        className="fixed top-0 left-0 -z-50 flex flex-row items-center justify-center gap-12 bg-[#1a1a1a] p-12 w-[1200px] h-[800px]" 
        id="dual-canvas-capture"
      >
        <MockupCanvas forcedSide="front" hideBackground={true} overrideSize="w-[500px] h-[600px]" />
        
        {/* Ornamen Pemisah */}
        <div className="w-[2px] h-[80%] bg-[#f5c518]/20 flex shrink-0 mx-8"></div>
        
        <MockupCanvas forcedSide="back" hideBackground={true} overrideSize="w-[500px] h-[600px]" />
        
        {/* Background Ambient Shared (Tengah) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[90%] blur-[200px] opacity-15 pointer-events-none rounded-full" style={{ backgroundColor: meshColor }}></div>
        
        {/* Watermark/Logo */}
        <div className="absolute inset-x-0 bottom-8 text-center text-white/20 font-bold tracking-widest uppercase text-3xl font-display">LockerRoom &copy; 2026 Custom Builder</div>
      </div>

    </div>
  );
}
